import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Pagination from "../Components/Pagination";
import Sidebar from "../Components/Sidebar";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [paginationItem, setPaginationItem] = useState(1);
  const [modal, setModal] = useState("");
  const [modalProduct, setModalProduct] = useState([]);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let reversedOrders = [];

  useEffect(() => {
    async function get() {
      await fetch("http://localhost:4001/orders", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setOrders(data.orders));
    }

    get();
  }, []);

  for (let i = 0; i < orders.length; i++) {
    let products = [];
    for (let p = 0; p < orders[i].products.length; p++) {
      let productToJson = JSON.parse(orders[i].products[p]);
      products.push(productToJson);
    }

    let res = {
      id: orders[i].order_id,
      created_date: new Date(Date.parse(orders[i].created_at)),
      username: orders[i].username,
      phone_number: orders[i].phone_number,
      products: products,
      total: orders[i].total,
      payment_type: orders[i].payment_type,
      payment_status: orders[i].payment_status,
      count: orders[i].count,
      location: orders[i].location,
    };

    if (orders[i].payment_status !== false) {
      reversedOrders.unshift(res);
    }
  }

  return (
    <>
      {modal !== "" ? (
        <div className="order_products">
          <div className="products_box">
            <div>
              <h1>Товары</h1>
            </div>
            <div className="table">
              <table>
                <thead className="thead">
                  <tr>
                    <th>№</th>
                    <th>Имя товара</th>
                    <th>Вид</th>
                    <th>Цена</th>
                    <th>Шт</th>
                  </tr>
                </thead>
                <tbody>
                  {modalProduct?.map((p, index) => (
                    <tr key={index}>
                      <td>{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
                      <td>{p.product_name}</td>
                      <td>{p.filling !== undefined ? `(${p.filling})` : ""}</td>
                      <td>{p.price}</td>
                      <td>{p.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="create_btn">
              <button onClick={() => setModal("")} className="no">
                Назад
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <Header text={""} />
      <div className="flex">
        <Sidebar />
        <div id="orders">
          <div className="box">
            <h1>Заказы</h1>
            <table>
              <thead className="thead">
                <tr>
                  <th>№</th>
                  <th>Дата создания</th>
                  <th>Имя получателя</th>
                  <th>Адрес</th>
                  <th>Тел. номер</th>
                  <th>Товары</th>
                  <th>Цена</th>
                  <th>Оплата</th>
                </tr>
              </thead>
              <tbody>
                {reversedOrders?.map((p, index) =>
                  index >= 7 * (paginationItem - 1) &&
                  index < 7 * paginationItem ? (
                    <tr key={index}>
                      <td>{p.count < 10 ? `0${p.count}` : p.count}</td>
                      <td style={{ fontSize: 14 }}>
                        {`${
                          p.created_date.getDate() > 9
                            ? p.created_date.getDate()
                            : `0${p.created_date.getDate()}`
                        }.${
                          p.created_date.getMonth() > 9
                            ? p.created_date.getMonth() + 1
                            : `0${p.created_date.getMonth() + 1}`
                        }.${p.created_date.getFullYear()}, ${
                          p.created_date.getHours() <= 9
                            ? `0${p.created_date.getHours()}`
                            : p.created_date.getHours()
                        }:${
                          p.created_date.getMinutes() <= 9
                            ? `0${p.created_date.getMinutes()}`
                            : p.created_date.getMinutes()
                        }`}
                      </td>
                      <td>{p.username}</td>
                      <td style={{ fontSize: 15 }}>{p.location}</td>
                      <td>
                        <a
                          style={{ color: "green" }}
                          href={`tel:+${
                            p.phone_number[0] !== "+"
                              ? `+${p.phone_number}`
                              : p.phone_number
                          }`}
                        >
                          {p.phone_number[0] !== "+"
                            ? `+${p.phone_number}`
                            : p.phone_number}
                        </a>
                      </td>
                      <td
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => {
                          setModal(p.id), setModalProduct(p.products);
                        }}
                      >
                        Посмотреть...
                      </td>
                      <td>{p.total}</td>
                      <td>{p.payment_type}</td>
                    </tr>
                  ) : (
                    ""
                  )
                )}
              </tbody>
            </table>
            {orders?.length > 7 ? (
              <Pagination
                items={orders?.length}
                setPaginationLimit={setPaginationItem}
                paginationLimit={paginationItem}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
