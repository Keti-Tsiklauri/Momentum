import React, { useContext, useRef, useState, useEffect } from "react";
import styles from "./createTasks.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router-dom";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const formatDate = (date) => date.toISOString().split("T")[0];

export default function CreateTasks() {
  const navigate = useNavigate();
  const {
    priorities,
    statuses,
    departments,
    employees,
    tasks,
    setTasks,
    setCreateNewEmployee,
  } = useContext(GlobalContext);

  // Persist selectedDate using localStorage:
  const [selectedDate, setSelectedDate] = useState(() => {
    const saved = localStorage.getItem("selectedDate");
    return saved || formatDate(tomorrow);
  });
  useEffect(() => {
    localStorage.setItem("selectedDate", selectedDate);
  }, [selectedDate]);

  // Persist selectedDepartment:
  const [selectedDepartment, setSelectedDepartment] = useState(() => {
    const saved = localStorage.getItem("selectedDepartment");
    return saved ? JSON.parse(saved) : null;
  });
  useEffect(() => {
    localStorage.setItem(
      "selectedDepartment",
      JSON.stringify(selectedDepartment)
    );
  }, [selectedDepartment]);

  // Persist selectedEmployee:
  const [selectedEmployee, setSelectedEmployee] = useState(() => {
    const saved = localStorage.getItem("selectedEmployee");
    return saved ? JSON.parse(saved) : null;
  });
  useEffect(() => {
    localStorage.setItem("selectedEmployee", JSON.stringify(selectedEmployee));
  }, [selectedEmployee]);

  // Persist title using localStorage
  const titleRef = useRef();
  const [titleValue, setTitleValue] = useState(
    () => localStorage.getItem("taskTitle") || ""
  );
  useEffect(() => {
    localStorage.setItem("taskTitle", titleValue);
  }, [titleValue]);

  // Persist description using localStorage
  const descriptionRef = useRef();
  const [descriptionValue, setDescriptionValue] = useState(
    () => localStorage.getItem("taskDescription") || ""
  );
  useEffect(() => {
    localStorage.setItem("taskDescription", descriptionValue);
  }, [descriptionValue]);

  // Validation states
  const [firstP, setFirstP] = useState(false);
  const [secondP, setSecondP] = useState(false);
  const [thirdP, setThirdP] = useState(false);
  const [fourthP, setFourthP] = useState(false);

  // Priority and status
  const [selectedPriority, setSelectedPriority] = useState(() => {
    const saved = localStorage.getItem("selectedPriority");
    return saved ? JSON.parse(saved) : null;
  });
  useEffect(() => {
    localStorage.setItem("selectedPriority", JSON.stringify(selectedPriority));
  }, [selectedPriority]);
  const [prioritySelector, setPrioritySelector] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState(() => {
    const saved = localStorage.getItem("selectedStatus");
    return saved ? JSON.parse(saved) : null;
  });
  useEffect(() => {
    localStorage.setItem("selectedStatus", JSON.stringify(selectedStatus));
  }, [selectedStatus]);
  const [statusSelector, setStatusSelector] = useState(false);

  const [departmentSelector, setDepartmentSelector] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);

  // For filtering employees by department
  const filteredEmployees = selectedDepartment
    ? employees.filter(
        (employee) => employee.department.id === selectedDepartment.id
      )
    : [];
  const Employee = filteredEmployees.length > 0;

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setShowEmployees(false);
    setSelectedEmployee(null);
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployees(false);
  };

  // Date change handlers
  const handleChange = (e) => {
    const newDate = e.target.value;
    if (newDate >= formatDate(tomorrow)) {
      setSelectedDate(newDate);
    }
  };
  const handleBlur = () => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    const minDate = t.toISOString().split("T")[0];
    if (selectedDate < minDate) {
      setSelectedDate(minDate);
    }
  };

  // State for task creation success
  const [taskAdded, setTaskAdded] = useState(false);

  useEffect(() => {
    if (taskAdded) {
      navigate("/");
      setTaskAdded(false);
    }
  }, [taskAdded, navigate]);

  function validateTitle() {
    const value = titleRef.current?.value || "";
    const trimmedLength = value.trim().length;
    if (trimmedLength === 0) {
      setFirstP(false);
      setSecondP(false);
      return;
    }
    setFirstP(trimmedLength >= 2);
    setSecondP(trimmedLength >= 2 && trimmedLength < 255);
    if (trimmedLength > 255) {
      setSecondP(false);
    }
  }
  useEffect(() => {
    validateTitle();
  }, [titleValue]);

  function validateDescription() {
    const value = descriptionRef.current?.value || "";
    const trimmedDescription = value.trim();
    const words = trimmedDescription.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const trimmedLength = trimmedDescription.length;
    if (trimmedLength === 0) {
      setThirdP(false);
      setFourthP(false);
      return;
    }
    setThirdP(wordCount >= 4);
    setFourthP(trimmedLength < 255);
    if (trimmedLength > 255 || wordCount < 4) {
      setFourthP(false);
    }
  }
  useEffect(() => {
    validateDescription();
  }, [descriptionValue]);

  function selectPriority(index) {
    setSelectedPriority({
      id: priorities[index].id,
      icon: priorities[index].icon,
      name: priorities[index].name,
    });
    setPrioritySelector((prev) => !prev);
  }
  function selectStatus(index) {
    setSelectedStatus({ id: statuses[index].id, name: statuses[index].name });
    setStatusSelector(false);
  }

  const handleSubmit = () => {
    const trimmedTitle = titleRef.current?.value.trim() || "";
    const trimmedDescription = descriptionRef.current?.value.trim() || "";
    if (trimmedTitle.length < 3 || trimmedTitle.length > 255) return;
    if (trimmedDescription.length > 0) {
      const wordCount = trimmedDescription.split(/\s+/).filter(Boolean).length;
      if (wordCount < 4 || trimmedDescription.length > 255) return;
    }
    if (
      !selectedPriority ||
      !selectedStatus ||
      !selectedDepartment ||
      !selectedEmployee ||
      !selectedDate
    )
      return;

    const getTomorrow = () => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      return date.toISOString().split("T")[0];
    };

    if (selectedDate === getTomorrow()) {
      console.log("Deadline must be changed before submitting.");
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      name: trimmedTitle,
      description: trimmedDescription || "No description provided",
      priority: { ...selectedPriority },
      status: { ...selectedStatus },
      department: { ...selectedDepartment },
      employee: { ...selectedEmployee },
      due_date: new Date(selectedDate).toISOString(),
      total_comments: 0,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskAdded(true);
    console.log("Task added successfully:", newTask);

    // Clear input fields and reset localStorage for persisted values.
    setTitleValue("");
    setDescriptionValue("");
    setSelectedPriority(null);
    setSelectedStatus(null);
    setSelectedDepartment(null);
    setSelectedEmployee(null);
    setSelectedDate(formatDate(tomorrow));

    localStorage.removeItem("taskTitle");
    localStorage.removeItem("taskDescription");
    localStorage.removeItem("selectedPriority");
    localStorage.removeItem("selectedStatus");
    localStorage.removeItem("selectedDepartment");
    localStorage.removeItem("selectedEmployee");
    localStorage.setItem("selectedDate", formatDate(tomorrow));
  };

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
              value={titleValue}
              onChange={(e) => {
                setTitleValue(e.target.value);
                validateTitle();
              }}
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
              value={descriptionValue}
              onChange={(e) => {
                setDescriptionValue(e.target.value);
                validateDescription();
              }}
            />
            <div className={styles.error}>
              <p
                className={`${styles[thirdP ? "green" : "grey"]} ${
                  styles.firstParagraph
                }`}
              >
                მინიმუმ 4 სიტყვის
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
                      src={
                        selectedPriority?.icon ||
                        "https://momentum.redberryinternship.ge/storage/priority-icons/Medium.svg"
                      }
                      alt="icon"
                      className={styles.priorityIcon}
                    />
                    <p>{selectedPriority?.name || "საშუალო"}</p>
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
                        e.stopPropagation();
                        selectPriority(index);
                      }}
                    >
                      <img src={elem.icon} alt="icon" />
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
                <section
                  onClick={() => setStatusSelector((prev) => !prev)}
                  className={styles.border}
                >
                  <div className={styles.selectedStatus}>
                    <p>{selectedStatus?.name || "დასაწყები"}</p>
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
                          e.stopPropagation();
                          selectStatus(index);
                        }}
                      >
                        {elem.name}
                      </div>
                    ))}
                </section>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.box2}>
          <div>
            <div className={styles.departmentHeader}>
              <p>დეპარტამენტი</p>
              <img src="images/Asterisk.png" alt="Required" />
            </div>
            <div
              onClick={() => setDepartmentSelector((prev) => !prev)}
              className={styles.absolute}
            >
              <div className={styles.departmentBorder}>
                <div className={styles.selectedDepartments}>
                  <p>
                    {selectedDepartment
                      ? selectedDepartment.name
                      : "აირჩიეთ დეპარტამენტი"}
                  </p>
                  <img
                    src={
                      departmentSelector
                        ? "images/arrow-down.png"
                        : "/images/Shape.svg"
                    }
                    alt="icon"
                    className={styles.icon2}
                  />
                </div>
                {departmentSelector && (
                  <div className={styles.optionsContainer}>
                    {departments.map((department) => (
                      <div
                        key={department.id}
                        className={styles.departmentsOption}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDepartmentSelect(department);
                          setDepartmentSelector(false);
                        }}
                      >
                        <p>{department.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.employees}>
            <div className={styles.employeeHeader}>
              <p className={`${Employee ? styles.activeP : styles.inactiveP}`}>
                პასუხისმგებელი თანამშრომელი
              </p>{" "}
              <img
                src={
                  Employee
                    ? "images/Asterisk.png"
                    : "images/AsteriskInactive.png"
                }
                alt="Required"
              />
            </div>
            <div
              className={`${
                Employee
                  ? styles.EmployeeFilterActive
                  : styles.EmployeeFilterInActive
              }`}
            >
              {Employee || (
                <img
                  src="images/arrow-downInactive.png"
                  className={styles.inactive}
                  alt="Inactive"
                />
              )}
              {Employee && (
                <div
                  className={styles.miniBox}
                  onClick={() => setShowEmployees((prev) => !prev)}
                >
                  {selectedEmployee ? (
                    <div className={styles.con}>
                      <img
                        src={selectedEmployee.avatar}
                        className={styles.avatarImg}
                        alt="Avatar"
                      />
                      <p>
                        {selectedEmployee.name} {selectedEmployee.surname}
                      </p>
                    </div>
                  ) : (
                    <p>დასაწყები</p>
                  )}
                  <img
                    src={
                      showEmployees
                        ? "images/arrow-down.png"
                        : "/images/Shape.svg"
                    }
                    alt="Arrow"
                  />
                </div>
              )}
              <div>
                {showEmployees && (
                  <div>
                    <div
                      className={styles.mini}
                      onClick={() => setCreateNewEmployee(true)}
                    >
                      <div className={styles.img}>
                        <img
                          src="images/+.png"
                          className={styles.plus}
                          alt="Plus"
                        />
                      </div>
                      <p>დაამატე ახალი თანამშრომელი</p>
                    </div>
                    {filteredEmployees.map((elem, index) => (
                      <div
                        className={styles.elements}
                        onClick={() => handleEmployeeSelect(elem)}
                        key={index}
                      >
                        <img
                          src={elem.avatar}
                          className={styles.avatarImg}
                          alt="Avatar"
                        />
                        <p>
                          {elem.name} {elem.surname}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.deadline}>
            <div className={styles.deadlineHeader}>
              <p>დედლაინი</p>
              <img src="images/Asterisk.png" alt="Required" />
            </div>
            <div className={styles.dateContainer}>
              <input
                type="date"
                className={styles.date}
                min={selectedDate}
                value={selectedDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <button
            className={styles.button}
            onClick={() =>
              handleSubmit(
                titleRef.current.value,
                descriptionRef.current.value,
                selectedPriority,
                selectedStatus,
                selectedDepartment,
                selectedEmployee,
                selectedDate,
                tasks,
                setTasks
              )
            }
          >
            დავალების შექმნა
          </button>
        </div>
      </div>
    </div>
  );
}
