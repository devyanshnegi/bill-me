"use client";
import React, { useState } from "react";
import Image from "next/image";
import styled from 'styled-components';
import BillUpload from "./components/BillUpload";
import BillDetails from "./components/BillDetails";
import ProductTable from "./components/ProductTable"; 
import UserTable from "./components/UserTable"; // Import the UserTable component

const Container = styled.div`
  text-align: center;
  margin-top: 50px;
  font-family: 'Arial, sans-serif';
  color: #333;
`;

const Logo = styled(Image)`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #4CAF50; 
`;

const BillContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const initialUsers = [
  "Alice Smith",
  "Bob Johnson",
  "Charlie Brown",
  "Diana Prince",
  "Ethan Hunt"
];

export default function HomePage() {
  const [billDetails, setBillDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [users] = useState(initialUsers); // Use the initial list of users

  const handleBillRecognition = (data) => {
    setBillDetails(data);
    setProducts(data);  // Assuming the JSON structure matches
  };

  const handleAssign = (checked, user, product) => {
    if (checked) {
      // Assign the product to the user and remove it from the product list
      setProducts(prevProducts => 
        prevProducts.map(item => 
          item.product === product.product ? { ...item, user } : item
        ).filter(item => item.user === undefined) // Remove assigned items
      );
    }
  };

  return (
    <Container>
      <Logo
        src="/logo.png" // Referencing the image placed in the public folder
        alt="Bill Me Logo"
        width={300}
        height={150}
      />

      <Title>Bill Recognition App</Title>

      <BillUpload onRecognition={handleBillRecognition} />

      {billDetails && (
        <BillContainer>
          <BillDetails details={billDetails} />
        </BillContainer>
      )}

      {products.length > 0 && <ProductTable products={products} />}

      {/* Display User Table for Assigning Products */}
      <UserTable users={users} products={products} onAssign={handleAssign} />
    </Container>
  );
}
