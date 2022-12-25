import axios from "axios";
import configs from "../../Global/configs";

const getAllpartsByServiceCenter = (query) =>
  axios
    .get(
      `${configs.API_BASE_URL}/parts/${localStorage.getItem(
        "service_center_id"
      )}`
    )
    .then((response) => {
      return response.data;
    });
const getAllparts = (query) =>
  axios.get(`${configs.API_BASE_URL}/parts`).then((response) => {
    return response.data;
  });
const patchPart = (part) =>
  axios
    .patch(
      `${configs.API_BASE_URL}/parts/update/${localStorage.getItem(
        "service_center_id"
      )}`,
      part
    )
    .then((response) => {
      return response;
    });
const partsServices = {
  getAllpartsByServiceCenter,
  patchPart,
  getAllparts,
};
export default partsServices;
