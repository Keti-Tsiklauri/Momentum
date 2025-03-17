import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../context/globalContext";
import styles from "./priorities.module.css";

export default function PriorityFilter() {
  const {
    showPrioritiesSelector,
    setShowPrioritiesSelector,
    setFilteredArray,
    setClickedIndex,
    priorities,
  } = useContext(GlobalContext);

  const containerRef = useRef(null);
  const [selectedPriorities, setSelectedPriorities] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowPrioritiesSelector(false);
        setSelectedPriorities([]); // Reset selection when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowPrioritiesSelector]);

  function handleCheckboxChange(event, priority) {
    const checked = event.target.checked;
    setSelectedPriorities((prev) =>
      checked ? [...prev, priority] : prev.filter((p) => p.id !== priority.id)
    );
  }

  function handleButtonClick() {
    if (selectedPriorities.length > 0) {
      setFilteredArray((prevFiltered) => {
        // Remove previously added priorities before updating
        const withoutOldPriorities = prevFiltered.filter(
          (item) => !priorities.some((p) => p.name === item.name)
        );

        return [
          ...withoutOldPriorities,
          ...selectedPriorities.map((priority) => ({
            id: priority.id,
            name: priority.name,
            type: "priority",
          })),
        ];
      });
    }

    // Reset selection & close modal when button is clicked
    setSelectedPriorities([]);
    setShowPrioritiesSelector(false);
    setClickedIndex(null);
  }

  return (
    <div
      ref={containerRef}
      className={showPrioritiesSelector ? styles.show : styles.hidden}
    >
      <div className={styles.container}>
        <div className={styles.mainBox}>
          {priorities.map((priority) => (
            <div className={styles.box} key={priority.id}>
              <input
                type="checkbox"
                id={`priority-${priority.id}`}
                className={styles.checkbox}
                checked={selectedPriorities.some((p) => p.id === priority.id)}
                onChange={(e) => handleCheckboxChange(e, priority)}
              />
              <label
                htmlFor={`priority-${priority.id}`}
                className={styles.label}
              >
                {priority.name}
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
