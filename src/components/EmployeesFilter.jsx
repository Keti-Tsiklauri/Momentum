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
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Store only one employee

  useEffect(() => {
    if (showEmployeesSelector) {
      setSelectedEmployee(null); // Reset selection when filter opens
    }
  }, [showEmployeesSelector]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowEmployeesSelector(false);
        setSelectedEmployee(null); // Reset selection when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowEmployeesSelector]);

  const uniqueEmployees = [
    ...new Map(
      tasks.map((item) => [
        item.employee.id,
        {
          id: item.employee.id,
          name: item.employee.name,
          surname: item.employee.surname,
          avatar: item.employee.avatar,
          department: item.employee.department,
        },
      ])
    ).values(),
  ];

  function handleCheckboxChange(employee) {
    setSelectedEmployee((prev) => (prev?.id === employee.id ? null : employee)); // Toggle selection
  }

  function handleButtonClick() {
    if (selectedEmployee) {
      setFilteredArray((prevFiltered) => {
        // Remove previous employee before adding new selection
        const withoutOldEmployee = prevFiltered.filter(
          (item) => item.type !== "employee"
        );

        return [
          ...withoutOldEmployee,
          {
            id: selectedEmployee.id,
            name: selectedEmployee.name,
            surname: selectedEmployee.surname,
            type: "employee",
          },
        ];
      });
    }

    // Reset selection & close modal when button is clicked
    setSelectedEmployee(null);
    setShowEmployeesSelector(false);
    setClickedIndex(null);
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
                type="radio" // Changed to radio for single selection
                id={`emp-${index}`}
                className={styles.checkbox}
                checked={selectedEmployee?.id === elem.id}
                onChange={() => handleCheckboxChange(elem)}
              />
              <img className={styles.image} src={elem.avatar} />
              <label htmlFor={`emp-${index}`} className={styles.emp}>
                {elem.name} {elem.surname}
              </label>
            </div>
          ))}
        </div>
        <button
          ref={buttonRef}
          className={
            selectedEmployee ? styles.activeButton : styles.buttonOpacity
          }
          onClick={handleButtonClick}
        >
          არჩევა
        </button>
      </div>
    </div>
  );
}
