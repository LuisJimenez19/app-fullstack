import axios from "./axios.js";

export const createTaskRequest = async (task) => {
  const res = await axios.post("/task", task);
  return res;
};

export const getTasksRequest = async () => {
  const res = await axios.get("/tasks");
  return res;
};

export const getTaskRequest = async (id) => {
  const res = await axios.get(`/task/${id}`);
  return res;
};

export const updateTaskRequest = async (id, data) => {
  const res = await axios.patch(`task/${id}`, data);
  return res;
};

export const completedTaskRequest = async (id) => {
  const res = axios.post(`task(${id})`);
  return res;
};
export const deleteTaskRequest = async (id) => {
  const res = axios.delete(`task/${id}`);
  return res;
};
