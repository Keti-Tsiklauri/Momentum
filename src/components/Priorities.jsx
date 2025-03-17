import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../context/globalContext";
import styles from "./priorities.module.css";

export default function PriorityFilter() {
  const {
    showPrioritiesSelector,
    setShowPrioritiesSelector,
    setFilteredArray,
    setClickedIndex,
  } = useContext(GlobalContext);

  const containerRef = useRef(null);
  const [selectedPriorities, setSelectedPriorities] = useState([]);

  const priorityOptions = ["მაღალი", "საშუალო", "დაბალი"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowPrioritiesSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowPrioritiesSelector]);

  function handleCheckboxChange(event, priority) {
    const checked = event.target.checked;
    setSelectedPriorities((prev) =>
      checked ? [...prev, priority] : prev.filter((p) => p !== priority)
    );
  }

  function handleButtonClick() {
    if (selectedPriorities.length > 0) {
      setFilteredArray((prevFiltered) => {
        const updatedFiltered = [
          ...prevFiltered.filter(
            (item) => !priorityOptions.includes(item.name)
          ),
          ...selectedPriorities.map((priority) => ({ name: priority })),
        ];
        return updatedFiltered;
      });

      setShowPrioritiesSelector(false);
      setClickedIndex(null);
    }
  }

  return (
    <div
      ref={containerRef}
      className={showPrioritiesSelector ? styles.show : styles.hidden}
    >
      <div className={styles.container}>
        <div className={styles.mainBox}>
          {priorityOptions.map((priority, index) => (
            <div className={styles.box} key={index}>
              <input
                type="checkbox"
                id={`priority-${index}`}
                className={styles.checkbox}
                checked={selectedPriorities.includes(priority)}
                onChange={(e) => handleCheckboxChange(e, priority)}
              />
              <label htmlFor={`priority-${index}`} className={styles.label}>
                {priority}
              </label>
            </div>
          ))}
        </div>
        <button
          className={
            selectedPriorities.length > 0
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
