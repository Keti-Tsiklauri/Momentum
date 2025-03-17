import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../context/globalContext";
import styles from "./departmentFilter.module.css";

export default function DepartmentFilter() {
  const {
    tasks,
    showDepartmentSelector,
    setShowDepartmentSelector,
    filteredArray,
    setFilteredArray,
    setClickedIndex,
  } = useContext(GlobalContext);

  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  console.log("filteredarray", filteredArray);
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowDepartmentSelector]);

  const uniqueDepartments = [
    ...new Map(
      tasks.map((item) => [item.department.id, item.department])
    ).values(),
  ];

  function handleCheckboxChange(event, department) {
    const checked = event.target.checked;
    setSelectedDepartments((prevSelected) =>
      checked
        ? [...prevSelected, department]
        : prevSelected.filter((dept) => dept.id !== department.id)
    );
  }

  function handleButtonClick() {
    if (selectedDepartments.length > 0) {
      setFilteredArray((prevFiltered) => {
        const updatedFiltered = [
          ...prevFiltered.filter(
            (item) => !uniqueDepartments.some((d) => d.id === item.id)
          ),
          ...selectedDepartments,
        ];
        return updatedFiltered;
      });

      setShowDepartmentSelector(false);
      setClickedIndex(false);
    }
  }

  return (
    <div
      ref={containerRef}
      className={showDepartmentSelector ? styles.show : styles.hidden}
    >
      <div className={styles.container}>
        <div className={styles.mainBox}>
          {uniqueDepartments.map((elem, index) => (
            <div className={styles.box} key={index}>
              <input
                type="checkbox"
                id={`dept-${index}`}
                className={styles.checkbox}
                onChange={(e) => handleCheckboxChange(e, elem)}
              />
              <label htmlFor={`dept-${index}`} className={styles.dep}>
                {elem.name}
              </label>
            </div>
          ))}
        </div>
        <button
          ref={buttonRef}
          className={styles.buttonOpacity}
          onClick={handleButtonClick}
        >
          არჩევა
        </button>
      </div>
    </div>
  );
}
