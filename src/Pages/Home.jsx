import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Products from "../Components/Products";

const Home = () => {
  const [products, setProduct] = useState([]);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      const decodedJwt = parseJwt(token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        window.location = "/login";
      }
    } else {
      window.location = "/login";
    }

    async function get() {
      await fetch("https://api.lazzaroburger.uz/products", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setProduct(data.products.reverse()));
    }

    get();
  }, []);

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <Products products={products} />
      </div>
    </>
  );
};

export default Home;
