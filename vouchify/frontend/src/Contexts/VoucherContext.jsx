import React, { createContext, useState, useContext, useEffect } from 'react';

const VoucherContext = createContext(null);

// Initial mock data
const initialVouchers = [
  {
    id: 'v1',
    name: 'Amazon 10% Off Electronics',
    description: 'Get 10% off on select electronics. Max discount Rs. 500.',
    expiry: '2024-12-31',
    seller: 'UserA',
    price: 50,
    category: 'Electronics',
    brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
  {
    id: 'v2',
    name: 'Flipkart Rs. 500 Off Fashion',
    description: 'Rs. 500 off on fashion orders above Rs. 2000.',
    expiry: '2024-11-30',
    seller: 'UserB',
    price: 100,
    category: 'Fashion',
    brandLogo: 'https://seeklogo.com/images/F/flipkart-logo-3F33927DAA-seeklogo.com.png',
  },
];

export const VoucherProvider = ({ children }) => {
  // Load from localStorage or use initial mock data
  const [vouchers, setVouchers] = useState(() => {
    const saved = localStorage.getItem('vouchers');
    return saved ? JSON.parse(saved) : initialVouchers;
  });

  // Save vouchers to localStorage on change
  useEffect(() => {
    localStorage.setItem('vouchers', JSON.stringify(vouchers));
  }, [vouchers]);

  const addVoucher = (newVoucher) => {
    const voucherId = `v${Date.now()}`;
    const voucherWithId = { ...newVoucher, id: voucherId };
    setVouchers(prev => [...prev, voucherWithId]);
    return voucherId;
  };

  const deleteVoucher = (id) => {
    setVouchers(prev => prev.filter(v => v.id !== id));
  };

  const getVoucherById = (id) => {
    return vouchers.find(v => v.id === id);
  };

  return (
    <VoucherContext.Provider value={{ vouchers, addVoucher, deleteVoucher, getVoucherById }}>
      {children}
    </VoucherContext.Provider>
  );
};

export const useVouchers = () => {
  const context = useContext(VoucherContext);
  if (!context) {
    throw new Error('useVouchers must be used within a VoucherProvider');
  }
  return context;
};

export default VoucherContext;
