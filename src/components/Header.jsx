import styles from "./header.module.css";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className={styles.header}>
      <Link className={styles.icon} to="/">
        <p>Momentum</p>
        <img src="public/images/Hourglass.png" height="30px" width="30px" />
      </Link>
      <div className={styles.buttons}>
        <Link className={styles.buttonOne}>თანამშრომლის შექმნა</Link>

        <Link to="/createtasks" className={styles.buttonTwo}>
          + შექმენი ახალი დავალება
        </Link>
      </div>
    </div>
  );
}
