import axios from "axios";
import { BASE_URL } from "../../dummydata";

const login = async (userData) => {
  const res = await axios.post(`${BASE_URL}/user/login`, userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

//logout
const logout = async () => {
  await axios.post(`${BASE_URL}/user/logout`);

  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
