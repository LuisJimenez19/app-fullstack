/* eslint-disable react/prop-types */

import {
  deleteTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../../api/tasks";
import toast from "react-hot-toast";

import { useTasks } from "../../hooks/useTasks";
import { useState } from "react";

//eslint-disable-next-line
function TaskConfirmation({
  setIsActiveConfirmation,
  action,
  isActiveConfirmation,
  id,
}) {
  const { setTasks } = useTasks();
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  // const [copyTasks, setCopyTasks] = useState()
  async function handleClick() {
    setIsLoadingRequest(true);
    if (action == "done") {
      const res = await updateTaskRequest(id, {
        done: true,
      });

      if (res.status == 200) {
        toast.success("Tarea completada.");
      }
    } else if (action == "delete") {
      const res = await deleteTaskRequest(id);

      if (res.status == 200) {
        toast.success(res.data.message);
        setIsActiveConfirmation(false);
      }
    }
    // handleRequestTasks();
    const result = await getTasksRequest();
    setTasks(result.data.tasks);
    setIsLoadingRequest(false);
  }

  return (
    <div
      onClick={handleClick}
      className={`task-confirmation ${isActiveConfirmation ? "active" : ""} `}
    >
      <p
        className={`confirm confirm-${action} ${
          isLoadingRequest ? "task-confirmation--request" : ""
        }`}
      >
        {isLoadingRequest ? "cargando" : "Click para confirmar"}
      </p>
    </div>
  );
}
export { TaskConfirmation };
