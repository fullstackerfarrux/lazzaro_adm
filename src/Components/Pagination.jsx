import React, { useState } from "react";

const Pagination = ({ items, setPaginationLimit, paginationLimit }) => {
  let maxItem = Math.ceil(items / 7);
  let count = [];

  for (let i = 0; i < maxItem; i++) {
    count.push(1 * (i + 1));
  }

  return (
    <>
      <div id="pagination">
        {paginationLimit > 1 ? (
          <main
            className="back"
            onClick={() => setPaginationLimit(paginationLimit - 1)}
          >
            <i className="fa-solid fa-angle-left"></i>
          </main>
        ) : (
          <main className="unactive">
            <i className="fa-solid fa-angle-left"></i>
          </main>
        )}

        <div className="numbers">
          {count?.map((count, index) => (
            <main
              className={+paginationLimit == index + 1 ? "active" : "number"}
              key={index}
              style={
                paginationLimit > 4
                  ? {
                      transform: ` translateX(-${
                        paginationLimit * 50 - 200
                      }px)`,
                      transition: "transform 0.4s",
                      cursor: "pointer",
                    }
                  : {}
              }
              onClick={() => setPaginationLimit(count)}
            >
              {count}
            </main>
          ))}
        </div>
        {paginationLimit == maxItem ? (
          <main className="unactive">
            <i className="fa-solid fa-chevron-right"></i>
          </main>
        ) : (
          <main
            className="next"
            onClick={() => setPaginationLimit(paginationLimit + 1)}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </main>
        )}
      </div>
    </>
  );
};

export default Pagination;
