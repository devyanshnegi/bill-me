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
    background-color: #4CAF50;
    color: white;
  }
`;

const UserTable = ({ users, products, onAssign, assignedItems }) => {
  const handleCheckboxChange = (product, user, checked) => {
    onAssign(product, user, checked);
  };

  return (
    <TableContainer>
      <h2>User List</h2>
      <Table>
        <thead>
          <tr>
            <th>User</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, userIndex) => (
            <tr key={userIndex}>
              <td>{user}</td>
              <td>
                {products.map((product, productIndex) => {
                  // Check if the product instance is already assigned to another user
                  const isAssigned = Object.values(assignedItems).some(items =>
                    items.some(p => p.product === product.product && p.index === productIndex)
                  );

                  return !isAssigned ? ( // Only display the product if not assigned
                    <div key={productIndex}>
                      <label>
                        <input
                          type="checkbox"
                          onChange={(e) => handleCheckboxChange({ ...product, index: productIndex }, user, e.target.checked)}
                        />
                        {product.product} - ${product.price}
                      </label>
                    </div>
                  ) : null; // Don't render anything if assigned
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
