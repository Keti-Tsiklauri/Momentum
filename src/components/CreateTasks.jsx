import { GlobalContext } from "../context/globalContext";
import styles from "./createTasks.module.css";
import { useRef, useState, useEffect, useContext } from "react";
export default function CreateTasks() {
  const { priorities, statuses, departments } = useContext(GlobalContext);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [firstP, setFirstP] = useState(false);
  const [secondP, setSecondP] = useState(false);
  const [thirdP, setThirdP] = useState(false);
  const [fourthP, setFourthP] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState({
    icon: "https://momentum.redberryinternship.ge/storage/priority-icons/Medium.svg",
    name: "საშუალო",
  });
  const [prioritySelector, setPrioritySelector] = useState(false);
  const [statusSelector, setStatusSelector] = useState(false);
  const [departmentSelector, setDepartmentSelector] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({
    name: "დასაწყები",
  });
  const [selectedDepartment, setSelectedDepartment] = useState({
    name: "ადმინისტრაციის დეპარტამენტი",
  });
  function validateTitle() {
    const value = titleRef.current?.value || "";
    const trimmedLength = value.trim().length; // Use trimmed length

    if (trimmedLength === 0) {
      setFirstP(false);
      setSecondP(false);
      return;
    }

    setFirstP(trimmedLength >= 2); // Set firstP true if length is 2+
    setSecondP(trimmedLength >= 2 && trimmedLength < 255); // Set secondP true if length is 2-9

    if (trimmedLength > 255) {
      setSecondP(false); // Disable secondP if length exceeds 10
    }
  }
  useEffect(() => {
    validateTitle();
  }, [titleRef.current?.value]);

  function validateDescription() {
    const value = descriptionRef.current?.value || "";
    const trimmedLength = value.trim().length; // Use trimmed length

    if (trimmedLength === 0) {
      setThirdP(false);
      setFourthP(false);
      return;
    }

    setThirdP(trimmedLength >= 2); // Set firstP true if length is 2+
    setFourthP(trimmedLength >= 2 && trimmedLength < 255); // Set secondP true if length is 2-9

    if (trimmedLength > 255) {
      setFourthP(false); // Disable secondP if length exceeds 10
    }
  }

  useEffect(() => {
    validateDescription();
  }, [descriptionRef.current?.value]);
  function selectPriority(index) {
    setSelectedPriority({
      icon: priorities[index].icon,
      name: priorities[index].name,
    });
    setPrioritySelector((prev) => !prev);
  }
  function selectStatus(index) {
    setSelectedStatus({ name: departments[index].name });
    setStatusSelector(false);
  }
  function selectDepartment(index) {
    setSelectedDepartment({ name: departments[index].name });
    setDepartmentSelector(false);
  }
  console.log(departments);
  return (
    <div>
      <p className={styles.header}>შექმენი ახალი დავალება</p>
      <div className={styles.container}>
        <div className={styles.box1}>
          <div className={styles.titleDiv}>
            <div className={styles.title}>
              <p>სათაური</p>
              <img src="images/Asterisk.png" alt="Required" />
            </div>
            <textarea
              rows="4"
              cols="50"
              type="text"
              ref={titleRef}
              onChange={() => validateTitle()}
            />
            <div className={styles.error}>
              <p
                className={`${styles[firstP ? "green" : "grey"]} ${
                  styles.firstParagraph
                }`}
              >
                მინიმუმ 2 სიმბოლო
              </p>
              <p
                className={`${styles[secondP ? "green" : "grey"]} ${
                  styles.secondParagraph
                }`}
              >
                მაქსიმუმ 255 სიმბოლო
              </p>
            </div>
          </div>
          <div className={styles.descriptionDiv}>
            <p className={styles.descriptionHeader}>აღწერა</p>
            <textarea
              rows="4"
              cols="50"
              type="text"
              ref={descriptionRef}
              onChange={() => validateDescription()}
            />{" "}
            <div className={styles.error}>
              <p
                className={`${styles[thirdP ? "green" : "grey"]} ${
                  styles.firstParagraph
                }`}
              >
                მინიმუმ 2 სიმბოლო
              </p>
              <p
                className={`${styles[fourthP ? "green" : "grey"]} ${
                  styles.secondParagraph
                }`}
              >
                მაქსიმუმ 255 სიმბოლო
              </p>
            </div>
          </div>
          <div className={styles.container2}>
            <div>
              <div className={styles.priorityHeader}>
                <p>პრიორიტეტი</p>{" "}
                <img src="images/Asterisk.png" alt="Required" />
              </div>
              <div
                onClick={() => setPrioritySelector((prev) => !prev)}
                className={styles.border}
              >
                <div className={styles.selectedPriority}>
                  <div className={styles.selectedImg}>
                    <img
                      src={selectedPriority.icon}
                      alt="icon"
                      className={styles.priorityIcon}
                    />
                    <p>{selectedPriority.name}</p>
                  </div>
                  <img
                    src={
                      prioritySelector
                        ? "images/arrow-down.png"
                        : "/images/Shape.svg"
                    }
                    alt="icon"
                    className={styles.icon}
                  />
                </div>
                {prioritySelector &&
                  priorities.map((elem, index) => (
                    <div
                      key={index}
                      className={styles.priorityOption}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents the event from bubbling up
                        selectPriority(index);
                      }}
                    >
                      <img src={elem.icon} />
                      <p>{elem.name}</p>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <div>
                <div className={styles.statusHeader}>
                  <p>სტატუსი</p>{" "}
                  <img src="images/Asterisk.png" alt="Required" />
                </div>
                <div
                  onClick={() => setStatusSelector((prev) => !prev)}
                  className={styles.border}
                >
                  <div className={styles.selectedStatus}>
                    <p>{selectedStatus.name}</p>

                    <img
                      src={
                        statusSelector
                          ? "images/arrow-down.png"
                          : "/images/Shape.svg"
                      }
                      alt="icon"
                      className={styles.icon}
                    />
                  </div>
                  {statusSelector &&
                    statuses.map((elem, index) => (
                      <div
                        key={index}
                        className={styles.statusOption}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents the event from bubbling up
                          selectStatus(index);
                        }}
                      >
                        <p>{elem.name}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.box2}>
          <div className={styles.departmentHeader}>
            <p>დეპარტამენტი</p> <img src="images/Asterisk.png" alt="Required" />
          </div>
          <div
            onClick={() => setDepartmentSelector((prev) => !prev)}
            className={styles.absolute}
          >
            <div className={styles.departmentBorder}>
              <div className={styles.selectedDepartments}>
                <p>{selectedDepartment.name}</p>

                <img
                  src={
                    statusSelector
                      ? "images/arrow-down.png"
                      : "/images/Shape.svg"
                  }
                  alt="icon"
                  className={styles.icon2}
                />
              </div>
              {departmentSelector &&
                departments.map((elem, index) => (
                  <div
                    key={index}
                    className={styles.departmentsOption}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents the event from bubbling up
                      selectDepartment(index);
                    }}
                  >
                    <p>{elem.name}</p>
                  </div>
                ))}
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
