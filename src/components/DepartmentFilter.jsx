import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../context/globalContext";
import styles from "./departmentFilter.module.css";

export default function DepartmentFilter() {
  const {
    showDepartmentSelector,
    setShowDepartmentSelector,
    setFilteredArray,
    setClickedIndex,
    tasks,
  } = useContext(GlobalContext);

  const containerRef = useRef(null);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  // Extract unique departments with their IDs
  const departmentOptions = Array.from(
    new Map(
      tasks.map((task) => [task.department?.id, task.department])
    ).values()
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDepartmentSelector(false);
        setSelectedDepartments([]); // Reset selection when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowDepartmentSelector]);

  function handleCheckboxChange(event, department) {
    const checked = event.target.checked;
    setSelectedDepartments((prev) =>
      checked
        ? [...prev, department]
        : prev.filter((d) => d.id !== department.id)
    );
  }

  function handleButtonClick() {
    if (selectedDepartments.length > 0) {
      setFilteredArray((prevFiltered) => {
        // Remove previously added departments before updating
        const withoutOldDepartments = prevFiltered.filter(
          (item) => !departmentOptions.some((d) => d.id === item.id)
        );

        // Add only selected departments with their IDs
        return [
          ...withoutOldDepartments,
          ...selectedDepartments.map((department) => ({
            id: department.id,
            name: department.name,
            type: "department",
          })),
        ];
      });
    }

    // Reset selection & close modal when button is clicked
    setSelectedDepartments([]);
    setShowDepartmentSelector(false);
    setClickedIndex(null);
  }

  return (
    <div
      ref={containerRef}
      className={showDepartmentSelector ? styles.show : styles.hidden}
    >
      <div className={styles.container}>
        <div className={styles.mainBox}>
          {departmentOptions.map((department) => (
            <div className={styles.box} key={department.id}>
              <input
                type="checkbox"
                id={`department-${department.id}`}
                className={styles.checkbox}
                checked={selectedDepartments.some(
                  (d) => d.id === department.id
                )}
                onChange={(e) => handleCheckboxChange(e, department)}
              />
              <label
                htmlFor={`department-${department.id}`}
                className={styles.label}
              >
                {department.name}
              </label>
            </div>
          ))}
        </div>
        <button
          className={
            selectedDepartments.length > 0
              ? styles.activeButton
              : styles.buttonOpacity
          }
          onClick={handleButtonClick}
        >
          არჩევა
        </button>
      </div>
    </div>
  );
}
