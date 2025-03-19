import { useRef, useState, useEffect, useContext } from "react";
import styles from "./createTask.module.css";
import { GlobalContext } from "../context/globalContext";

export default function CreateTask() {
  const { priorities, tasks, statuses } = useContext(GlobalContext);
  const titleRef = useRef();
  const descRef = useRef();

  const [prioritySelector, setPrioritySelector] = useState(false);
  const [statusSelector, setStatusSelector] = useState(false);
  console.log(statuses);
  const [selectedPriority, setSelectedPriority] = useState({
    icon: "https://momentum.redberryinternship.ge/storage/priority-icons/Medium.svg",
    name: "საშუალო",
  });
  const [selectedStatus, setSelectedStatus] = useState({
    name: "დასაწყები",
  });
  const [firstP, setFirstP] = useState(false);
  const [secondP, setSecondP] = useState(false);
  const [thirdP, setThirdP] = useState(false);
  const [fourthP, setFourthP] = useState(false);
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
  function validateDescription() {
    const value = descRef.current?.value || "";
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
    validateTitle();
  }, [titleRef.current?.value]);
  useEffect(() => {
    validateDescription();
  }, [descRef.current?.value]);
  function selectPriority(index) {
    setSelectedPriority({
      icon: priorities[index].icon,
      name: priorities[index].name,
    });
    setPrioritySelector(false);
  }
  function selectStatus(index) {
    setSelectedStatus({ name: statuses[index].name });
    setStatusSelector(false);
  }

  useEffect(() => {
    validateTitle(); // Run validation on first render
  }, [titleRef.current?.value]);
  function handleInput(event) {
    event.target.style.height = "auto"; // Reset height
    event.target.style.height = event.target.scrollHeight + "px"; // Adjust height
  }
  return (
    <div>
      <p className={styles.header}>შექმენი ახალი დავალება</p>
      {/* Title Input */}
      <div className={styles.firstInput}>
        <div className={styles.label}>
          <label htmlFor="title" className={styles.titleLabel}>
            სათაური
          </label>
          <img
            className={styles.img1}
            src="images/Asterisk.png"
            alt="Required"
            width="20px"
            height="20px"
          />
        </div>
        <textarea
          type="text"
          id="title"
          className={styles.title}
          ref={titleRef}
          onInput={handleInput}
          rows={1} // Start with one line
          onChange={() => validateTitle()}
        />
        <div className={styles.p}>
          <p className={`${styles[firstP ? "green" : "black"]}`}>
            მინიმუმ 2 სიმბოლო
          </p>
          <p className={`${styles[secondP ? "green" : "black"]}`}>
            მაქსიმუმ 255 სიმბოლო
          </p>
        </div>
      </div>
      {/* Description Input */}
      <div className={styles.inputTwo}>
        <label htmlFor="description" className={styles.descLabel}>
          აღწერა
        </label>
        <textarea
          type="text"
          id="description"
          className={styles.desc}
          ref={descRef}
          onInput={handleInput}
          onChange={() => validateDescription()}
        />
        <div className={styles.p}>
          <p className={`${styles[thirdP ? "green" : "black"]}`}>
            მინიმუმ 2 სიმბოლო
          </p>
          <p className={`${styles[fourthP ? "green" : "black"]}`}>
            მაქსიმუმ 255 სიმბოლო
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.boxes}>
          {/* Priority Dropdown */}
          <div className={styles.priorityWrapper}>
            <div className={styles.label}>
              <label htmlFor="priority" className={styles.priorityLabel}>
                პრიორიტეტი
              </label>
              <img
                src="images/Asterisk.png"
                alt="Required"
                className={styles.img2}
              />
            </div>
            <div className={styles.priorityBox}>
              <div
                className={styles.prioritySelectBox}
                onClick={() => setPrioritySelector((prev) => !prev)}
              >
                <img
                  src={selectedPriority.icon}
                  alt="icon"
                  className={styles.priorityIcon}
                />
                <p>{selectedPriority.name}</p>
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
            </div>
          </div>
        </div>
        <div className={styles.boxes}>
          {/* Status Dropdown */}
          <div className={styles.statusWrapper}>
            <div className={styles.label}>
              <label htmlFor="status" className={styles.statusLabel}>
                სტატუსი
              </label>
              <img
                src="images/Asterisk.png"
                alt="Required"
                className={styles.img3}
              />
            </div>
            <div className={styles.statusBox}>
              <div
                className={styles.box1}
                onClick={() => setStatusSelector((prev) => !prev)}
              >
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
                    className={styles.statusSelect}
                    onClick={() => selectStatus(index)}
                  >
                    <p>{elem.name}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
