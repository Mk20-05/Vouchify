// src/contexts/WalletContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem(`wallet_balance_${currentUser?.email}`);
    return savedBalance ? parseFloat(savedBalance) : 0.00;
  });

  useEffect(() => {
    if (currentUser?.email) {
      localStorage.setItem(`wallet_balance_${currentUser.email}`, balance.toString());
    }
  }, [balance, currentUser]);

  const updateBalance = (newBalance) => {
    setBalance(parseFloat(newBalance.toFixed(2)));
  };

  const deductBalance = (amount) => {
    if (balance >= amount) {
      updateBalance(balance - amount);
      return true;
    }
    return false;
  };

  return (
    <WalletContext.Provider value={{ balance, updateBalance, deductBalance }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
