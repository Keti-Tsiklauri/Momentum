import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../context/globalContext";
import styles from "./employeesFilter.module.css";

export default function EmployeesFilter() {
  const {
    tasks,
    showEmployeesSelector,
    setShowEmployeesSelector,
    setFilteredArray,
    setClickedIndex,
  } = useContext(GlobalContext);

  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    if (showEmployeesSelector) {
      setSelectedEmployees([]);
    }
  }, [showEmployeesSelector]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowEmployeesSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowEmployeesSelector]);

  const uniqueEmployees = [
    ...new Map(tasks.map((item) => [item.employee.id, item.employee])).values(),
  ];

  function handleCheckboxChange(event, employee) {
    const checked = event.target.checked;
    setSelectedEmployees((prevSelected) =>
      checked
        ? [...prevSelected, employee]
        : prevSelected.filter((emp) => emp.id !== employee.id)
    );
  }

  function handleButtonClick() {
    if (selectedEmployees.length > 0) {
      setFilteredArray((prevFiltered) => {
        const updatedFiltered = [
          ...prevFiltered.filter(
            (item) => !uniqueEmployees.some((e) => e.id === item.id)
          ),
          ...selectedEmployees,
        ];
        return updatedFiltered;
      });

      setShowEmployeesSelector(false);
      setClickedIndex(null);
    }
  }

  return (
    <div
      ref={containerRef}
      className={showEmployeesSelector ? styles.show : styles.hidden}
    >
      <div className={styles.container}>
        <div className={styles.mainBox}>
          {uniqueEmployees.map((elem, index) => (
            <div className={styles.box} key={index}>
              <input
                type="checkbox"
                id={`emp-${index}`}
                className={styles.checkbox}
                checked={selectedEmployees.some((emp) => emp.id === elem.id)}
                onChange={(e) => handleCheckboxChange(e, elem)}
              />
              <label htmlFor={`emp-${index}`} className={styles.emp}>
                {elem.name} {elem.surname}
              </label>
            </div>
          ))}
        </div>
        <button
          ref={buttonRef}
          className={
            selectedEmployees.length > 0
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
