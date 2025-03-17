import React, { createContext, useState, useEffect } from "react";

// Create Context
export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showDepartmentSelector, setShowDepartmentSelector] = useState(false);
  const [showPrioritiesSelector, setShowPrioritiesSelector] = useState(false);
  const [showEmployeesSelector, setShowEmployeesSelector] = useState(false);
  const [filteredArray, setFilteredArray] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(null);
  // Fetch employees data when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/employees",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer 9e71b5fc-2b77-4c06-a93a-24765463646a",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }

        const data = await response.json();

        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []); // Empty dependency array ensures this effect runs once on mount

  // Fetch tasks data when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/tasks",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer 9e71b5fc-2b77-4c06-a93a-24765463646a", // Ensure the token is correct
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch task data");
        }

        const data = await response.json();

        setTasks(data);
      } catch (err) {
        setError(err.message); // Set the error message if there's an issue
      } finally {
        setLoading(false); // Set loading to false when the request is done
      }
    };

    fetchTasks();
  }, []); // Empty dependency array ensures this effect runs once on mount
  //fetch statuses
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/statuses",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer 9e71b5fc-2b77-4c06-a93a-24765463646a",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch task data");
        }

        const data = await response.json();

        setStatuses(data); // Set the fetched task data to state
      } catch (err) {
        setError(err.message); // Set the error message if there's an issue
      } finally {
        setLoading(false); // Set loading to false when the request is done
      }
    };

    fetchStatuses();
  }, []); // Empty dependency array ensures this effect runs once on mount

  //fetch priorities
  useEffect(() => {
    const fetchPriorities = async () => {
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/priorities",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer 9e71b5fc-2b77-4c06-a93a-24765463646a",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch priorities data");
        }

        const data = await response.json();

        setPriorities(data); // Set the fetched task data to state
        console.log("prioriteti", priorities);
      } catch (err) {
        setError(err.message); // Set the error message if there's an issue
      } finally {
        setLoading(false); // Set loading to false when the request is done
      }
    };

    fetchPriorities();
  }, []); // Empty dependency array ensures this effect runs once on mount
  console.log("prio", priorities);
  //fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/departments",

          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer 9e71b5fc-2b77-4c06-a93a-24765463646a",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch priorities data");
        }

        const data = await response.json();

        setDepartments(data); // Set the fetched task data to state
        console.log("prioriteti", priorities);
      } catch (err) {
        setError(err.message); // Set the error message if there's an issue
      } finally {
        setLoading(false); // Set loading to false when the request is done
      }
    };

    fetchDepartments();
  }, []); // Empty dependency array ensures this effect runs once on mount
  console.log("dep", departments);
  return (
    <GlobalContext.Provider
      value={{
        employees,
        tasks,
        loading,
        error,
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
