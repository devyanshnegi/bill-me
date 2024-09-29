import React from "react";

const BillDetails = ({ details }) => {
  // Calculate the total amount
  const calculateTotal = () => {
    // Assuming details is an array of items
    return details.reduce((total, item) => {
      const price = parseFloat(item.price); // Convert price to a float
      return total + (isNaN(price) ? 0 : price); // Add to total if valid
    }, 0);
  };

  const totalAmount = calculateTotal(); // Calculate total amount

  return (
    <div>
      <h2>Bill Details</h2>
      <p>
        <strong>Total Amount:</strong> ${totalAmount.toFixed(2)} {/* Display total */}
      </p>
    </div>
  );
};

export default BillDetails;
