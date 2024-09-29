import React from 'react';
import styled from 'styled-components';

const UserContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const UserItem = styled.li`
  margin: 10px 0;
`;

const UserTable = ({ users, products, onAssign }) => {
  return (
    <UserContainer>
      <h2>Select User and Assign Products</h2>
      <UserList>
        {users.map((user, index) => (
          <UserItem key={index}>
            <strong>{user}</strong>
            <div>
              {products
                .filter(product => !product.user) // Show only unassigned products
                .map((product, productIndex) => (
                  <div key={productIndex}>
                    <input
                      type="checkbox"
                      id={`${user}-${product.product}`}
                      onChange={e => onAssign(e.target.checked, user, product)}
                    />
                    <label htmlFor={`${user}-${product.product}`}>
                      {product.product} - ${product.price}
                    </label>
                  </div>
                ))}
            </div>
          </UserItem>
        ))}
      </UserList>
    </UserContainer>
  );
};

export default UserTable;
