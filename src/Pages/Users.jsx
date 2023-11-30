import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Pagination from "../Components/Pagination";
import Sidebar from "../Components/Sidebar";

const Users = () => {
  const [users, setUsers] = useState();
  const [paginationItem, setPaginationItem] = useState(1);

  useEffect(() => {
    async function get() {
      await fetch("http://localhost:4001/users/order", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setUsers(data.users));
    }
    get();
  }, []);

  return (
    <>
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
                  <th>Дата регистрации</th>
                  <th>Имя получателя</th>
                  <th>Тел. номер</th>
                  <th>Кол-во заказов</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((p, index) =>
                  index >= 7 * (paginationItem - 1) &&
                  index < 7 * paginationItem ? (
                    <tr key={index}>
                      <td>{p.count < 10 ? `0${p.count}` : p.count}</td>
                      <td>{p.created_date}</td>
                      {console.log(p)}
                      <td>{p.username}</td>
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
                      <td>{p.orders_count}</td>
                    </tr>
                  ) : (
                    ""
                  )
                )}
              </tbody>
            </table>
            {users?.length > 7 ? (
              <Pagination
                items={users?.length}
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

export default Users;
