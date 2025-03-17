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

  // Extract unique departments from tasks
  const departmentOptions = [
    ...new Map(
      tasks.map((task) => [task.department.id, task.department.name])
    ).values(),
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDepartmentSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowDepartmentSelector]);

  function handleCheckboxChange(event, department) {
    const checked = event.target.checked;
    setSelectedDepartments((prev) =>
      checked ? [...prev, department] : prev.filter((d) => d !== department)
    );
  }

  function handleButtonClick() {
    if (selectedDepartments.length > 0) {
      setFilteredArray((prevFiltered) => {
        const updatedFiltered = [
          ...prevFiltered.filter(
            (item) => !departmentOptions.includes(item.name)
          ), // Remove old department filters
          ...selectedDepartments.map((department) => ({
            name: department,
            type: "department",
          })),
        ];
        return updatedFiltered;
      });

      setShowDepartmentSelector(false);
      setClickedIndex(null);
    }
  }

  return (
    <div
      ref={containerRef}
      className={showDepartmentSelector ? styles.show : styles.hidden}
    >
      <div className={styles.container}>
        <div className={styles.mainBox}>
          {departmentOptions.map((department, index) => (
            <div className={styles.box} key={index}>
              <input
                type="checkbox"
                id={`department-${index}`}
                className={styles.checkbox}
                checked={selectedDepartments.includes(department)}
                onChange={(e) => handleCheckboxChange(e, department)}
              />
              <label htmlFor={`department-${index}`} className={styles.label}>
                {department}
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
