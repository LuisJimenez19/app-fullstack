/* eslint-disable react/prop-types */
import { useState } from "react";
import { createTaskRequest, getTasksRequest } from "../../api/tasks";
import { toast } from "react-hot-toast";
import { useTasks } from "../../hooks/useTasks";

function TaskForm({ isAddTask, setIsAddTask }) {
  const { setTasks } = useTasks();
  const [data, setData] = useState({});
  const [isLoading, setIsloading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setIsloading(true);
    try {
      const res = await createTaskRequest(data);
      if (res.status === 200) {
        const result = await getTasksRequest();
        setTasks(result.data.tasks);
        setIsAddTask(false);
        toast.success("Add task succesfully", {
          duration: 2000,
        });
        setIsloading(false);
      }
      e.target.reset();
      setData({});
    } catch (error) {
      const msg = error.response.data.message;
      toast.error(msg, {
        duration: 2000,
      });
      setIsloading(false);
      console.log(error.response.data);
    }
  }

  function handleChange(e) {
    const newTask = { ...data };
    newTask[e.target.id] = e.target.value;
    setData(newTask);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className={`form-tasks ${isAddTask ? "form--active" : ""}`}
    >
      <div>
        {isAddTask && <label htmlFor="name">Nombre de la tarea</label>}
        <input
          className="input input-task"
          onChange={handleChange}
          onFocus={() => setIsAddTask(true)}
          type="text"
          id="name"
          placeholder="Lavarme la carita"
          autoComplete="off"
        />
      </div>
      <div>
        {isAddTask && (
          <label htmlFor="description">Descripción de la tarea</label>
        )}
        <textarea
          className="input input-task"
          onChange={handleChange}
          type="text"
          id="description"
          placeholder="con agua y con jabón"
          rows={5}
        />
      </div>

      <button
        role="button"
        aria-label="Agregar nueva tarea"
        aria-labelledby="Agregar nueva tarea"
        className={`btn btn-submit btn-tasks ${
          isLoading ? "btn--active-request" : ""
        }`}
        type="submit"
      >
        {isLoading ? "agregando" : "Agregar"}
      </button>
    </form>
  );
}

export { TaskForm };
