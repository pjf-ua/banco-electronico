import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Administrar = () => {
  const { cuenta } = useParams();
  const { user, deposit } = useAuth();
  const account = user.accounts.find(acc => acc.accountNumber === cuenta);
  const navigate = useNavigate()
  const [alert, setAlert] = useState(false)

  if (!account) {
    return <p>Cuenta no encontrada.</p>;
  }

  const handleDeposit = (amount) => {
    deposit(account.accountNumber, amount);
    setAlert(true)
    setTimeout(() => {
      setAlert(false);
      navigate("/dashboard");
    }, 2000); // Espera 2 segundos antes de redirigir
  };

  const handleTransfer = (targetAccountNumber, amount) => {
    const targetAccount = user.accounts.find(acc => acc.accountNumber === targetAccountNumber);
    if (!targetAccount) {
      alert('Cuenta destino no encontrada');
      return;
    }

    if (account.balance < amount) {
      alert('Saldo insuficiente');
      return;
    }

    account.balance -= amount;
    targetAccount.balance += amount;

    const updatedUser = {
      ...user,
      accounts: user.accounts.map(acc =>
        acc.accountNumber === account.accountNumber || acc.accountNumber === targetAccountNumber ? 
        (acc.accountNumber === account.accountNumber ? account : targetAccount) : acc
      ),
    };
    localStorage.setItem(user.username, JSON.stringify(updatedUser));
    // Update state
  };

  return (
    <>
      <div className="p-6">
        {
          alert ? 
          <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <span className="font-medium">Ingreso realizado!</span>
          </div> : <></>
        }
        <h1 className="text-3xl font-bold">Administrar Cuenta</h1>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Detalles de la cuenta:</h2>
          <p>Número de cuenta: {account.accountNumber}</p>
          <p>Fecha de expiración: {account.expirationDate}</p>
          <p>Código de seguridad: {account.securityNumber}</p>
          <p>Saldo: {account.balance}</p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Operaciones:</h2>
          <button onClick={() => handleDeposit(1000)} className="border border-gray-200 p-3 rounded-lg hover:bg-gray-50">
            Ingresar 1000
          </button>
          <button onClick={() => handleTransfer('targetAccountNumber', 500)} className="border border-gray-200 p-3 rounded-lg hover:bg-gray-50">
            Transferir 500 a otra cuenta
          </button>
        </div>
      </div>
    </>
  );
};

export default Administrar;
