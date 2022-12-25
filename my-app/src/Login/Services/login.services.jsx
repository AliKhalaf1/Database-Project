import axios from "axios";
import configs from "../../Global/configs";

// // user should only be email and password
const login = (user) => {
  console.log(user);
  return axios.post(`${configs.API_BASE_URL}/user`, user).then((response) => {
    if (response.data) {
      localStorage.setItem("ssn", response.data.ssn);
      localStorage.setItem(
        "service_center_id",
        response.data.service_center_id
      );
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("ssn");
  localStorage.removeItem("service_center_id");
};

const loginServices = {
  login,
  logout,
};
export default loginServices;
