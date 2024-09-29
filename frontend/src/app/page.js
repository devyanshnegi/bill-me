"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from 'styled-components';
import BillUpload from "./components/BillUpload";
import BillDetails from "./components/BillDetails";
import ProductTable from "./components/ProductTable"; 
import UserTable from "./components/UserTable"; // Import UserTable

const Container = styled.div`
  text-align: center;
  margin-top: 50px;
  font-family: 'Arial, sans-serif';
  color: #333;
  background-color: white; /* Set background color to white */
  min-height: 100vh; /* Ensure full height coverage */
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
  background-color: #f9f9f9; /* You can change this to white if desired */
`;

export default function HomePage() {
  const [billDetails, setBillDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [userTotals, setUserTotals] = useState({});
  const [assignedItems, setAssignedItems] = useState({}); // Keep track of assigned items

  // Random user names
  const users = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

  const handleBillRecognition = (data) => {
    setBillDetails(data);
    setProducts(data);
  };

  const handleAssign = (product, user, checked) => {
    setAssignedItems(prev => {
      const updatedAssignments = { ...prev };

      // If the checkbox is checked, add the product to the user's list
      if (checked) {
        updatedAssignments[user] = updatedAssignments[user] || [];
        updatedAssignments[user].push(product);
      } else {
        // If unchecked, remove the product from the user's list based on product and index
        updatedAssignments[user] = updatedAssignments[user].filter(p => 
          !(p.product === product.product && p.index === product.index)
        );
      }
      return updatedAssignments;
    });
  };

  const calculateUserTotals = () => {
    const totals = {};
    // Calculate total for each user based on assigned items
    Object.entries(assignedItems).forEach(([user, items]) => {
      const total = items.reduce((sum, item) => {
        const price = parseFloat(item.price); // Convert price to a float
        return sum + (isNaN(price) ? 0 : price); // Add to total if valid
      }, 0);
      totals[user] = total; // Assign calculated total to user
    });
    return totals;
  };

  // Update user totals whenever assigned items change
  useEffect(() => {
    const totals = calculateUserTotals();
    setUserTotals(totals);
  }, [assignedItems]);

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

      {/* Display User Table for assigning products */}
      <UserTable users={users} products={products} onAssign={handleAssign} assignedItems={assignedItems} />

      <h2>User Totals</h2>
      <ul>
        {Object.entries(userTotals).map(([user, total]) => (
          <li key={user}>
            {user}: ${total.toFixed(2)}
          </li>
        ))}
      </ul>
    </Container>
  );
}
