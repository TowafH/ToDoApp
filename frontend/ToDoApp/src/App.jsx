import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // State Variables
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

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

  // const addTask = async () => {
  //   try{
  //     const response = await axios.post("http://127.0.0.1:800/items")
  //   }
  // }

  return (
    <>
      <div className="">
        <h1>To-Do App</h1>
        <button onClick={getTask}>Get Tasks</button>

        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.text} - {item.is_done ? "Yes" : "No"}
            </li>
          ))}
        </ul>

        {/* <button onClick={addTask}>Add Tasks</button> */}
      </div>
    </>
  );
}

export default App;
