import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";

import { getUsersRequest } from "../api/users";

import { LayoutDefault } from "./layout/LayoutDefault";
import { TaskCardCompleted } from "../components/tasks/TaskCardCompleted";
import { DashboardSummary } from "../components/DashboardSummary";
import { UserCard } from "../components/UserCard";
import { QuoteAnime } from "../components/QuoteAnime";

import { calculateAverageTime } from "../helpers/formatDateTime";
import "../css/dashboard-page.css";

function DashboardPage() {
  const auth = useAuth();
  const { tasks } = useTasks();
  const [isLoading, setIsLoading] = useState(true);
  const [tasksCompleted, setTasksCompleted] = useState([]);

  const [users, setUsers] = useState([]);

  const [usersActives, setUsersActives] = useState([]);

  /* Las tareas */
  useEffect(() => {
    
    const tasksNotCompleted = tasks.filter((task) => task.done == 1);
    setTasksCompleted(tasksNotCompleted);
    setIsLoading(false);
  }, [tasks]);
  
  /* Autenticado */
  useEffect(() => {
    if (auth.user) {
      setIsLoading(false);
    }
  }, [auth.user]);
  // Usuarios
  useEffect(() => {
    getUsersRequest().then((res) => {
      if (res.status === 200) {
        const uA = res.data.users.filter(
          (user) => user.completed_tasks_count != 0
        );
        setUsersActives(uA);
        setUsers(res.data.users);

        setIsLoading(false);
      }
    });
  }, [tasks]);

  /* Porcentaje de tareas */
  const total = tasks.length;
  const completed = tasksCompleted.length;
  const avg = calculateAverageTime(tasksCompleted);

  return (
    <LayoutDefault>
      <section className="dashboard-page">
        <section className="dashboard-hero">
          <h2 className="dashboard-title">Welcome {auth.user.name}</h2>
          <div className="dashboard-header">
            <h1 className="title-dashboard">Dashboard</h1>
            <QuoteAnime />
          </div>
          {/* Summary */}
          <article
            className={`dashboard-container-analitycs ${
              tasks.length === 0 || tasksCompleted.length === 0
                ? "dashboard-container-analitycs--empty"
                : ""
            }`}
          >
            <DashboardSummary avg={avg} total={total} completed={completed} />
            {isLoading ? (
              <div className="container-loading">
                <div className="loading">Cargando..</div>
              </div>
            ) : tasks.length === 0 || tasksCompleted.length === 0 ? (
              <div className="empty-tasks">
                No has completado ninguna tarea.
                <div className="empty-img"></div>
              </div>
            ) : (
              <>
                {tasksCompleted.map((task, index) => (
                  <TaskCardCompleted key={index} task={task} />
                ))}
              </>
            )}
          </article>
        </section>

        {/* Van los usuarios */}
        <h1 className="title-dashboard">
          {users.length == 1 && usersActives.length == 0
            ? "Eres el único usuario hasta el momento."
            : usersActives.length == 0
            ? "No hay usuarios activos"
            : "Usarios Activos"}
        </h1>
        {usersActives.length == 0 ? (
          <div className="empty-tasks">
            {/* <p>No hay usuarios activos</p> */}
            <div className="empty-img empty-users"></div>
          </div>
        ) : (
          <section className="dashboard-container-users">
            <div className="users-conatainer">
              {users
                .sort((a, b) => {
                  return a.completed_tasks_count > b.completed_tasks_count
                    ? -1
                    : 1;
                })
                .filter((user) => user.completed_tasks_count != 0)
                .map((user) => {
                  return <UserCard key={user.id} user={user} />;
                })}
            </div>
          </section>
        )}
      </section>
    </LayoutDefault>
  );
}

export { DashboardPage };
