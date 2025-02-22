import { useState } from "react";
import { Url } from "../server";
import axios from "axios";

const TaskModal = ({ isOpen, onClose,fetchTasks, user }) => {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("todo");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data =  { title, description, category,email:user?.email };
    axios.post(Url+"/api/tasks",data)
    .then(res => {
        setTitle("");
        setDescription("");
        setCategory("todo");
        fetchTasks()
        onClose();
    })

     
    
  };

  if (!isOpen) return null; // Don't render the modal if isOpen is false

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-300 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
