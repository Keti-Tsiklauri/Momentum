import { useRef, useState, useEffect, useContext } from "react";
import styles from "./createTask.module.css";
import { GlobalContext } from "../context/globalContext";

export default function CreateTask() {
  const { priorities, tasks } = useContext(GlobalContext);
  const titleRef = useRef();
  const descRef = useRef();

  const errorMassage = ["მინიმუმ 2 სიმბოლო", "მაქსიმუმ 255 სიმბოლო"];
  const [errors, setErrors] = useState(errorMassage); // Show both errors initially
  const [descErrors, setDescErrors] = useState(errorMassage);
  const [prioritySelector, setPrioritySelector] = useState(false);
  function validateTitle() {
    const value = titleRef.current?.value || "";
    const newErrors = [];

    if (value.length < 2) {
      newErrors.push("მინიმუმ 2 სიმბოლო");
      newErrors.push("მაქსიმუმ 255 სიმბოლო");
    }
    if (value.length > 255) {
      newErrors.push("მაქსიმუმ 255 სიმბოლო");
    }

    setErrors(newErrors);
  }

  function validateDescription() {
    const value = descRef.current?.value || "";
    const newErrors = [];

    if (value.length < 2) {
      newErrors.push("მინიმუმ 2 სიმბოლო");
      newErrors.push("მაქსიმუმ 255 სიმბოლო");
    }
    if (value.length > 255) {
      newErrors.push("მაქსიმუმ 255 სიმბოლო");
    }

    setDescErrors(newErrors);
  }

  useEffect(() => {
    validateTitle(); // Run validation on first render
  }, [titleRef.current?.value]);

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
            src="images/Asterisk.png"
            alt="Required"
            width="20px"
            height="20px"
          />
        </div>
        <input
          type="text"
          id="title"
          className={styles.title}
          ref={titleRef}
          onChange={validateTitle}
        />
        <div className={styles.p}>
          {errors.map((error, index) => (
            <p key={index} className={styles.error}>
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Description Input */}
      <div className={styles.inputTwo}>
        <label htmlFor="description" className={styles.descLabel}>
          აღწერა
        </label>
        <input
          type="text"
          id="description"
          className={styles.desc}
          ref={descRef}
          onChange={validateDescription}
        />
        <div className={styles.p}>
          {descErrors.map((error, index) => (
            <p key={index} className={styles.error}>
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Priority Dropdown */}
      <div className={styles.priority}>
        <div className={styles.label}>
          <label htmlFor="priority" className={styles.priorityLabel}>
            პრიორიტეტი
          </label>
          <img src="images/Asterisk.png" alt="Required" />
        </div>
        <div className={styles.prio}>
          <div
            onClick={() => setPrioritySelector((prev) => !prev)}
            className={styles.box1}
          >
            <img src={priorities[1]?.icon} />
            <p>{priorities[1]?.name}</p>

            <img
              src={
                prioritySelector ? "images/arrow-down.png" : "/images/Shape.svg"
              }
              alt="icon"
              className={styles.icon}
            />
          </div>
          <div>
            {prioritySelector &&
              priorities.map((elem, index) => (
                <div key={index} className={styles.prioritySelec}>
                  <img src={elem.icon} />
                  <p>{elem.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
