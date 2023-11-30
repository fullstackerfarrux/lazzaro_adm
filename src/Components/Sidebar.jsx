import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { cart } = useSelector((cart) => cart);

  return (
    <div id="sidebar" style={cart?.sidebar ? { width: 300 } : { width: 80 }}>
      {cart?.sidebar ? <p className="title">Навигация</p> : ""}
      <Link
        className="catalog"
        to={"/"}
        style={
          location.pathname == "/" ? { color: "black" } : { color: "#61646b" }
        }
      >
        <i className="fa-solid fa-bars-staggered"></i>
        {cart?.sidebar ? <h3>Каталог</h3> : ""}
      </Link>
      <Link
        className="orders"
        to={"/orders"}
        style={
          location.pathname == "/orders"
            ? { color: "black" }
            : { color: "#61646b" }
        }
      >
        <i className="fa-solid fa-clipboard-list"></i>
        {cart?.sidebar ? <h3>Заказы</h3> : ""}
      </Link>
      <Link
        className="banner"
        to={"/banner"}
        style={
          location.pathname == "/banner"
            ? { color: "black" }
            : { color: "#61646b" }
        }
      >
        <i className="fa-solid fa-tablet-screen-button"></i>
        {cart?.sidebar ? <h3>Баннер</h3> : ""}
      </Link>
      <Link
        className="banner"
        to={"/promocode"}
        style={
          location.pathname == "/promocode"
            ? { color: "black" }
            : { color: "#61646b" }
        }
      >
        <i className="fa-solid fa-percent"></i>
        {cart?.sidebar ? <h3>Промокоды</h3> : ""}
      </Link>
      <Link
        className="users"
        to={"/users"}
        style={
          location.pathname == "/users"
            ? { color: "black" }
            : { color: "#61646b" }
        }
      >
        <i className="fa-solid fa-users"></i>
        {cart?.sidebar ? <h3>Клиенты</h3> : ""}
      </Link>
      <Link
        className="admin"
        to={"/settings"}
        style={
          location.pathname == "/settings"
            ? { color: "black" }
            : { color: "#61646b" }
        }
      >
        <i className="fa-solid fa-user-gear"></i>
        {cart?.sidebar ? <h3>Админстратор</h3> : ""}
      </Link>
      <Link
        className="newsletter"
        to={"/newsletter"}
        style={
          location.pathname == "/newsletter"
            ? { color: "black" }
            : { color: "#61646b" }
        }
      >
        <i className="fa-solid fa-envelope"></i>
        {cart?.sidebar ? <h3>Рассылка</h3> : ""}
      </Link>
    </div>
  );
};

export default Sidebar;
