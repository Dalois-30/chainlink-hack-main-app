// import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { TransactionContext } from "../../shared/context/TransactionContext"

const PrivateRoute = ({ children }) => {
  const { connectWallet} = useContext(TransactionContext)
  return (connectWallet ? children : <Navigate to="/auth/login" />);
};

export default PrivateRoute;
