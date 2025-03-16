import FirstPage from "./components/FirstPage";
import Header from "./components/Header";
import styles from "./app.module.css";
function App() {
  return (
    <div className={styles.container}>
      <Header />
      <FirstPage />
    </div>
  );
}

export default App;
