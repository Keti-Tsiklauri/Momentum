import { GlobalContext } from "../context/globalContext";
import styles from "./createTasks.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const formatDate = (date) => date.toISOString().split("T")[0];
export default function CreateTasks() {
  const [taskAdded, setTaskAdded] = useState(false);
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
  const [selectedDate, setSelectedDate] = useState(formatDate(tomorrow));
  useEffect(() => {
    const getTomorrow = () => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      return date.toISOString().split("T")[0]; // Format YYYY-MM-DD
    };

    setSelectedDate(getTomorrow()); // Set default to tomorrow
  }, []);

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [departmentSelector, setDepartmentSelector] = useState(false);
  // const [employeeSelector, setEmployeeSelector] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployees, setShowEmployees] = useState(false);

  const filteredEmployees = selectedDepartment
    ? employees.filter(
        (employee) => employee.department.id === selectedDepartment.id
      )
    : [];
  const Employee = filteredEmployees.length > 0;

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setSelectedEmployees([]); // Reset selected employees when department changes
    setDepartmentSelector(false);
    setShowEmployees(false);
    setSelectedEmployee(null);
  };

  const titleRef = useRef();

  const descriptionRef = useRef();
  const [firstP, setFirstP] = useState(false);
  const [secondP, setSecondP] = useState(false);
  const [thirdP, setThirdP] = useState(false);
  const [fourthP, setFourthP] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [prioritySelector, setPrioritySelector] = useState(false);
  const [statusSelector, setStatusSelector] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState(null);
  useEffect(() => {
    if (taskAdded) {
      navigate("/");
      setTaskAdded(false); // Reset after navigation
    }
  }, [taskAdded, navigate]);

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
    const trimmedDescription = value.trim();
    const words = trimmedDescription.split(/\s+/).filter(Boolean); // Split into words and remove empty spaces
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
  }, [descriptionRef.current?.value]);
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
  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);

    setShowEmployees(false);
  };

  const handleChange = (e) => {
    const newDate = e.target.value;
    if (newDate >= formatDate(tomorrow)) {
      setSelectedDate(newDate);
    }
  };
  const handleBlur = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    if (selectedDate < minDate) {
      setSelectedDate(minDate); // Correct only on blur
    }
  };

  const handleSubmit = () => {
    const trimmedTitle = titleRef.current?.value.trim() || "";
    const trimmedDescription = descriptionRef.current?.value.trim() || "";

    // Title validation
    if (trimmedTitle.length < 3 || trimmedTitle.length > 255) {
      return;
    }

    // Description validation
    if (trimmedDescription.length > 0) {
      const wordCount = trimmedDescription.split(/\s+/).filter(Boolean).length;
      if (wordCount < 4 || trimmedDescription.length > 255) {
        return;
      }
    }

    // Required fields validation
    if (
      !selectedPriority ||
      !selectedStatus ||
      !selectedDepartment ||
      !selectedEmployee ||
      !selectedDate
    ) {
      return;
    }

    // Get tomorrow's date for comparison
    const getTomorrow = () => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      return date.toISOString().split("T")[0]; // Format YYYY-MM-DD
    };

    // Prevent submission if deadline is unchanged
    if (selectedDate === getTomorrow()) {
      console.log("Deadline must be changed before submitting.");
      return;
    }

    // Create the new task
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

    // Update tasks
    setTasks((prevTasks) => [...prevTasks, newTask]);

    setTaskAdded(true);
    console.log("Task added successfully:", newTask);
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
                მინიმუმ 4 სიტყვა
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
                          e.stopPropagation(); // Prevents the event from bubbling up
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
                  ></img>
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
                        <img src="images/+.png" className={styles.plus} />{" "}
                      </div>
                      <p>დაამატე ახალი თანამშრომელი</p>
                    </div>
                    {filteredEmployees.map((elem, index) => (
                      <div
                        className={styles.elements}
                        onClick={() => handleEmployeeSelect(elem)}
                      >
                        <img src={elem.avatar} className={styles.avatarImg} />
                        <p key={index}>
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
