import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../context/globalContext";
import styles from "./departmentFilter.module.css";

export default function DepartmentFilter() {
  const { tasks, showDepartmentSelector, setShowDepartmentSelector } =
    useContext(GlobalContext);

  const containerRef = useRef(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        !event.target.closest(".dropDownItem") // Prevents immediate closing when clicking "დეპარტამენტი"
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
              />
              <label htmlFor={`dept-${index}`} className={styles.dep}>
                {elem.name}
              </label>
            </div>
          ))}
        </div>
        <button>არჩევა</button>
      </div>
    </div>
  );
}
