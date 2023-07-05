import { useState } from "react";
/* Api */
// import { getTasksRequest } from "../../api/tasks";
/* Layout */
import { LayoutDefault } from "./layout/LayoutDefault";

import "../css/tasks-page.css";

import { BiAddToQueue, BiWindowClose } from "react-icons/bi";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";

import { TaskForm } from "../components/tasks/TaskForm";
import { TaskGrid } from "../components/tasks/TaskGrid";

function TasksPage() {
  /* Estado para añadir otra task */
  const [isAddTask, setIsAddTask] = useState(false);

  /* Mostrar las tarjetas con perspective */
  const [isPerspective, setIsPerspective] = useState(() => {
    return localStorage.getItem("isPerspective") == "true";
  });

  function handlePerspective(state) {
    localStorage.setItem("isPerspective", state.toString());
    setIsPerspective(state);
  }

  return (
    <LayoutDefault>
      <section className="container-tasks-page">
        <header className="taskpage-task-header">
          <button
            onClick={() => {
              setIsAddTask(!isAddTask);
            }}
            className="btn-action "
            role="button"
            aria-label="Abrir formulario"
            aria-labelledby="Abrir formulario"
          >
            {isAddTask ? <BiWindowClose /> : <BiAddToQueue />}{" "}
          </button>
          <button
            onClick={() => {
              handlePerspective(!isPerspective);
            }}
            className="btn-action"
            role="button"
            aria-label="Activar o desactivar personalización"
            aria-labelledby="Activar o desactivar personalización"
          >
            {isPerspective ? "off" : "on"}
            {isPerspective ? <BsToggle2Off /> : <BsToggle2On />}
          </button>
        </header>
        <TaskForm isAddTask={isAddTask} setIsAddTask={setIsAddTask} />

        <TaskGrid isPerspective={isPerspective} />
      </section>
    </LayoutDefault>
  );
}

export { TasksPage };
