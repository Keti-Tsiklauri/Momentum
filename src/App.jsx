import FirstPage from "./components/FirstPage";
import Header from "./components/Header";
import styles from "./app.module.css";
import DropDown from "./components/DropDown";
import DepartmentFilter from "./components/DepartmentFilter";
function App() {
  return (
    <div className={styles.container}>
      <DepartmentFilter />
      <Header />

      <FirstPage />
    </div>
  );
}

export default App;
