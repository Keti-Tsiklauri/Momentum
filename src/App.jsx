import FirstPage from "./components/FirstPage";
import Header from "./components/Header";
import styles from "./app.module.css";
import DropDown from "./components/DropDown";
import { Routes, Route } from "react-router-dom";
import DepartmentFilter from "./components/DepartmentFilter";
import Priorities from "./components/Priorities";
import EmployeesFilter from "./components/EmploeesFilter";
import CreateTask from "./components/CreateTask";
function App() {
  return (
    <div className={styles.container}>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              {" "}
              <DepartmentFilter />
              <Priorities />
              <EmployeesFilter />
              <FirstPage />
            </>
          }
        />
        <Route path="/createtask" element={<CreateTask />} />
      </Routes>
    </div>
  );
}

export default App;
