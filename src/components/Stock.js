import React from "react";

const Stock = ({ stock, purchaseStock, sellStock }) => (
  <div>
    <div className="card">
      <div
        className="card-body"
        onClick={() =>
          purchaseStock ? purchaseStock(stock) : sellStock(stock)
        }
      >
        <h5 className="card-title">{stock.name}</h5>
        <p className="card-text">{stock.price}</p>
      </div>
    </div>
  </div>
);

export default Stock;
