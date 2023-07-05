/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";

import { BsSortNumericDown, BsSortNumericDownAlt } from "react-icons/bs";
import { useTasks } from "../../hooks/useTasks";

function TaskGrid({ isPerspective }) {
  const { tasks } = useTasks();
  // const [tasksLocal, setTasksLocal] = useState([...tasks]);

  const [tasksActive, setTasksActive] = useState([]);
  const [order, setOrder] = useState(() => {
    return localStorage.getItem("orderTasks")
      ? localStorage.getItem("orderTasks")
      : "asc";
  });

  useEffect(() => {
    const tasksNotCompleted = tasks.filter((task) => task.done == 0);
    setTasksActive(tasksNotCompleted);
  }, [tasks]);

  function handleOrder(ord) {
    setOrder(ord);
    localStorage.setItem("orderTasks", ord);
  }

  return (
    <div className="container-tasks">
      {/* Filtro  */}
      {tasksActive.length > 1 && (
        <div className="tasks-order">
          <div className="order-container">
            <div className="order-icon-container">
              <BsSortNumericDown
                onClick={() => handleOrder("asc")}
                className={`order-icon ${order == "asc" ? "active" : ""}`}
              />
              <BsSortNumericDownAlt
                onClick={() => handleOrder("desc")}
                className={`order-icon ${order == "desc" ? "active" : ""}`}
              />
            </div>
            <span>Ordenar por fecha de creación</span>
          </div>
        </div>
      )}
      {/* Tareas sin completar */}
      <div className="grid-container ">
        {tasks.length === 0 || tasksActive.length === 0 ? (
          <div className="empty-group">
            <div className="empty-tasks">No hay tareas para hacer.</div>
            <div className="empty-img empty-img-doTasks"></div>
          </div>
        ) : (
          <>
            {order == "desc"
              ? tasksActive
                  .sort((a, b) => (a.id > b.id ? -1 : 1))
                  .map((task, index) => (
                    <TaskCard
                      isPerspective={isPerspective}
                      key={index}
                      task={task}
                    />
                  ))
              : tasksActive
                  .sort((a, b) => (a.id < b.id ? -1 : 1))
                  .map((task, index) => (
                    <TaskCard
                      isPerspective={isPerspective}
                      key={index}
                      task={task}
                    />
                  ))}
          </>
        )}
      </div>
    </div>
  );
}

export { TaskGrid };
