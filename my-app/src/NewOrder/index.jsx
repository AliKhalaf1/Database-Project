import React, { useState } from "react";
import NewOrder from "./Components/NewOrderPage/NewOrder";
import ConfirmOrder from "./Components/ConfirmOrderPage/ConfirmOrder";
const Order = () => {
  const [parts, setParts] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedManufacturerEmail, setSelectedManufacturerEmail] =
    useState("");
  const [page, setPage] = useState(true);
  return (
    <>
      {page ? (
        <NewOrder
          parts={parts}
          setParts={setParts}
          selectedParts={selectedParts}
          setSelectedParts={setSelectedParts}
          manufacturers={manufacturers}
          setManufacturers={setManufacturers}
          setSelectedManufacturerEmail={setSelectedManufacturerEmail}
          selectedManufacturerEmail={selectedManufacturerEmail}
          setPage={setPage}
        />
      ) : (
        <ConfirmOrder
          selectedParts={selectedParts}
          selectedManufacturerEmail={selectedManufacturerEmail}
          setPage={setPage}
        />
      )}
    </>
  );
};

export default Order;
