/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { BiPulse } from "react-icons/bi";
import { getRandomNumber } from "../helpers/getNumberRandom";
import { useTasks } from "../hooks/useTasks";

function DashboardSummary({ completed, total, avg }) {
  const tasks = useTasks();

  const porcentajeCompleted = (completed * 100) / total;
  const progressEnd =
    total == 0 || completed == 0 ? 0 : Math.round(porcentajeCompleted);
  const [progress, setProgress] = useState(0);

  const [openSummary, setOpenSummary] = useState(() => {
    const vl = localStorage.getItem("openSummary");

    return vl == "1" ? true : false;
  });
  //recibe el nuevo valor
  function handleOpenSummary(vl) {
    setOpenSummary(vl);
    localStorage.setItem("openSummary", `${vl ? "1" : "0"}`);
  }
  useEffect(() => {
    let progresStar = 0;
    if (localStorage.getItem("summaryProgress")) {
      progresStar = JSON.parse(localStorage.getItem("summaryProgress"));
    }
    const speed = getRandomNumber(1, 20);

    const progressInterval = setInterval(() => {
      if (progresStar > progressEnd) {
        progresStar--;
      } else {
        progresStar++;
      }
      setProgress(progresStar);

      if (progresStar === progressEnd) {
        const value = progressEnd == 0 ? 0 : progresStar;
        localStorage.setItem("summaryProgress", JSON.stringify(value));

        clearInterval(progressInterval);
      }
    }, speed);

    return () => {
      clearInterval(progressInterval);
    };
  }, [progressEnd, total, completed, tasks]);

  return (
    <div className="dashboard-summary">
      <div className="summary-head">
        <span
          onClick={() => handleOpenSummary(!openSummary)}
          className="icon icon-summary"
        >
          <BiPulse />
        </span>
        <div className={`group-summary ${openSummary ? "open" : ""}`}>
          <p>
            Tareas completadas: <span>{completed}</span>
          </p>
          <p>
            Total de tareas: <span>{total}</span>
          </p>
        </div>
      </div>
      <div className="dashboard-container-progress">
        <div
          style={{
            background: `conic-gradient(var(--primary-color) ${
              progress * 3.6
            }deg, var(--toggle-color) 0deg)`,
          }}
          className="circular-progress"
        >
          <span className="progress-value">{progress}%</span>
        </div>
      </div>
      <div className="summary-footer">
        <h3>Promedio de tiempo</h3>
        {Object.values(avg).every((value) => !value) ? (
          <p>No ha completado ninguna tarea</p>
        ) : (
          <div className={`group-summary ${openSummary ? "open" : ""}`}>
            <p>{avg.averageHours || 0} Horas</p>
            <p>{avg.averageMinutes || 0} Minutos</p>
            <p>{avg.averageSeconds || 0} Segundos</p>
          </div>
        )}
      </div>
    </div>
  );
}

export { DashboardSummary };
