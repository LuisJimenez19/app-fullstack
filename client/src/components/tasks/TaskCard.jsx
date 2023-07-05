/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getRandomNumber } from "../../helpers/getNumberRandom";
import { BiEditAlt, BiTrash, BiCalendarCheck } from "react-icons/bi";
import { Link } from "react-router-dom";
import { TaskConfirmation } from "./TaskConfirmation";
import { formatDate } from "../../helpers/formatDateTime";

function TaskCard({ task = {}, isPerspective }) {
  const [style, setStyle] = useState({});
  const [isActiveConfirmation, setIsActiveConfirmation] = useState(false);
  const [actionConfirmation, setActionConfirmation] = useState("");

  useEffect(() => {
    if (isPerspective)
      setStyle({
        transform: `perspective(800px) rotateY(${getRandomNumber(-15, 15)}deg)`,
      });
    else setStyle({});
  }, [isPerspective]);

  function handleConfirmation(e, act = "") {
    if (actionConfirmation == act || !isActiveConfirmation) {
      setIsActiveConfirmation(!isActiveConfirmation);
    } else {
      setIsActiveConfirmation(true);
    }

    setActionConfirmation(act);
  }

  const { date, time } = formatDate(task.created_at);
  return (
    <>
      <div className="card-task" style={style}>
        <div className="task-header">
          <div className="group">
            <h2 className="task-title">{task.name}</h2>
            <Link to={`/task/${task.id}`} className="icon icon-trash">
              {" "}
              {<BiEditAlt />}{" "}
            </Link>
          </div>
          <span className="task-date">
            {date} | {time}
          </span>
        </div>
        <p className="task-description">{task.description}</p>
        <div className="task-footer">
          <div className="task-container-action">
            <span
              onClick={(e) => handleConfirmation(e, "done")}
              id="done"
              className="icon icon-done"
            >
              {<BiCalendarCheck />}
            </span>
            <span
              onClick={(e) => handleConfirmation(e, "delete")}
              id="delete"
              className="icon icon-delete"
            >
              {<BiTrash />}
            </span>
          </div>
          {/* <div className="task-confirmation">deslice para confrimar -</div> */}
          <TaskConfirmation
            id={task.id}
            isActiveConfirmation={isActiveConfirmation}
            action={actionConfirmation}
            setIsActiveConfirmation={setIsActiveConfirmation}
          />
        </div>
      </div>
    </>
  );
}

export { TaskCard };
