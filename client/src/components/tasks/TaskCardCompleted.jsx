/* eslint-disable react/prop-types */

import { BiTrash } from "react-icons/bi";
import { deleteTaskRequest, getTasksRequest } from "../../api/tasks";
import { toast } from "react-hot-toast";
import { useTasks } from "../../hooks/useTasks";
import {
  calculateTimeDifference,
  formatDate,
} from "../../helpers/formatDateTime";

function TaskCardCompleted({ task }) {
  const { setTasks } = useTasks();

  const dateCreated = formatDate(task.created_at);
  const dateCompleted = formatDate(task.completed_at);
  const { hours, minutes, seconds } = calculateTimeDifference(
    dateCreated,
    dateCompleted
  );

  async function handleDelete() {
    const { id } = task;
    const res = await deleteTaskRequest(id);
    if (res.status == 200) {
      toast.success(res.data.message);
      const result = await getTasksRequest();
      setTasks(result.data.tasks);
    }
  }
  return (
    <div className="completed-task-card">
      <div className="completed-head-card">
        <p className="completed-title">{task.name}</p>
        <span className="completed-date">
          {dateCreated.date} | {dateCreated.time}
        </span>
      </div>
      <div className="completed-summary">
        <span className="completed-time">{`${hours}H-${minutes}M-${seconds}S`}</span>
        <span onClick={handleDelete} className="icon icon-delete">
          {<BiTrash />}
        </span>
      </div>
    </div>
  );
}

export { TaskCardCompleted };
