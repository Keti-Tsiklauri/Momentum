import FirstPage from "./components/FirstPage";
import Header from "./components/Header";
import styles from "./app.module.css";
import DropDown from "./components/DropDown";
import DepartmentFilter from "./components/DepartmentFilter";
import Priorities from "./components/Priorities";
function App() {
  return (
    <div className={styles.container}>
      <DepartmentFilter />
      <Priorities />
      <Header />

      <FirstPage />
    </div>
  );
}

export default App;
