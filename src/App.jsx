import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import CreateProduct from "./Pages/CreateProduct";
import EditProduct from "./Pages/EditProduct";
import Users from "./Pages/Users";
import Banner from "./Pages/Banner";
import Promocode from "./Pages/Promocode";
import Newsletter from "./Pages/Newsletter";
import Settings from "./Pages/Settings";
import Orders from "./Pages/Orders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/users" element={<Users />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/promocode" element={<Promocode />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </>
  );
}

export default App;
