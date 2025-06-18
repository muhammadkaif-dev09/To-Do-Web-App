import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodo = localStorage.getItem("userToDo's");
    return storedTodo ? JSON.parse(storedTodo) : [];
  });

  const createToDo = (event) => {
    event.preventDefault();
    const title = event.target.todoTitle.value.trim();
    if (!title) return toast.error("You forgot to type something!");

    const isDuplicate = todos.some((todo) => todo.title === title);
    if (isDuplicate) {
      toast.warning("You already added this to-do.");
    } else {
      setTodos([...todos, { title, checked: false }]);
      toast.success("To-Do title added successfully.");
      event.target.reset();
    }
  };

  // Save to localStorage when todos change
  useEffect(() => {
    localStorage.setItem("userToDo's", JSON.stringify(todos));
  }, [todos]);

  const deleteTodo = (indexToRemove) => {
    const filterTodos = todos.filter((_, index) => index !== indexToRemove);
    setTodos(filterTodos);
    toast.info("Your to-do has been removed");
  };

  const checkboxStatus = (indexToToggle) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === indexToToggle) {
        return { ...todo, checked: !todo.checked };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-rose-100 to-red-100 flex justify-center items-center">
      <ToastContainer />
      <div className="bg-white w-sm p-4 mx-4 rounded-2xl md:w-[55rem]">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🌸 My To-Do List
        </h1>
        <form className="mb-4" onSubmit={createToDo}>
          <div className="flex gap-2 mb-4 flex-col md:flex-row">
            <input
              name="todoTitle"
              type="text"
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
            />
            <button className="bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-xl transition font-semibold">
              Add
            </button>
          </div>
        </form>

        <ul className="w-full max-h-[300px] overflow-y-auto pr-2">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-rose-50 p-3 rounded-xl shadow-sm mb-3"
            >
              <div className="flex gap-2 items-center">
                <span>{index + 1}</span>
                <input
                  type="checkbox"
                  checked={todo.checked}
                  onClick={() => checkboxStatus(index)}
                />
                <span
                  className={`text-gray-700 ${
                    todo.checked ? "line-through" : ""
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(index)}
                className="text-rose-300 hover:text-rose-500 cursor-pointer text-xl"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>

        <div className="text-center text-sm text-gray-400 mt-6 space-y-1">
          <p className="font-medium">❤️ Stay productive and beautiful! ❤️</p>
          <p className="italic">
            All rights reserved by{" "}
            <a href="https://www.google.com" className="hover:text-red-300">
              @Kaif Chandiwala
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TodoApp;
