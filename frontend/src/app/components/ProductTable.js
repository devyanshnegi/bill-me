import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #4CAF50; /* Adjust the color as needed */
    color: white;
  }
`;

const ProductTable = ({ products }) => {
  return (
    <TableContainer>
      <h2>Product List</h2>
      <Table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>${item.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
