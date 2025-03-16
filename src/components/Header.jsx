import styles from "./header.module.css";
export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.icon}>
        <p>Momentum</p>
        <img src="public/images/Hourglass.png" height="30px" width="30px" />
      </div>
      <div className={styles.buttons}>
        <button>თანამშრომლის შექმნა</button>
        <button>+ შექმენი ახალი დავალება</button>
      </div>
    </div>
  );
}
