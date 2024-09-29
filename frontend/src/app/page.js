"use client";
import React, { useState } from "react";
import BillUpload from "./components/BillUpload";
import BillDetails from "./components/BillDetails";

export default function HomePage() {
  const [billDetails, setBillDetails] = useState(null); // Start wi th null

  const handleBillRecognition = (data) => {
    // Log the data received from BillUpload to verify structure
    console.log("Data received in HomePage:", data);
    setBillDetails(data); // Set the entire response object (with items array)
  };

  return (
    <div>
      <h1>Bill Recognition App</h1>
      <BillUpload onRecognition={handleBillRecognition} />
      {billDetails ? (
        <BillDetails details={billDetails} />
      ) : (
        <p>No details available</p>
      )}
    </div>
  );
}
