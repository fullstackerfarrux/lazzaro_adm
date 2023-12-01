import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Products = ({ products }) => {
  const [dropdown, setDropdown] = useState("");
  const [deleteDropdown, setDeletedropDown] = useState("");
  const [changeActivty, setChangeActivty] = useState("");
  const { cart } = useSelector((cart) => cart);

  const deleteProduct = async (id) => {
    await fetch("https://api.lazzaroburger.uz/product/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        data.msg == "Deleted!"
          ? (toast.success("Deleted!"),
            setTimeout(() => {
              window.location = "/";
            }, 1500))
          : toast.error("Invalid token!")
      );
  };

  const changeStatus = async (id) => {
    await fetch("https://api.lazzaroburger.uz/product/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        data.msg == "Changed!"
          ? (toast.success("Changed!"),
            setTimeout(() => {
              window.location = "/";
            }, 500))
          : toast.error("Invalid token!")
      );
  };

  return (
    <>
      <div
        className="deleteproduct"
        style={
          deleteDropdown !== "" ? { display: "flex" } : { display: "none" }
        }
      >
        <div className="options">
          <h2>Вы точно хотите удалить этот товар?</h2>
          <div className="buttons">
            <button
              style={{ backgroundColor: "silver" }}
              onClick={() => {
                setDeletedropDown("");
              }}
            >
              Отменить
            </button>
            <button
              style={{ backgroundColor: "red" }}
              onClick={() => {
                deleteProduct(deleteDropdown);
              }}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>

      <div
        className="changeproduct"
        style={changeActivty !== "" ? { display: "flex" } : { display: "none" }}
      >
        <div className="options">
          {products.find((p, index) => p.product_id == changeActivty)
            ?.is_active ? (
            <h3>Вы точно хотите остановить продажу этого товара?</h3>
          ) : (
            <h3>Вы точно хотите продлить продажу этого товара?</h3>
          )}

          <div className="buttons">
            <button
              style={{ backgroundColor: "silver" }}
              onClick={() => {
                setChangeActivty("");
              }}
            >
              Нет
            </button>
            <button
              style={{ backgroundColor: "#66BB69" }}
              onClick={() => {
                changeStatus(changeActivty);
              }}
            >
              Да
            </button>
          </div>
        </div>
      </div>

      <div
        style={
          deleteDropdown !== "" ? { height: "90vh", overflow: "hidden" } : {}
        }
      >
        <div
          id="products"
          className="container"
          style={cart?.sidebar ? { width: "80vw" } : { width: "88vw" }}
        >
          {products?.map((p, index) => (
            <div className="product" key={index}>
              <span
                className="product-settings"
                onClick={() => {
                  if (dropdown !== "" && dropdown == p.product_id) {
                    setDropdown("");
                  } else {
                    setDropdown(p.product_id);
                  }
                }}
              >
                <BsThreeDots color="grey"></BsThreeDots>
              </span>
              <div
                className="dropdown"
                style={
                  dropdown == p.product_id
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <Link
                  to={`/edit-product/${p.product_id}`}
                  className="dropdowntext1"
                >
                  Редак..
                </Link>
                <Link
                  onClick={() => {
                    setChangeActivty(p.product_id);
                  }}
                  className="dropdowntext1"
                >
                  {p?.is_active ? "Остановить" : "Активировать"}
                </Link>
                <Link
                  onClick={() => {
                    setDeletedropDown(p.product_id);
                    setDropdown("");
                  }}
                  className="dropdowntext2"
                >
                  Удалить
                </Link>
              </div>
              <img src={p.images[0]} alt="umami" width={250} height={200} />
              <div className="title">
                <h2>{p.title}</h2>
                <p>{p.category_name}</p>
                <div className="flex">
                  <p>Cтатус:</p>
                  {p.is_active == true ? (
                    <p className="active">Продаже</p>
                  ) : (
                    <p className="active" style={{ color: "red" }}>
                      Не продаже
                    </p>
                  )}
                </div>
              </div>
              <div className="price">
                <p>{p.price.toLocaleString()} сум</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
