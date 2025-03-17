import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../context/globalContext";
import styles from "./departmentFilter.module.css";

export default function DepartmentFilter() {
  const {
    tasks,
    showDepartmentSelector,
    setShowDepartmentSelector,
    filterArray,
    setFilterArray,
    clickedIndex,
    setClickedIndex,
  } = useContext(GlobalContext);

  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  // Close dropdown when clicking outside
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

  // Check if any checkbox is checked and update the selected departments
  function handleCheckboxChange(event, department) {
    const checked = event.target.checked;
    let updatedSelection = [];

    if (checked) {
      updatedSelection = [...selectedDepartments, department];
    } else {
      updatedSelection = selectedDepartments.filter(
        (dept) => dept.id !== department.id
      );
    }

    setSelectedDepartments(updatedSelection);

    // Enable or disable the button based on selection
    if (buttonRef.current) {
      if (updatedSelection.length > 0) {
        buttonRef.current.classList.remove(styles.buttonOpacity);
      } else {
        buttonRef.current.classList.add(styles.buttonOpacity);
      }
    }
  }
  console.log("filteredArray", filterArray);
  // Handle button click (close only if at least one checkbox is checked & uncheck checkboxes)
  function handleButtonClick() {
    if (selectedDepartments.length > 0) {
      // Save selected departments in GlobalContext
      setFilterArray(selectedDepartments);

      // Uncheck all checkboxes
      const checkboxes = document.querySelectorAll(`.${styles.checkbox}`);
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });

      // Reset state and close dropdown
      setSelectedDepartments([]);
      setShowDepartmentSelector(false);
      setClickedIndex(false);
      // Update button opacity
      if (buttonRef.current) {
        buttonRef.current.classList.add(styles.buttonOpacity);
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={`${showDepartmentSelector ? styles.show : styles.hidden}`}
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
          onClick={handleButtonClick} // ✅ Saves checked values in filterArray
        >
          არჩევა
        </button>
      </div>
    </div>
  );
}
