import axios from "axios";
import configs from "../../Global/configs";

const getAllManufacturers = (query) =>
  axios.get(`${configs.API_BASE_URL}/manufacturers`).then((response) => {
    return response.data;
  });

const deleteManufacturer = (manufacturer) =>
  axios
    .delete(
      `${configs.API_BASE_URL}/manufacturers/remove/${manufacturer.email}`
    )
    .then((response) => {
      return response;
    });
const postManufacturer = (Manufacturer) =>
  axios
    .post(`${configs.API_BASE_URL}/manufacturers/add`, Manufacturer)
    .then((response) => {
      return response.data;
    });
const patchManufacturer = (Manufacturer) =>
  axios
    .patch(`${configs.API_BASE_URL}/manufacturers/update`, Manufacturer)
    .then((response) => {
      return response.data;
    });

const manufacturerServices = {
  getAllManufacturers,
  deleteManufacturer,
  postManufacturer,
  patchManufacturer,
};
export default manufacturerServices;
