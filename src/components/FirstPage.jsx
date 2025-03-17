import { useContext } from "react";
import styles from "./firstPage.module.css";
import { GlobalContext } from "../context/globalContext";
import DropDown from "./DropDown";

export default function FirstPage() {
  const { tasks, statuses, filteredArray } = useContext(GlobalContext);

  console.log("Tasks:", tasks);
  console.log("Filtered Array:", filteredArray);

  // Map for department name replacements
  const departmentNameMap = {
    "ადმინისტრაციის დეპარტამენტი": "ადმინისტრაცია",
    "ადამიანური რესურსების დეპარტამენტი": "ად.რესურს.",
    "ფინანსების დეპარტამენტი": "ფინანსები",
    "გაყიდვების და მარკეტინგის დეპარტამენტი": "მარკეტინგი",
    "ლოჯისტიკის დეპარტამენტი": "ლოჯისტიკა",
    "ტექნოლოგიების დეპარტამენტი": "ინფ.ტექ.",
    "მედიის დეპარტამენტი": "მედია",
  };

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
    return `${date.getDate()} ${
      months[date.getMonth()]
    }, ${date.getFullYear()}`;
  };

  // Extract selected filters
  const selectedDepartments = filteredArray
    .filter((item) => item.type === "department")
    .map((item) => item.name);

  const selectedPriorities = filteredArray
    .filter((item) => item.type === "priority")
    .map((item) => item.id); // Use ID for priority comparison

  const selectedEmployees = filteredArray
    .filter((item) => item.type === "employee")
    .map((item) => String(item.id)); // Convert IDs to strings

  console.log("Selected Employees:", selectedEmployees);

  return (
    <div>
      <div className={styles.header}>
        <p>დავალებების გვერდი</p>
      </div>
      <DropDown />

      <div className={styles.container}>
        {statuses.slice(0, 4).map((status) => {
          const filteredTasks = tasks.filter((task) => {
            const taskEmployeeId = String(task.employee.id); // Ensure consistency in ID comparison

            const matchesDepartment =
              selectedDepartments.length === 0 ||
              selectedDepartments.includes(task.employee.department.name);

            const matchesPriority =
              selectedPriorities.length === 0 ||
              selectedPriorities.includes(task.priority.id);

            const matchesEmployee =
              selectedEmployees.length === 0 ||
              selectedEmployees.includes(taskEmployeeId);

            return (
              matchesDepartment &&
              matchesPriority &&
              matchesEmployee &&
              task.status.id === status.id
            );
          });

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
                      <div className={styles.box2}>
                        <div className={styles[`priority_${elem.priority.id}`]}>
                          <img src={elem.priority.icon} alt="priority icon" />
                          <p
                            className={
                              styles[`priorityType_${elem.priority.id}`]
                            }
                          >
                            {elem.priority.name}
                          </p>
                        </div>
                        <p
                          className={
                            styles[`department_${elem.employee.department.id}`]
                          }
                        >
                          {departmentNameMap[elem.employee.department.name] ||
                            elem.employee.department.name}
                        </p>
                      </div>
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
                        <img src="/public/images/Comments.png" alt="comments" />
                        <p>{elem.total_comments}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.noTasks}>დავალებები არ არის.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
