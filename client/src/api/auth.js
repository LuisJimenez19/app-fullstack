import axios from "./axios.js";

export const registerRequest = async (user) => {
  const res = await axios.post("/register", user);
  return res;
};
export const loginRequest = async (user) => {
  const res = await axios.post("/login", user);

  return res;
};

export const logoutRequest = async (user) => {
  const res = await axios.post("/logout", user);

  return res;
};

export const verifySessionRequest = async () => {
  const res = await axios.get("/verify-session");
  return res;
};
