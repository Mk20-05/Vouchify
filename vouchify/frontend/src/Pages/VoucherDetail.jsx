// src/Pages/VoucherDetail.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useVouchers } from '../Contexts/VoucherContext';
import { useWallet } from '../Contexts/WalletContext';
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  UserIcon,
  TagIcon,
} from '@heroicons/react/24/outline';

const VoucherDetail = () => {
  const { id } = useParams();
  const { getVoucherById } = useVouchers();
  const { balance, deductBalance } = useWallet();
  const [purchaseStatus, setPurchaseStatus] = useState('');
  const [showCode, setShowCode] = useState(false);
  const voucher = getVoucherById(id);

  const handlePurchase = () => {
    if (balance < voucher.price) {
      setPurchaseStatus('error');
      return;
    }

    const success = deductBalance(voucher.price);
    if (success) {
      setPurchaseStatus('success');
      setShowCode(true);
    }
  };

  if (!voucher) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Voucher not found</h2>
          <Link to="/vouchers" className="mt-4 text-blue-600 hover:underline">
            Back to Vouchers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/vouchers" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Vouchers
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{voucher.name}</h1>
            <p className="text-gray-600 mb-6">{voucher.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <CalendarDaysIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span>Expires: {voucher.expiry}</span>
              </div>
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span>Seller: {voucher.seller}</span>
              </div>
              <div className="flex items-center">
                <TagIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span>Category: {voucher.category}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-xl text-green-600">₹{voucher.price}</span>
              </div>
            </div>

            {purchaseStatus === 'error' && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                Insufficient balance. Please add funds to your wallet.
              </div>
            )}

            {purchaseStatus === 'success' ? (
              <div className="mb-4 p-4 bg-green-100 rounded-md">
                <p className="text-green-700 font-medium mb-2">Purchase Successful!</p>
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">Redeem Code:</p>
                  <p className="font-mono text-lg font-bold text-gray-800">{voucher.code || 'VOUCHER123'}</p>
                </div>
              </div>
            ) : (
              <button
                onClick={handlePurchase}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
              >
                Purchase Voucher (Balance: ₹{balance})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherDetail;
