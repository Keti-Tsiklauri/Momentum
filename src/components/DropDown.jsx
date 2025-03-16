import { useContext, useState } from "react";
import styles from "./dropDown.module.css";
import { GlobalContext } from "../context/globalContext";

export default function DropDown() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { showDepartmentSelector, setShowDepartmentSelector } =
    useContext(GlobalContext);

  const items = ["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"];

  const handleClick = (text) => {
    if (text === "დეპარტამენტი") {
      setTimeout(() => {
        setShowDepartmentSelector((prev) => !prev);
      }, 0);
    }
  };

  return (
    <div className={styles.dropDown}>
      {items.map((text, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => handleClick(text)}
          className={styles.dropDownItem}
        >
          <p>{text}</p>
          <img
            src={
              hoveredIndex === index
                ? "/images/ShapePurple.svg"
                : "/images/Shape.svg"
            }
            alt="icon"
            className={styles.icon}
          />
        </div>
      ))}
    </div>
  );
}
