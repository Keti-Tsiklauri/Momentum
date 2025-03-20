import { Routes, Route } from "react-router-dom";
import styles from "./app.module.css";
import Header from "./components/Header";
import FirstPage from "./components/FirstPage";
import DepartmentFilter from "./components/DepartmentFilter";
import Priorities from "./components/Priorities";
import EmployeesFilter from "./components/EmployeesFilter";
import CreateTasks from "./components/CreateTasks";
import { useContext } from "react";
import { GlobalContext } from "./context/globalContext";
import CreateEmployee from "./components/CreateEmployee";
import TaskPage from "./components/TaskPage";

function App() {
  const { createNewEmployee, openTask } = useContext(GlobalContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <CreateEmployee />
            {/* Apply blur when modal is open */}
            <div className={createNewEmployee ? styles.blur : ""}>
              <Header />

              {typeof openTask === "number" ? (
                <TaskPage openTask={openTask} />
              ) : (
                <>
                  <DepartmentFilter />
                  <Priorities />
                  <EmployeesFilter />
                  <FirstPage />
                </>
              )}
            </div>
          </div>
        }
      />
      <Route
        path="/createtasks"
        element={
          <div>
            {" "}
            <CreateEmployee />
            <div className={createNewEmployee ? styles.blur : ""}>
              <Header />
              <CreateTasks />
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
