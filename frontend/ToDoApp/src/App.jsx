import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // State Variables
  const [items, setItems] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Async API Call
  const getTask = async () => {
    try {
      // GET Request to the backend
      const response = await axios.get("http://127.0.0.1:8000/items");
      // View in Console
      console.log(response);
      // Update items variable with data array
      setItems(response.data);
    } catch (error) {
      // Handle Errors
      console.error(`Error: ${error}`);
    }
  };

  // useEffect to load new tasks from input
  useEffect(() => {
    getTask()
  }, [items])

  // New Task Input Handler
  const newTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  // Add Task API Call
  const addTask = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/items", {
        text: newTask,
        is_done: false,
      });
      console.log("Task Added:", response.data);
    } catch (error) {
      console.error("Error Adding Task:", error);
    }
  };

  return (
    <>
    <div className="flex justify-center mx-auto">
      <div className="border border-white-600 rounded-sm p-8">
        <h1>To-Do App</h1>
        <button onClick={getTask}>Get Tasks</button>
        <br/>
        <input
          value={newTask}
          placeholder="Enter a Task!"
          onChange={newTaskChange}
          className="bg-black pd-8"
        />
        <button onClick={addTask}>Add Tasks</button>
      </div>

      <div className="border border-white-600 rounded-sm p-8 w-md">
        <h1>Tasks</h1>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.text} - {item.is_done ? "Yes" : "No"}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}

export default App;
