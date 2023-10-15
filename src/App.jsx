import React, { useRef, useState } from "react";
import "./App.css";
import { CheckCircle2, Circle, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  const handleAddTodo = () => {
    const todoValue = inputRef.current.value.trim();

    if (!todoValue) {
      toast.error("Please enter a task to add!");
      return;
    }

    const newTodo = { completed: false, todoValue };
    setTodos([...todos, newTodo]);
    inputRef.current.value = "";
    toast.success("Task Added Successfully");
  };

  const handleItemDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    toast.success(
      newTodos[index].completed
        ? "Task marked as done"
        : "Task marked as undone"
    );
  };

  const handleDeleteItem = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    toast.success("Task deleted successfully");
  };

  return (
    <div className="todo-app">
      <h1 className="app-title">
        To-Do <span style={{ color: "#6a5acd" }}>List</span>
      </h1>
      <ul className="todo-list">
        {todos.map(({ todoValue, completed }, index) => (
          <div key={index} className="todo-item">
            <li
              className={`todo-task ${completed ? "done" : ""}`}
              onClick={() => handleItemDone(index)}
            >
              {completed ? (
                <CheckCircle2 className="todo-completed" />
              ) : (
                <Circle className="todo-circle" />
              )}
              <p className="todo-task">{todoValue}</p>
            </li>
            <X
              className="delete-button"
              onClick={() => handleDeleteItem(index)}
            />
          </div>
        ))}
      </ul>
      <input
        ref={inputRef}
        className="task-input"
        placeholder="Enter a task..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTodo();
          }
        }}
      />
      <button className="add-button" onClick={handleAddTodo}>
        Add Task
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
