import { useContext, useMemo } from "react";
import styles from "./firstPage.module.css";
import { GlobalContext } from "../context/globalContext";
import DropDown from "./DropDown";
import React from "react";

const FirstPage = () => {
  const { tasks, statuses, filteredArray, setOpenTask, openTask } =
    useContext(GlobalContext);
  console.log("opentask", openTask);
  // Map for department name replacements
  const departmentNameMap = {
    "ადმინისტრაციის დეპარტამენტი": "ადმინისტ.",
    "ადამიანური რესურსების დეპარტამენტი": "ად.რესურს.",
    "ფინანსების დეპარტამენტი": "ფინანსები",
    "გაყიდვების და მარკეტინგის დეპარტამენტი": "მარკეტინგი",
    "ლოჯისტიკის დეპარტამენტი": "ლოჯისტიკა",
    "ტექნოლოგიების დეპარტამენტი": "ინფ.ტექ.",
    "მედიის დეპარტამენტი": "მედია",
  };
  console.log("taskebu", tasks);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "იან",
      "თებ",
      "მარ",
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

  const handleTaskClick = (task) => {
    setOpenTask(task.id);
  };

  // Extract selected filters
  const selectedDepartments = useMemo(
    () =>
      filteredArray
        .filter((item) => item.type === "department")
        .map((item) => item.name),
    [filteredArray]
  );

  const selectedPriorities = useMemo(
    () =>
      filteredArray
        .filter((item) => item.type === "priority")
        .map((item) => item.id),
    [filteredArray]
  );

  const selectedEmployees = useMemo(
    () =>
      filteredArray
        .filter((item) => item.type === "employee")
        .map((item) => String(item.id)),
    [filteredArray]
  );

  // Optimize task filtering using `useMemo`
  const filteredTasksByStatus = useMemo(() => {
    return statuses.slice(0, 4).map((status) => ({
      status,
      tasks: tasks.filter((task) => {
        const taskEmployeeId = String(task.employee.id);

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
      }),
    }));
  }, [
    tasks,
    statuses,
    selectedDepartments,
    selectedPriorities,
    selectedEmployees,
  ]);

  return (
    <div>
      <div className={styles.header}>
        <p>დავალებების გვერდი</p>
      </div>
      <DropDown />

      <div className={styles.container}>
        {filteredTasksByStatus.map(({ status, tasks }) => (
          <div key={status.id} className={styles.statusContainer}>
            <div className={styles[`statusDiv_${status.id}`]}>
              <p className={styles[`statusHeader_${status.id}`]}>
                {status.name}
              </p>
            </div>
            {tasks.length > 0 ? (
              tasks.map((elem) => (
                <div
                  key={elem.id}
                  className={styles[`tasks_${status.id}`]}
                  onClick={() => handleTaskClick(elem)}
                >
                  <div className={styles.box}>
                    <div className={styles.box2}>
                      <div className={styles[`priority_${elem.priority.id}`]}>
                        <img src={elem.priority.icon} alt="priority icon" />
                        <p
                          className={styles[`priorityType_${elem.priority.id}`]}
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
                    <p className={styles.description}>
                      {typeof elem.description === "string"
                        ? elem.description.length > 100
                          ? `${elem.description.slice(0, 100)}...`
                          : elem.description
                        : "No description available"}
                    </p>
                  </div>
                  <div className={styles.tasksFooter}>
                    <img
                      src={elem.employee.avatar}
                      alt="avatar"
                      className={styles.img}
                    />
                    <div className={styles.footer}>
                      <img src="images/Comments.png" alt="comments" />
                      <p>{elem.total_comments}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noTasks}>დავალებები არ არის.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(FirstPage);
