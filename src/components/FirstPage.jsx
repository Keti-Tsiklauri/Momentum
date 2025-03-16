import { useContext } from "react";
import styles from "./firstPage.module.css";
import { GlobalContext } from "../context/globalContext";
import DropDown from "./DropDown";

export default function FirstPage() {
  const { tasks, statuses } = useContext(GlobalContext);
  console.log(tasks);
  // Convert due_date format
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const months = [
      "იან",
      "თებ",
      "მარტ",
      "აპრ",
      "მაი",
      "ივნ",
      "ივლ",
      "აგვ",
      "სექ",
      "ოქტ",
      "ნოე",
      "დეკ",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  };

  return (
    <div>
      <div className={styles.header}>
        <p>დავალებების გვერდი</p>
      </div>
      <DropDown />
      {/* Loop through only the first 4 statuses */}
      <div className={styles.container}>
        {statuses.slice(0, 4).map((status) => {
          const filteredTasks = tasks.filter(
            (task) => task.status.id === status.id
          );

          return (
            <div key={status.id} className={styles.statusContainer}>
              <div className={styles[`statusDiv_${status.id}`]}>
                <p className={styles[`statusHeader_${status.id}`]}>
                  {status.name}
                </p>
              </div>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((elem) => (
                  <div key={elem.id} className={styles[`tasks_${status.id}`]}>
                    <div className={styles.box}>
                      <div className={styles[`priority_${elem.priority.id}`]}>
                        <img src={elem.priority.icon} alt="priority icon" />
                        <p
                          className={styles[`priorityType_${elem.priority.id}`]}
                        >
                          {elem.priority.name}
                        </p>
                      </div>
                      <p>$$$$$$$$</p>
                      <p>{formatDate(elem.due_date)}</p>
                    </div>
                    <div className={styles.box1}>
                      <p className={styles.name}>{elem.name}</p>
                      <p className={styles.description}>{elem.description}</p>
                    </div>
                    <div className={styles.tasksFooter}>
                      <img
                        src={elem.employee.avatar}
                        alt="avatar"
                        className={styles.img}
                      />
                      <div className={styles.footer}>
                        <img src="/public/images/Comments.png" />
                        <p>{elem.total_comments}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.noTasks}>
                  ამჟამად {status.name}-ის სტატუსის დავალებები არ არის.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
