import { useContext, useEffect, useRef, useState } from "react";
import styles from "./priorities.module.css";
import { GlobalContext } from "../context/globalContext";

export default function Priorities() {
  const {
    priorities,
    showPrioritiesSelector,
    setShowPrioritiesSelector,
    setClickedIndex,
    filteredArray,
    setFilteredArray,
  } = useContext(GlobalContext);

  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  console.log(filteredArray);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showPrioritiesSelector &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowPrioritiesSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPrioritiesSelector, setShowPrioritiesSelector]);

  // Handle checkbox change
  function handleCheckboxChange(priority) {
    setSelectedPriorities((prevSelected) => {
      if (prevSelected.some((item) => item.id === priority.id)) {
        return prevSelected.filter((item) => item.id !== priority.id);
      } else {
        return [...prevSelected, { id: priority.id, name: priority.name }];
      }
    });
  }

  function handleButtonClick() {
    if (selectedPriorities.length > 0) {
      setFilteredArray(selectedPriorities);

      // Uncheck all checkboxes
      const checkboxes = document.querySelectorAll(`.${styles.checkbox}`);
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });

      // Reset state and close dropdown
      setSelectedPriorities([]);
      setShowPrioritiesSelector(false);
      setClickedIndex(false);
    }
  }

  return (
    <div
      ref={containerRef}
      className={showPrioritiesSelector ? styles.show : styles.hidden}
    >
      <div className={styles.container}>
        <div className={styles.mainBox}>
          {priorities.map((elem, index) => (
            <div className={styles.box} key={index}>
              <input
                type="checkbox"
                id={`priority-${index}`}
                className={styles.checkbox}
                checked={selectedPriorities.some((p) => p.id === elem.id)}
                onChange={() => handleCheckboxChange(elem)}
              />
              <label htmlFor={`priority-${index}`} className={styles.label}>
                {elem.name}
              </label>
            </div>
          ))}
        </div>

        {/* Button Wrapper ensures button is at the bottom */}
        <div className={styles.buttonWrapper}>
          <button
            className={
              selectedPriorities.length > 0
                ? styles.activeButton
                : styles.buttonOpacity
            }
            onClick={handleButtonClick}
            disabled={selectedPriorities.length === 0}
          >
            არჩევა
          </button>
        </div>
      </div>
    </div>
  );
}
