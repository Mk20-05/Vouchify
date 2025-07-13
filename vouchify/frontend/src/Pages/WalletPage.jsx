// src/Pages/WalletPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import UPIPaymentModal from '../components/UPIPaymentModal';
import {
  WalletIcon,
  PlusCircleIcon,
  ArrowLeftIcon,
  CurrencyRupeeIcon,
  BanknotesIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

const WalletPage = () => {
  const { currentUser } = useAuth();
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem(`wallet_balance_${currentUser?.email}`);
    return savedBalance ? parseFloat(savedBalance) : 0.0;
  });
  const [addAmount, setAddAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isUPIModalOpen, setIsUPIModalOpen] = useState(false);
  const navigate = useNavigate();

  const updateBalance = (newBalance) => {
    setBalance(newBalance);
    localStorage.setItem(`wallet_balance_${currentUser?.email}`, newBalance.toString());
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      setAddAmount(value);
    }
  };

  const handleProceedToAddFunds = () => {
    const amount = parseFloat(addAmount);
    if (isNaN(amount) || amount <= 0) {
      setStatus({ type: 'error', message: 'Please enter a valid amount to add.' });
      return;
    }

    const isTestAccount = currentUser?.email?.toLowerCase() === 'dummy@test.com';
    if (isTestAccount) {
      handleDirectAddFunds(amount);
    } else {
      setIsUPIModalOpen(true);
    }
  };

  const handleDirectAddFunds = async (amount) => {
    setIsProcessing(true);
    setStatus({ type: '', message: '' });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newBalance = parseFloat((parseFloat(balance) + amount).toFixed(2));
      updateBalance(newBalance);
      setStatus({
        type: 'success',
        message: `Successfully added ₹${amount.toFixed(2)} to your wallet! (Test Account)`
      });
      setAddAmount('');
    } catch (error) {
      console.error('Error adding funds:', error);
      setStatus({
        type: 'error',
        message: 'Failed to add funds. Please try again.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcessPayment = async (appId) => {
    setIsUPIModalOpen(false);
    setIsProcessing(true);
    setStatus({ type: '', message: '' });

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const amount = parseFloat(addAmount);
      const newBalance = parseFloat((parseFloat(balance) + amount).toFixed(2));
      updateBalance(newBalance);
      setStatus({
        type: 'success',
        message: `Successfully added ₹${amount.toFixed(2)} via ${appId}!`
      });
      setAddAmount('');
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Payment failed. Please try again.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-teal-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <WalletIcon className="h-12 w-12 mx-auto text-teal-600 mb-2" />
          <h1 className="text-4xl font-extrabold text-gray-900">My Wallet</h1>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 text-center">
          <p className="text-sm font-medium text-gray-500 mb-1">Current Balance</p>
          <p className="text-4xl font-bold text-teal-700">₹{balance.toFixed(2)}</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Funds to Wallet</h2>
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="addAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount to Add (₹)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CurrencyRupeeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="addAmount"
                  id="addAmount"
                  value={addAmount}
                  onChange={handleAmountChange}
                  inputMode="decimal"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="e.g., 500"
                />
              </div>
            </div>

            {status.message && (
              <div className={`p-3 rounded-md text-sm flex items-center ${
                status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {status.type === 'success'
                  ? <CheckCircleIcon className="h-5 w-5 mr-2" />
                  : <XCircleIcon className="h-5 w-5 mr-2" />}
                {status.message}
              </div>
            )}

            <button
              onClick={handleProceedToAddFunds}
              disabled={isProcessing || !addAmount || parseFloat(addAmount) <= 0}
              className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out ${
                (isProcessing || !addAmount || parseFloat(addAmount) <= 0)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-teal-600 hover:bg-teal-700'
              }`}
            >
              {isProcessing ? 'Processing...' : (
                <><PlusCircleIcon className="h-5 w-5 mr-2" /> Proceed to Add Funds</>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <BanknotesIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <h3 className="text-lg font-medium text-gray-500">Transaction History</h3>
          <p className="text-sm text-gray-400 mt-1">(Feature coming soon)</p>
        </div>

        <div className="text-center mt-10">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-teal-700 hover:underline transition duration-300"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1.5" />
            Back to Home
          </Link>
        </div>
      </div>

      <UPIPaymentModal
        isOpen={isUPIModalOpen}
        closeModal={() => setIsUPIModalOpen(false)}
        amount={addAmount}
        onProcessPayment={handleProcessPayment}
      />
    </div>
  );
};

export default WalletPage;
