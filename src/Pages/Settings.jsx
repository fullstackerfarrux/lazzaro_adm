import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { toast } from "react-toastify";

const Settings = () => {
  const [changePassword, setChangePassword] = useState();
  const [delivery, setDelivery] = useState();

  useEffect(() => {
    async function get() {
      await fetch("https://api.lazzaroburger.uz/delivery", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setDelivery(data.msg));
    }

    get();
  }, []);

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    let { oldpassword, newpassword } = e.target;

    await fetch("https://api.lazzaroburger.uz/chnage/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oldpassword: oldpassword.value,
        newpassword: newpassword.value,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        data.msg == "Updated!"
          ? (toast.success("Updated!"),
            setTimeout(() => {
              window.location = "/settings";
            }, 1500))
          : toast.error("Error password!")
      );
  };

  const handleSubmitDelivery = async (e) => {
    e.preventDefault();
    let { newprice } = e.target;

    await fetch("https://api.lazzaroburger.uz/chnage/delivery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        delivery_price: newprice.value,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        data.msg == "Updated!"
          ? (toast.success("Updated!"),
            setTimeout(() => {
              window.location = "/settings";
            }, 1500))
          : toast.error("Error!")
      );
  };

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div id="settings">
          <div className="changepassword">
            <h2>Изменить пароль</h2>
            <form onSubmit={(e) => handleSubmitPassword(e)}>
              <label htmlFor="oldpassword">Текущий пароль</label>
              <input type="password" id="oldpassword" />
              <label htmlFor="newpassword">Новый пароль</label>
              <input type="password" id="newpassword" />
              <button type="submit">Отправить</button>
            </form>
          </div>
          <div className="changedelivery">
            <h2>Изменить цену доставки</h2>
            <form onSubmit={(e) => handleSubmitDelivery(e)}>
              <label htmlFor="oldprice">Текущий цена</label>
              <input
                type="oldprice"
                id="oldprice"
                placeholder={delivery?.delivery_price}
                disabled
              />
              <label htmlFor="newprice">Новый цена</label>
              <input type="number" id="newprice" />
              <button type="submit">Отправить</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
