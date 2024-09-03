import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Dashboard = () => {
  const { user, createAccount, deleteAccount } = useAuth();
  const [alert, setAlert] = useState(false)

  const handleCreateAccount = () => {
    createAccount();
  };

  const handleDeleteAccount = (accountNumber) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta cuenta?')) {
      deleteAccount(accountNumber);
      setAlert(true)
    }
  };

  return (
    <div className="p-6">
        {
          alert ? 
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <span className="font-medium">Cuenta eliminada!</span>
          </div> : <></>
        }
      <h1 className="text-3xl font-bold">Dashboard</h1>
      {user && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Tus cuentas bancarias:</h2>
          {user.accounts && user.accounts.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.accounts.map((account) => (
                <li key={account.accountNumber} className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold">{account.holderName}</h3>
                  <p>Número de cuenta: {account.accountNumber}</p>
                  <p>Fecha de expiración: {account.expirationDate.toString()}</p>
                  <p>Código de seguridad: {account.securityNumber}</p>
                  <p>Saldo: {account.balance} €</p>
                  <div className="flex space-x-4">
                    <Link to={`/cuentas/${account.accountNumber}`} className="text-blue-500 hover:underline">
                      Administrar cuenta
                    </Link>
                    <button 
                      onClick={() => handleDeleteAccount(account.accountNumber)} 
                      className="text-red-500 hover:underline"
                    >
                      Eliminar cuenta
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tienes cuentas bancarias aún.</p>
          )}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button onClick={handleCreateAccount} className="border border-gray-200 p-4 rounded-lg hover:bg-gray-50">
              <h2 className="text-xl font-bold mb-2">Crear Cuenta</h2>
              <p className="text-gray-600">Crea una nueva cuenta bancaria.</p>
            </button>
            <Link to="#" className="border border-gray-200 p-4 rounded-lg hover:bg-gray-50">
              <h2 className="text-xl font-bold mb-2">Ver Saldo Disponible</h2>
              <p className="text-gray-600">Consulta el saldo disponible en tus cuentas.</p>
            </Link>
            <Link to="#" className="border border-gray-200 p-4 rounded-lg hover:bg-gray-50">
              <h2 className="text-xl font-bold mb-2">Transferencia</h2>
              <p className="text-gray-600">Realiza transferencias entre tus cuentas.</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
