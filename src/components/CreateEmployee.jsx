import { useContext, useEffect, useRef, useState } from "react";
import styles from "./createEmployee.module.css";
import { GlobalContext } from "../context/globalContext";

export default function CreateEmployee() {
  const [showDep, setShowDep] = useState(false);
  const [firstP, setFirstP] = useState(false);
  const [secondP, setSecondP] = useState(false);
  const [thirdP, setThirdP] = useState(false);
  const [fourthP, setFourthP] = useState(false);
  const [image, setImage] = useState(null);
  const NameRef = useRef(null);
  const SurnameRef = useRef(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const {
    createNewEmployee,
    setCreateNewEmployee,
    departments,
    employees,
    setEmployees,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (createNewEmployee) {
      // Reset all fields when reopening the form
      if (NameRef.current) NameRef.current.value = "";
      if (SurnameRef.current) SurnameRef.current.value = "";
      setImage(null);
      setSelectedDepartment(null);
      setFirstP(false);
      setSecondP(false);
      setThirdP(false);
      setFourthP(false);
    }
  }, [createNewEmployee]);

  if (!createNewEmployee) return null;

  function closeDep(department) {
    setShowDep(false);
    setSelectedDepartment(department);
  }

  function validateName() {
    const value = NameRef.current?.value.trim() || "";
    setFirstP(value.length >= 2);
    setSecondP(value.length > 0 && value.length <= 255);
  }

  function validateSurname() {
    const value = SurnameRef.current?.value.trim() || "";
    setThirdP(value.length >= 2);
    setFourthP(value.length > 0 && value.length <= 255);
  }

  function handleImageUpload(event) {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }

  function handleAddNewEmployee() {
    const name = NameRef.current?.value.trim();
    const surname = SurnameRef.current?.value.trim();

    if (
      !firstP ||
      !secondP ||
      !thirdP ||
      !fourthP ||
      !name ||
      !surname ||
      !image ||
      !selectedDepartment
    ) {
      console.log("Error: All fields must be filled correctly!");
      return;
    }

    const newEmployee = {
      id: employees.length + 1,
      avatar: image,
      department: selectedDepartment,
      name,
      surname,
    };

    setEmployees((prev) => [...prev, newEmployee]);
    setCreateNewEmployee(false);
  }

  return (
    <div>
      <div
        className={`${styles.overlay} ${createNewEmployee ? styles.show : ""}`}
        onClick={() => setCreateNewEmployee(false)}
      ></div>

      <div className={styles.show}>
        <img
          src="images/Cancel.png"
          className={styles.closeImg}
          onClick={() => setCreateNewEmployee(false)}
          alt="Close"
        />
        <p className={styles.header}>თანამშრომლის დამატება</p>

        <div className={styles.box}>
          <div className={styles.boxes}>
            <div className={styles.mini1}>
              <p>სახელი</p>
              <img src="images/Asterisk.png" alt="Required" />
            </div>
            <input
              type="text"
              className={styles.input}
              ref={NameRef}
              onChange={validateName}
            />
            <div className={styles.boxMini}>
              <div className={styles.p1}>
                <img src="images/check.png" />
                <p className={firstP ? styles.green : styles.P1}>
                  მინიმუმ 2 სიმბოლო
                </p>
              </div>
              <div className={styles.p2}>
                <img src="images/check.png" />
                <p className={secondP ? styles.green : styles.P2}>
                  მაქსიმუმ 255 სიმბოლო
                </p>
              </div>
            </div>
          </div>

          <div className={styles.boxes}>
            <div className={styles.mini2}>
              <p>გვარი</p>
              <img src="images/Asterisk.png" alt="Required" />
            </div>
            <input
              type="text"
              className={styles.input}
              ref={SurnameRef}
              onChange={validateSurname}
            />
            <div className={styles.boxMini}>
              <div className={styles.p1}>
                <img src="images/check.png" />
                <p className={thirdP ? styles.green : styles.P1}>
                  მინიმუმ 2 სიმბოლო
                </p>
              </div>
              <div className={styles.p2}>
                <img src="images/check.png" />
                <p className={fourthP ? styles.green : styles.P1}>
                  მაქსიმუმ 255 სიმბოლო
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className={styles.avatar}>
            <p>ავატარი</p>
            <img src="images/Asterisk.png" alt="Required" />
          </div>

          <div className={styles.uploadImg}>
            {image ? (
              <div className={styles.box2}>
                <img
                  src={image}
                  alt="Uploaded Preview"
                  className={styles.uploaded}
                />
                <img
                  src="images/delete.png"
                  className={styles.delete}
                  onClick={() => setImage(null)}
                />
              </div>
            ) : (
              <label
                htmlFor="fileInput"
                className={styles.miniBox}
                style={{ cursor: "pointer" }}
              >
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <img
                  src="images/gallery-export.png"
                  alt="Upload Icon"
                  className={styles.img1}
                />
                <p>ატვირთე ფოტო</p>
              </label>
            )}
          </div>

          <div className={styles.departmentSelector}>
            <div className={styles.depHeader}>
              <img src="images/Asterisk.png" alt="Required" />
              <p> დეპარტამენტი</p>
            </div>
            <div className={styles.dropDown1}>
              <div
                onClick={() => setShowDep(!showDep)}
                className={styles.select}
              >
                <p>{selectedDepartment?.name || "აირჩიეთ დეპარტამენტი"}</p>
                <img
                  className={styles.arrow}
                  src={
                    showDep ? "/images/arrow-down.png" : "/images/arrow-up.png"
                  }
                  alt="Toggle Dropdown"
                />
              </div>
              {showDep &&
                departments.map((elem, index) => (
                  <p onClick={() => closeDep(elem)} key={index}>
                    {elem.name}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button
            className={styles.cencel}
            onClick={() => setCreateNewEmployee(false)}
          >
            გაუქმება
          </button>
          <button className={styles.add} onClick={handleAddNewEmployee}>
            დაამატე თანამშრომელი
          </button>
        </div>
      </div>
    </div>
  );
}
