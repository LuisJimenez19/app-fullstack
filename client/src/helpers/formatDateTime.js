import moment from "moment";

export function formatDate(d) {
  const createdDate = new Date(d);
  const formatDate = createdDate
    .toLocaleDateString()
    .slice(0, 19)
    .replace("T", " ");
  const formatTime = createdDate
    .toLocaleTimeString()
    .slice(0, 19)
    .replace("T", " ");

  const date = {
    date: formatDate,
    time: formatTime,
  };

  return date;
}

/* 
*@params Object start
¨@params Object end 
*@return Object
*/
export function calculateTimeDifference(startTime, endTime) {
  const startDateTime = moment(
    `${startTime.date} ${startTime.time}`,
    "DD/MM/YYYY h:mm:ss a"
  );
  const endDateTime = moment(
    `${endTime.date} ${endTime.time}`,
    "DD/MM/YYYY h:mm:ss a"
  );

  const duration = moment.duration(endDateTime.diff(startDateTime));

  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return {
    hours,
    minutes,
    seconds,
  };
}

/*
 *
 *Calcula el promedio de tiempo en que realiza las tareas
 *@params Array de Objects
 */

export function calculateAverageTime(tasks) {
  let totalHours = 0;
  let totalMinutes = 0;
  let totalSeconds = 0;
  const totalTasks = tasks.length;

  tasks.forEach((task) => {
    const dateCreated = formatDate(task.created_at);
    const dateCompleted = formatDate(task.completed_at);
    const timeDifference = calculateTimeDifference(dateCreated, dateCompleted);

    totalHours += timeDifference.hours;
    totalMinutes += timeDifference.minutes;
    totalSeconds += timeDifference.seconds;
  });

  const averageHours = Math.floor(totalHours / totalTasks);
  const averageMinutes = Math.floor(totalMinutes / totalTasks);
  const averageSeconds = Math.floor(totalSeconds / totalTasks);

  return {
    averageHours,
    averageMinutes,
    averageSeconds,
  };
}
