import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    return savedUser || null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(user.username, JSON.stringify(user));
      localStorage.setItem('user', JSON.stringify(user)); // Mantener al usuario actual logueado
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (username, password, navigate) => {
    // Aquí se valida el usuario y contraseña.
    if (username === 'usuario' && password === 'contraseña') {
      const savedUser = JSON.parse(localStorage.getItem(username));
      const loggedInUser = savedUser || { username, accounts: [] }; // Cargar cuentas guardadas o inicializar
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      navigate('/dashboard');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };
  

  const logout = (navigate) => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };


  const createAccount = () => {
  if (user) {
    const newAccountInfo = {
      accountNumber: generateAccountNumber(),
      holderName: user.username,
      expirationDate: generateExpirationDate(),
      securityNumber: generateSecurityNumber(),
      balance: 0,
    };
    const updatedUser = {
      ...user,
      accounts: [...user.accounts, newAccountInfo],
    };
    setUser(updatedUser);
    localStorage.setItem(user.username, JSON.stringify(updatedUser));
  }
};

  
  

  const generateAccountNumber = () => {
    let accountNumber = '';
    for (let i = 0; i < 16; i++) {
      accountNumber += Math.floor(Math.random() * 10);
    }
    return accountNumber;
  };

  const generateExpirationDate = () => {
    const currentDate = new Date();
    const expirationDate = new Date(
      currentDate.getFullYear() + 5, // Añadimos 5 años
      currentDate.getMonth(), // Mes actual
      currentDate.getDate() // Día actual
    );
    return expirationDate;
  };

  const generateSecurityNumber = () => {
    let securityNumber = '';
    for (let i = 0; i < 3; i++) {
      securityNumber += Math.floor(Math.random() * 10);
    }
    return securityNumber;
  };

  const deposit = (accountNumber, amount) => {
    const updatedUser = {
      ...user,
      accounts: user.accounts.map(account => 
        account.accountNumber === accountNumber ? { ...account, balance: account.balance + amount } : account
      ),
    };
    setUser(updatedUser);
    localStorage.setItem(user.username, JSON.stringify(updatedUser));
  };

  const deleteAccount = (accountNumber) => {
    const updatedUser = {
      ...user,
      accounts: user.accounts.filter(account => account.accountNumber !== accountNumber),
    };
    setUser(updatedUser);
    localStorage.setItem(user.username, JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    logout,
    createAccount,
    deposit,
    deleteAccount
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
