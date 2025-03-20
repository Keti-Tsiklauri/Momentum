import { useContext, useState } from "react";
import styles from "./taskPage.module.css";
import { GlobalContext } from "../context/globalContext";
export default function TaskPage({ openTask }) {
  const { tasks, statuses } = useContext(GlobalContext);
  const [changeStatus, setChangeStatus] = useState(false);
  const selectedElement = tasks.find((task) => task.id === Number(openTask));
  const departmentNameMap = {
    "ადმინისტრაციის დეპარტამენტი": "ადმინისტრაცია",
    "ადამიანური რესურსების დეპარტამენტი": "ად.რესურს.",
    "ფინანსების დეპარტამენტი": "ფინანსები",
    "გაყიდვების და მარკეტინგის დეპარტამენტი": "მარკეტინგი",
    "ლოჯისტიკის დეპარტამენტი": "ლოჯისტიკა",
    "ტექნოლოგიების დეპარტამენტი": "ინფ.ტექ.",
    "მედიის დეპარტამენტი": "მედია",
  };
  const [selectedStatus, setSelectedStatus] = useState(
    selectedElement.status.name
  );
  console.log("Selected Task:", selectedElement);
  console.log("Priority ID:", selectedElement.priority?.id);
  console.log("Priority Icon:", selectedElement.priority?.icon);
  console.log("Department ID:", selectedElement.department?.id);
  console.log("Department Name:", selectedElement.department?.name);
  function formatDueDate(dueDate) {
    const daysOfWeek = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];

    const date = new Date(dueDate);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based in JS
    const year = date.getFullYear();

    return `${dayOfWeek} - ${month}/${day}/${year}`;
  }

  const departmentName =
    departmentNameMap[selectedElement?.department?.name] ||
    selectedElement?.department?.name ||
    "უცნობი დეპარტამენტი"; // Default fallback
  console.log("selected task", selectedElement);
  return (
    <div>
      <div className={styles.box}>
        <div className={styles.container}>
          <div className={styles[`priority_${selectedElement.priority.id}`]}>
            <img src={selectedElement.priority.icon} />
            <p>{selectedElement?.priority.name}</p>
          </div>
          <div
            className={styles[`department_${selectedElement.department.id}`]}
          >
            <p>{departmentName}</p>
          </div>
        </div>
        <p className={styles.name}>{selectedElement.name}</p>
        <p className={styles.description}>{selectedElement.description}</p>
      </div>
      <div className={styles.taskDetails}>
        <p className={styles.TaskHeader}>დავალების დეტალები</p>
        <div className={styles.status}>
          <div className={styles.miniBox}>
            <img src="images/pie-chart.png" />
            <p>სტატუსი</p>
          </div>
          <div
            className={styles.selector}
            onClick={() => setChangeStatus((prev) => !prev)}
          >
            <div className={styles.div}>
              <p>{selectedStatus}</p>
              <img
                src={
                  changeStatus ? "images/arrow-up.png" : "images/arrow-down.png"
                }
                alt="Toggle dropdown"
              />
            </div>

            {changeStatus && (
              <div className={styles.dropdown}>
                {statuses.map((elem) => (
                  <p
                    key={elem.id || elem.name}
                    onClick={() => {
                      setSelectedStatus(elem.name);
                      setChangeStatus(false); // Close dropdown after selection
                    }}
                  >
                    {elem.name}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.employees}>
          <div className={styles.box1}>
            <div className={styles.box2}>
              <img src="images/Frame.png" />
              <p>თანამშრომელი</p>
            </div>

            <div className={styles.employee}>
              <div className={styles.mini2}>
                <p>{selectedElement.department.name}</p>
              </div>

              <div className={styles.mini1}>
                <img src={selectedElement.employee.avatar} />
                <p>
                  {selectedElement.employee.name}{" "}
                  {selectedElement.employee.surname}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.box1}>
            <div className={styles.box2}>
              <img src="images/calendar.png" />
              <p>დავალების ვადა</p>
            </div>

            <div className={styles.date}>
              <p>{formatDueDate(selectedElement.due_date)}</p>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
