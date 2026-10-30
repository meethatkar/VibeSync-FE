import api from "../../../utils/apiClient";

export const registerUser = async (username, email, password) => {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });
  console.log("RES: ", response);
  return response;
};

export const loginUser = async (userInfo, password) => {
  const response = await api.post("/auth/login", { userInfo, password });
  console.log("RES: LOGIN: ", response);
  return response;
};
