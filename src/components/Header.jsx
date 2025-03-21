import { useContext } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/globalContext";
export default function Header() {
  const { createNewEmployee, setCreateNewEmployee, SetOpenTask } =
    useContext(GlobalContext);
  console.log("employee creation", createNewEmployee);
  return (
    <div className={styles.header}>
      <Link className={styles.icon} to="/" onClick={() => SetOpenTask(null)}>
        <p>Momentum</p>
        <img src="images/Hourglass.png" height="30px" width="30px" />
      </Link>
      <div className={styles.buttons}>
        <Link
          className={styles.buttonOne}
          onClick={() => setCreateNewEmployee((prev) => !prev)}
        >
          თანამშრომლის შექმნა
        </Link>

        <Link to="/createtasks" className={styles.buttonTwo}>
          + შექმენი ახალი დავალება
        </Link>
      </div>
    </div>
  );
}
