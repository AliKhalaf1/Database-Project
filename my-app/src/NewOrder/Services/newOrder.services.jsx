import axios from "axios";
import configs from "../../Global/configs";

const getAllMecahnics = (query) =>
  axios.get(`${configs.API_BASE_URL}/manufacturers`).then((response) => {
    console.log(response.data);
    return response.data;
  });

const postPurchaseReceipt = (totalPrice, manufacturerEmail, selectedParts) =>
  axios
    .post(`${configs.API_BASE_URL}/purchase`, {
      email: manufacturerEmail,
      selectedParts: selectedParts,
      totalPrice: totalPrice,
      serviceCenterId: localStorage.getItem("service_center_id"),
    })
    .then((response) => {
      return response.data;
    });

const newOrderServices = {
  getAllMecahnics,
  postPurchaseReceipt,
};
export default newOrderServices;
