import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { Url } from "../server";
import TaskModal from "./TaskModal";
const initialTasks = {
  todo: [],
  inProgress: [],
  done: [],
};
const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskToUpdate, setTaskToUpdate] = useState(null); // New state to hold task for API update
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (taskToUpdate) {
      // When taskToUpdate changes, call the API
      const updateTask = async () => {
        try {
          await axios.put(Url + `/api/tasks/${taskToUpdate._id}`, {
            category: taskToUpdate.category, // Ensure category is passed from taskToUpdate
          });
          console.log("Task updated:", taskToUpdate);
        } catch (error) {
          console.error("Error updating task:", error);
        }
      };
      updateTask();
    }
  }, [taskToUpdate]);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        Url + "/api/tasks?email=linkon@gmail.com"
      );
      const groupedTasks = {
        todo: response.data.filter((task) => task.category === "todo"),
        inProgress: response.data.filter(
          (task) => task.category === "inProgress"
        ),
        done: response.data.filter((task) => task.category === "done"),
      };
      setTasks(groupedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    let movedTask;
    setTasks((prevTasks) => {
      const sourceTasks = [...prevTasks[source.droppableId]];
      const destinationTasks =
        source.droppableId === destination.droppableId
          ? sourceTasks
          : [...prevTasks[destination.droppableId]];

      const [task] = sourceTasks.splice(source.index, 1);
      movedTask = task;

      destinationTasks.splice(destination.index, 0, movedTask);

      return {
        ...prevTasks,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destinationTasks,
      };
    });

    // Set taskToUpdate to trigger the useEffect and update the task on the backend
    setTaskToUpdate({
      ...movedTask,
      category: destination.droppableId,
    });
  };

  const handleDeleteTask = (id) => {
    console.log(id);
    axios.delete(Url + "/api/tasks/" + id).then((res) => {
      fetchTasks();
    });
  };

  return (
    <div>
      <div className="ml-5">
        <button
          onClick={toggleModal}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Task
        </button>

        {/* Modal */}
        <TaskModal
          fetchTasks={fetchTasks}
          isOpen={isModalOpen}
          onClose={toggleModal}
        />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4 p-4">
          {Object.entries(tasks).map(([columnKey, columnTasks]) => (
            <Droppable key={columnKey} droppableId={columnKey} mode="standard">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="relative bg-gray-200 p-4 rounded-lg min-h-[400px]"
                >
                  <h2 className="text-lg font-bold capitalize mb-2">
                    {columnKey.replace(/([A-Z])/g, " $1")}
                  </h2>
                  {columnTasks.map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-white p-2 mb-2 flex items-center justify-between rounded shadow ${
                            snapshot.isDragging ? "z-50" : ""
                          }`}
                          style={{
                            ...provided.draggableProps.style,
                            transform: snapshot.isDragging
                              ? provided.draggableProps.style?.transform
                              : "none",
                          }}
                        >
                          <div>
                            <h3 className="font-semibold">{task.title}</h3>
                            <p className="text-sm text-gray-600">
                              {task.description}
                            </p>
                          </div>
                          <p
                            onClick={() => handleDeleteTask(task._id)}
                            title="delete"
                            className="text-red-600 mr-2 cursor-pointer text-[16px] font-bold"
                          >
                            X
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
