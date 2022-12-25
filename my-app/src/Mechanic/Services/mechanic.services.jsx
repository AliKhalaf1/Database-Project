import axios from "axios";
import configs from "../../Global/configs";

const getAllMecahnics = (query) =>
  axios.get(`${configs.API_BASE_URL}/mechanics`).then((response) => {
    return response.data;
  });
const getAllMecahnicsByServiceCenter = () =>
  axios
    .get(
      `${configs.API_BASE_URL}/mechanics/${localStorage.getItem(
        "service_center_id"
      )}`
    )
    .then((response) => {
      return response.data;
    });
const deleteMechanic = (ssn) =>
  axios
    .delete(`${configs.API_BASE_URL}/mechanics/remove/${ssn}`)
    .then((response) => {
      return response;
    });
const getServiceCenterById = () =>
  axios
    .get(
      `${configs.API_BASE_URL}/center/${localStorage.getItem(
        "service_center_id"
      )}`
    )
    .then((response) => {
      return response.data;
    });
const postMechanic = (mechanic) =>
  axios
    .post(`${configs.API_BASE_URL}/mechanics/add`, mechanic)
    .then((response) => {
      return response.data;
    });
const patchMechanic = (mechanic) =>
  axios
    .patch(`${configs.API_BASE_URL}/mechanics/update`, mechanic)
    .then((response) => {
      return response.data;
    });

const mechanicServices = {
  getAllMecahnics,
  getAllMecahnicsByServiceCenter,
  deleteMechanic,
  getServiceCenterById,
  postMechanic,
  patchMechanic,
};
export default mechanicServices;
