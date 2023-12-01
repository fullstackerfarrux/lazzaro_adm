import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Pagination from "../Components/Pagination";
import { toast } from "react-toastify";
import Sidebar from "../Components/Sidebar";

const Promocode = () => {
  const [promocodes, setPromocodes] = useState();
  const [paginationItem, setPaginationItem] = useState(1);
  const [deletePromo, setDeletePromo] = useState("");
  const [deleteText, setDeleteText] = useState("");

  useEffect(() => {
    fetch("https://api.lazzaroburger.uz/promo/get", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setPromocodes(data.data.reverse()));
  }, []);

  const handleDelete = () => {
    fetch("https://api.lazzaroburger.uz/promo/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: deletePromo,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        data.msg == "Updated!"
          ? (toast.success("Updated!"),
            setTimeout(() => {
              window.location = "/promocode";
            }, 1500))
          : toast.error("Invalid token!")
      );
  };

  return (
    <>
      {deletePromo !== "" ? (
        <div className="deletePromo">
          <div className="deletePromo_box">
            <div>
              <h2>Остановить промокод ( {deleteText} )</h2>
            </div>
            <div className="buttons">
              <button className="no" onClick={() => setDeletePromo("")}>
                Назад
              </button>
              <button
                type="submit"
                className="save"
                onClick={() => handleDelete()}
              >
                Остановить
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
        <div id="promocode">
          <div className="box">
            <h1>Промокоды на скидку</h1>
            <table>
              <thead className="thead">
                <tr>
                  <th>№</th>
                  <th>Текст</th>
                  <th>Дата создания</th>
                  <th>Скидка</th>
                  <th>Использовано</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {promocodes?.map((p, index) =>
                  index >= 7 * (paginationItem - 1) &&
                  index < 7 * paginationItem ? (
                    <tr
                      key={index}
                      onClick={() => {
                        setDeletePromo(p.id), setDeleteText(p.title);
                      }}
                    >
                      <td>{index + 1}</td>
                      <td>{p.title}</td>
                      <td>{p.created_at}</td>
                      <td>
                        {p.sale +
                          `%  (от ${p.initial_amount.toLocaleString()})`}
                      </td>
                      {console.log(p)}
                      <td>{`${p.used_count}/${p.usage_limit}`}</td>
                      <td>{p.is_active ? "Активный" : "Завершенный"}</td>
                    </tr>
                  ) : (
                    {}
                  )
                )}
              </tbody>
            </table>

            {promocodes?.length > 7 ? (
              <Pagination
                items={promocodes?.length}
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

export default Promocode;
