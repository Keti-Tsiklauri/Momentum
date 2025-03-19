import { GlobalContext } from "../context/globalContext";
import styles from "./createTasks.module.css";
import { useRef, useState, useEffect, useContext } from "react";
export default function CreateTasks() {
  const { priorities, statuses, departments, employees } =
    useContext(GlobalContext);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [departmentSelector, setDepartmentSelector] = useState(false);
  const [employeeSelector, setEmployeeSelector] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployees, setShowEmployees] = useState(false);
  console.log("selectedEmployee", selectedEmployees);
  console.log("employee selector", employeeSelector);
  // Filter employees based on the selected department
  const filteredEmployees = selectedDepartment
    ? employees.filter(
        (employee) => employee.department.id === selectedDepartment.id
      )
    : [];
  const Employee = filteredEmployees.length > 0;
  console.log("employeee", Employee);
  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setSelectedEmployees([]); // Reset selected employees when department changes
    setDepartmentSelector(false);
    setShowEmployees(false);
    setSelectedEmployee(null);
  };

  const titleRef = useRef();
  console.log("shjbnshjbhjbhj", employees);
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

  const [selectedStatus, setSelectedStatus] = useState({
    name: "დასაწყები",
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
    setSelectedStatus({ name: statuses[index].name });
    setStatusSelector(false);
  }
  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);

    setShowEmployees(false);
  };
  console.log(departments);
  console.log(filteredEmployees);
  console.log(selectedEmployee);
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
                <section
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
                      <img src={selectedEmployee.avatar} />
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
                    <div className={styles.mini}>
                      <div className={styles.img}>
                        <img src="images/+.png" />{" "}
                      </div>
                      <p>დაამატე ახალი თანამშრომელი</p>
                    </div>
                    {filteredEmployees.map((elem, index) => (
                      <div
                        className={styles.elements}
                        onClick={() => handleEmployeeSelect(elem)}
                      >
                        <img src={elem.avatar} />
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
        </div>
      </div>
    </div>
  );
}
