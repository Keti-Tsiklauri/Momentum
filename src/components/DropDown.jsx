import { useContext, useState, useEffect, useRef } from "react";
import styles from "./dropDown.module.css";
import { GlobalContext } from "../context/globalContext";

export default function DropDown() {
  const {
    clickedIndex,
    setClickedIndex,
    filteredArray,
    setFilteredArray,
    setShowDepartmentSelector,
    setShowPrioritiesSelector,
    setShowEmployeesSelector,
  } = useContext(GlobalContext);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);

  const items = ["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"];

  const handleClick = (text, index) => {
    setClickedIndex(index);
    if (text === "დეპარტამენტი") {
      setShowDepartmentSelector((prev) => !prev);
    }
    if (text === "პრიორიტეტი") {
      setShowPrioritiesSelector((prev) => !prev);
    }
    if (text === "თანამშრომელი") {
      setShowEmployeesSelector((prev) => !prev);
    }
  };

  const clearFilters = () => {
    setFilteredArray([]);
  };

  const removeFilter = (name) => {
    setFilteredArray(filteredArray.filter((elem) => elem.name !== name));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setClickedIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setClickedIndex]);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.dropDown}>
        {items.map((text, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleClick(text, index)}
            className={`${styles.dropDownItem} ${
              clickedIndex === index ? styles.clickedElement : ""
            }`}
          >
            <p>{text}</p>
            <img
              src={
                hoveredIndex === index || clickedIndex === index
                  ? "/images/ShapePurple.svg"
                  : "/images/Shape.svg"
              }
              alt="icon"
              className={styles.icon}
            />
          </div>
        ))}
      </div>

      <div className={styles.filtered}>
        {filteredArray.map((elem, index) => (
          <div key={index} className={styles.filter}>
            <p>
              {elem.name} {elem.surname}
            </p>
            <img
              src="/images/x.svg"
              alt="remove"
              onClick={() => removeFilter(elem.name)}
              className={styles.deleteIcon}
            />
          </div>
        ))}
        {filteredArray.length > 0 && (
          <p className={styles.p} onClick={clearFilters}>
            გასუფთავება
          </p>
        )}
      </div>
    </div>
  );
}
