import { createContext, useEffect, useState } from "react";
import { getTasksRequest } from "../api/tasks";

export const TasksContext = createContext();
//eslint-disable-next-line
function TasksContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  /* Contine las tareas */
  const [tasks, setTasks] = useState([]);
  /* Estado auxiliar para que vuelva hacer la petición */
  useEffect(() => {
    handleRequestTasks();
  }, []);

  function handleRequestTasks() {
    setIsLoading(true);
    getTasksRequest()
      .then((res) => {
        if (res.status == 200) {
          setTasks(res.data.tasks);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, isLoading, setIsLoading, handleRequestTasks }}
    >
      {isLoading ? (
        <div className="container-loading">
          <div className="loading">Cargando..</div>
        </div>
      ) : (
        children
      )}

      {/* {children} */}
    </TasksContext.Provider>
  );
}

export { TasksContextProvider };
