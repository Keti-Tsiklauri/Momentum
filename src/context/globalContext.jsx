import React, { createContext, useState, useEffect } from "react";

// Create Context
export const GlobalContext = createContext();

// API URL and Authorization Token
const API_URL = "https://momentum.redberryinternship.ge/api";
const AUTH_HEADER = {
  "Content-Type": "application/json",
  Authorization: "Bearer 9e71b5fc-2b77-4c06-a93a-24765463646a",
};

export const GlobalProvider = ({ children }) => {
  const [createNewEmployee, setCreateNewEmployee] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState(() => {
    const localTasks = localStorage.getItem("tasks");
    return localTasks ? JSON.parse(localTasks) : [];
  });
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [taskComments, setTaskComments] = useState(() => {
    const localComments = localStorage.getItem("taskComments");
    return localComments ? JSON.parse(localComments) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDepartmentSelector, setShowDepartmentSelector] = useState(false);
  const [showPrioritiesSelector, setShowPrioritiesSelector] = useState(false);
  const [showEmployeesSelector, setShowEmployeesSelector] = useState(false);
  const [filteredArray, setFilteredArray] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [openTask, setOpenTask] = useState(null);

  // Save tasks and taskComments to localStorage when they update
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("taskComments", JSON.stringify(taskComments));
  }, [taskComments]);

  // Fetch data helper function
  const fetchData = async (endpoint, setState) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: "GET",
        headers: AUTH_HEADER,
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint} data`);
      }
      const data = await response.json();
      setState(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all necessary data on mount
  useEffect(() => {
    fetchData("employees", setEmployees);
    // Only fetch tasks if localStorage is empty
    if (tasks.length === 0) {
      fetchData("tasks", setTasks);
    }
    fetchData("statuses", setStatuses);
    fetchData("priorities", setPriorities);
    fetchData("departments", setDepartments);
  }, []);

  // Fetch task comments when openTask changes
  useEffect(() => {
    if (!openTask) return;
    fetchData(`tasks/${openTask}/comments`, setTaskComments);
  }, [openTask]);

  return (
    <GlobalContext.Provider
      value={{
        employees,
        tasks,
        setTasks,
        statuses,
        priorities,
        departments,
        showDepartmentSelector,
        setShowDepartmentSelector,
        filteredArray,
        setFilteredArray,
        clickedIndex,
        setClickedIndex,
        showPrioritiesSelector,
        setShowPrioritiesSelector,
        showEmployeesSelector,
        setShowEmployeesSelector,
        createNewEmployee,
        setCreateNewEmployee,
        setEmployees,
        openTask,
        setOpenTask,
        taskComments,
        setTaskComments,
        loading,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
