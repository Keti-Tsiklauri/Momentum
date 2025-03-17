import { useContext, useState } from "react";
import styles from "./dropDown.module.css";
import { GlobalContext } from "../context/globalContext";

export default function DropDown() {
  const { clickedIndex, setClickedIndex } = useContext(GlobalContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { setShowDepartmentSelector } = useContext(GlobalContext);
  const items = ["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"];

  const handleClick = (text, index) => {
    setClickedIndex(index); // ✅ Track which item was clicked
    if (text === "დეპარტამენტი") {
      setShowDepartmentSelector((prev) => !prev);
    }
  };

  return (
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
  );
}
