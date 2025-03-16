import React, { createContext, useState, useEffect } from "react";

// Create Context
export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]); // New state to store tasks
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              Authorization: "Bearer 9e708294-02a4-4443-9c47-74e761f1334f", // Ensure the token is correct
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }

        const data = await response.json();
        console.log("Fetched employees data:", data); // Debug: Check the data
        setEmployees(data); // Set the fetched data to state
      } catch (err) {
        setError(err.message); // Set the error message if there's an issue
      } finally {
        setLoading(false); // Set loading to false when the request is done
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
              Authorization: "Bearer 9e708294-02a4-4443-9c47-74e761f1334f", // Ensure the token is correct
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch task data");
        }

        const data = await response.json();
        console.log("Fetched tasks data:", data); // Debug: Check the data
        setTasks(data); // Set the fetched task data to state
      } catch (err) {
        setError(err.message); // Set the error message if there's an issue
      } finally {
        setLoading(false); // Set loading to false when the request is done
      }
    };

    fetchTasks();
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <GlobalContext.Provider value={{ employees, tasks, loading, error }}>
      {children}
    </GlobalContext.Provider>
  );
};
