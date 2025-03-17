import styles from "./header.module.css";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.icon}>
        <p>Momentum</p>
        <img src="public/images/Hourglass.png" height="30px" width="30px" />
      </div>
      <div className={styles.buttons}>
        <Link className={styles.buttonOne}>თანამშრომლის შექმნა</Link>

        <Link to="/createtask" className={styles.buttonTwo}>
          + შექმენი ახალი დავალება
        </Link>
      </div>
    </div>
  );
}
