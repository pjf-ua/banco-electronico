import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      accounts: [
        { id: 1, type: 'Checking', balance: 1000 },
        { id: 2, type: 'Savings', balance: 5000 },
      ],
    },
    {
      id: 2,
      name: 'Jane Doe',
      accounts: [
        { id: 3, type: 'Checking', balance: 2000 },
        { id: 4, type: 'Savings', balance: 3000 },
      ],
    },
  ]);

  const createAccount = (userId, type) => {
    const newAccount = { id: Date.now(), type, balance: 0 };
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            accounts: [...user.accounts, newAccount],
          };
        }
        return user;
      });
    });
  };

  const value = {
    users,
    createAccount,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
