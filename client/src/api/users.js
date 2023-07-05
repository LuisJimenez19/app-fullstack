import axios from "./axios";

export const getUsersRequest = async () => {
  const res = await axios.get("/users");

  return res;
};

export const deleteUserRequest = async (id) => {
  const res = await axios.delete(`/user/${id}`);
  console.log(res);
  return res;
};
export const avatarUserRequest = async () => {
  const res = await axios.get("/gravatar");
  return res;
};

export const updateUserRequest = async (id, data) => {
  const res = await axios.patch(`user/${id}`, data);
  return res;
};
