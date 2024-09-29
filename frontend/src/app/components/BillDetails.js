import React from "react";

export default function BillDetails({ details }) {
  // Split the response text into individual product and price lines
  const items = details.response
    .split("\n")
    .filter((item) => item.trim() !== "");

  return (
    <div>
      <h2>Bill Details</h2>
      {items.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Product Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const [product, price] = item.split(" - "); // Split product and price
              return (
                <tr key={index}>
                  <td>{product.replace("Product: ", "")}</td>
                  <td>{price.replace("Price: ", "")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No items found in the bill</p>
      )}
    </div>
  );
}
