import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

export function useTasks() {
  const tasks = useContext(TasksContext);
  return tasks;
}
