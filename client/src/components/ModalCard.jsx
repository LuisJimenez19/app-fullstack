import { useEffect, useState } from "react";
import { getTaskRequest, updateTaskRequest } from "../api/tasks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BiTaskX } from "react-icons/bi";
import { useTasks } from "../hooks/useTasks";

function ModalCard() {
  const { handleRequestTasks } = useTasks();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const [updateTask, setUpdateTask] = useState({});
  const [task, setTask] = useState({});

  useEffect(() => {
    getTaskRequest(id).then((res) => {
      setUpdateTask(res.data.task[0]);
      setTask(res.data.task[0]);
      setIsLoading(false);
    });
  }, [id]);

  function handleChange(e) {
    const newData = { ...updateTask };
    newData[e.target.id] = e.target.value;
    setUpdateTask(newData);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const stringTask = JSON.stringify(task);
    const stringUpdateTask = JSON.stringify(updateTask);
    if (stringTask == stringUpdateTask) {
      return toast.error("No ha actualizado nada", {
        duration: 3000,
      });
    }
    setIsLoadingRequest(true);
    const res = await updateTaskRequest(id, updateTask);
    if (res.status == 200) {
      toast.success("Tarea actualizada.");
      navigate("/tasks");
      handleRequestTasks();
      setIsLoadingRequest(false);
    }
  }

  return (
    <div className="bg-modal-card">
      <div className="modal-card">
        <div className="modal-form">
          <Link className="icon icon-closed" to={"/Tasks"}>
            {<BiTaskX />}
          </Link>
          {isLoading || !updateTask ? (
            <div className="loader loader-request">
              <p>Cargando...</p>
            </div>
          ) : (
            <form className="form form-task-update" onSubmit={handleSubmit}>
              <label className="input-group" htmlFor="name">
                Nombre
                <input
                  className="input input-task input-task-update"
                  onChange={handleChange}
                  type="text"
                  id="name"
                  value={updateTask.name}
                />
              </label>
              <label className="input-group" htmlFor="description">
                Descripción
                <textarea
                  className="input input-task  input-task-update"
                  onChange={handleChange}
                  value={updateTask.description}
                  name="description"
                  id="description"
                  rows="3"
                ></textarea>
              </label>
              <button
                className={`btn btn-submit btn-tasks ${
                  isLoadingRequest ? "btn--active-request" : ""
                }`}
                type="submit"
                role="button"
                aria-label="Editar tarea"
                aria-labelledby="Editar tarea"
              >
                {isLoadingRequest ? "Actualizando" : "Actualizar"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export { ModalCard };
