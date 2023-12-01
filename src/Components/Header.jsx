import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { changeSidebar } from "../rt/slices/cart";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [promocode, setPromocode] = useState(false);
  const [sidebar, setSidebar] = useState(true);
  const { cart } = useSelector((cart) => cart);

  const handleSubmit = (e) => {
    e.preventDefault();
    let { promo_name, percent, initial_amount, limit } = e.target;

    fetch("https://api.lazzaroburger.uz/promo/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        promo_name: promo_name.value,
        percent: percent.value,
        initial_amount: initial_amount.value,
        limit: limit.value,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        data.msg == "Created!"
          ? (toast.success("Created!"),
            setTimeout(() => {
              window.location = "/promocode";
            }, 1500))
          : toast.error("Invalid token!")
      );
  };

  return (
    <>
      {promocode ? (
        <div className="addPromoCode">
          <div className="addPromoCode_box">
            <div>
              <h2>Создание промокода</h2>
            </div>
            <hr />
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="title">
                <label htmlFor="title">Основные</label>
                <input
                  type="text"
                  id="promo_name"
                  required
                  placeholder="Код промокода"
                />
              </div>
              <div className="sale">
                <p>Условия</p>
                <p className="sale-description">
                  Размер скидки - в процентах 15 = 15%
                </p>
                <div className="flex">
                  <input
                    type="number"
                    className="percent"
                    id="percent"
                    required
                    placeholder="Размер скидки"
                  />
                  <input
                    type="number"
                    className="fromSum"
                    id="initial_amount"
                    required
                    placeholder="От какой суммы"
                  />
                </div>
                <div className="title">
                  <input
                    type="number"
                    id="limit"
                    required
                    placeholder="Кол-во применений"
                  />
                </div>
              </div>
              <div className="buttons">
                <button className="no" onClick={() => setPromocode(false)}>
                  Назад
                </button>
                <button type="submit" className="save">
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}

      <header id="main-header">
        <div className="container">
          <div className="header-bar">
            <main className="bars">
              <h1 style={{ color: "#860909" }}>
                {!cart.sidebar ? "Lazzaro" : "Lazzaro Burger"}
              </h1>
              <i
                className="fa-solid fa-bars"
                onClick={() => {
                  setSidebar(!sidebar);
                  dispatch(changeSidebar(!sidebar));
                }}
              ></i>
            </main>

            <div className="menu">
              <ul>
                {location.pathname == "/promocode" ? (
                  <li className="promocode" onClick={() => setPromocode(true)}>
                    <Link>Создать промокод</Link>
                  </li>
                ) : location.pathname == "/" ? (
                  <li>
                    <Link to={"/create-product"}>Создать товар</Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
