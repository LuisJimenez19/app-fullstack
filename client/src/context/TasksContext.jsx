import { createContext, useContext, useEffect, useState } from "react";
import { getTasksRequest } from "../api/tasks";
import toast from "react-hot-toast";
import { Auth } from "./AuthContext";

export const TasksContext = createContext();
//eslint-disable-next-line
function TasksContextProvider({ children }) {
  const auth = useContext(Auth);

  const [isLoading, setIsLoading] = useState(false);
  /* Contine las tareas */
  const [tasks, setTasks] = useState([]);
  /* Estado auxiliar para que vuelva hacer la petición */
  useEffect(() => {
    console.log("ejecutando traer tareas");
    if (!auth.isAuthenticated) return;
    handleRequestTasks();
  }, [auth.isAuthenticated]);

  // !En el primer renderizado no muestra las tareas
  async function handleRequestTasks() {
    setIsLoading(true);
    /* getTasksRequest()
      .then((res) => {
        if (res.status == 200) {
          setTasks(res.data.tasks);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
      }); */
    try {
      const res = await getTasksRequest();
      if (res.status == 200) {
        setTasks(res.data.tasks);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Ha ocurrido un error al traer las tareas");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, isLoading, setIsLoading, handleRequestTasks }}
    >
      {isLoading ? (
        <div className="container-loading auth">
          <div className="loading">Cargando tareas... </div>
        </div>
      ) : (
        children
      )}
    </TasksContext.Provider>
  );
}

export { TasksContextProvider };
