import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Mechanic from "./Mechanic/Mechanic";
import Manufacturer from "./Manufcturer/Manufacturer";
import Parts from "./Parts/Parts";
import Order from "./NewOrder";
import Stock from "./Stock/Stock";
import Statistics from "./Statistics/Statistics";
import Navb from "./Nav/Nav";
function App() {
  return (
    <>
      <Navb />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/mechanic" element={<Mechanic />} />
        <Route path="/manufacturer" element={<Manufacturer />} />
        <Route path="/neworder" element={<Order />} />
        <Route path="/parts" element={<Parts />} />
        <Route path="/statistcs" element={<Statistics />} />
        <Route path="/stock" element={<Stock />} />
      </Routes>
    </>
  );
}

export default App;
