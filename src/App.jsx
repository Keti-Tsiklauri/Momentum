import FirstPage from "./components/FirstPage";
import Header from "./components/Header";
import styles from "./app.module.css";
import DropDown from "./components/DropDown";
import DepartmentFilter from "./components/DepartmentFilter";
import Priorities from "./components/Priorities";
import EmployeesFilter from "./components/EmploeesFilter";
function App() {
  return (
    <div className={styles.container}>
      <DepartmentFilter />
      <Priorities />
      <EmployeesFilter />
      <Header />

      <FirstPage />
    </div>
  );
}

export default App;
