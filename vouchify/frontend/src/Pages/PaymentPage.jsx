// src/Pages/PaymentPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Import hooks
import {
    CreditCardIcon, // Card Payment
    BuildingLibraryIcon, // Net Banking
    QrCodeIcon, // UPI (example)
    WalletIcon, // Platform Wallet
    CurrencyRupeeIcon, // Amount
    LockClosedIcon, // Security
    ArrowLeftIcon, // Back button
    InformationCircleIcon, // Info Tooltip/Message
    CheckCircleIcon, // Success
    XCircleIcon, // Error
    ShoppingCartIcon, // Order Summary
} from '@heroicons/react/24/outline';

// --- Mock Data (Replace with data fetched based on voucherId) ---
const getMockVoucherDetails = (id) => {
    // In real app, fetch from API: fetch(`/api/vouchers/${id}`)
    const mockData = {
        v1: { name: 'Amazon 10% Off Electronics', price: 50 },
        v2: { name: 'Flipkart Rs. 500 Off Fashion', price: 100 },
        // Add other mock details as needed
    };
    return mockData[id] || { name: 'Unknown Voucher', price: 0 };
};

const mockUserWalletBalance = 75; // Example balance
// --- End Mock Data ---


const PaymentPage = () => {
    const { voucherId } = useParams(); // Get voucherId from URL (e.g., /payment/v1)
    const navigate = useNavigate();

    const [voucherDetails, setVoucherDetails] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState('WALLET'); // Default selection
    const [walletBalance, setWalletBalance] = useState(mockUserWalletBalance);
    const [useWallet, setUseWallet] = useState(true); // Toggle to use wallet balance

    const [isProcessing, setIsProcessing] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' }); // 'success', 'error', ''

    useEffect(() => {
        // Fetch voucher details based on voucherId when component mounts
        const details = getMockVoucherDetails(voucherId);
        setVoucherDetails(details);
        // If wallet balance is insufficient, default to another method
        if (details && mockUserWalletBalance < details.price) {
            setSelectedMethod('UPI'); // Or 'CARD' etc.
            setUseWallet(false); // Can't fully pay with wallet
        } else if (!details) {
             setStatus({ type: 'error', message: 'Invalid Voucher ID.' });
        }

    }, [voucherId]); // Re-run if voucherId changes

    const calculateAmountDue = () => {
        if (!voucherDetails) return 0;
        if (useWallet) {
            return Math.max(0, voucherDetails.price - walletBalance);
        }
        return voucherDetails.price;
    };

    const amountDue = calculateAmountDue();

    // --- Placeholder Payment Handler ---
    const handlePayment = async () => {
        if (amountDue > 0 && selectedMethod === 'WALLET') {
            setStatus({ type: 'error', message: 'Insufficient wallet balance. Please select another payment method or add funds.' });
            return;
        }
        if (amountDue === 0 && !useWallet) {
            setStatus({ type: 'error', message: 'Please select your wallet to pay.' });
            return;
        }

        setIsProcessing(true);
        setStatus({ type: '', message: '' });
        console.log(`Processing payment for Voucher ${voucherId}`);
        console.log(`Amount: ₹${voucherDetails.price}, Using Wallet: ${useWallet}, Amount Due: ₹${amountDue}, Method: ${selectedMethod}`);

        // ** SIMULATE API CALL TO BACKEND/PAYMENT GATEWAY **
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Based on response from backend/gateway:
        const paymentSuccess = Math.random() > 0.2; // Simulate success/failure

        if (paymentSuccess) {
            setStatus({ type: 'success', message: `Payment Successful! Voucher "${voucherDetails.name}" purchased.` });
            // TODO: Update user's wallet balance if used
            // TODO: Mark voucher as sold in backend
            // TODO: Redirect to a success page or order history
            setTimeout(() => navigate('/'), 3000); // Redirect home after 3s
        } else {
            setStatus({ type: 'error', message: `Payment Failed via ${selectedMethod}. Please try again or use another method.` });
        }
        setIsProcessing(false);
        // ** END SIMULATION **
    };


    if (!voucherDetails && !status.message) {
        return <div className="text-center p-10">Loading voucher details...</div>; // Basic loading state
    }
    if (status.type === 'error' && !voucherDetails) {
         return <div className="text-center p-10 text-red-600">{status.message} <Link to="/vouchers" className='text-blue-600 hover:underline'>Go back</Link></div>
    }


    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800 text-center mb-4 flex items-center justify-center">
                        <ShoppingCartIcon className="h-6 w-6 mr-2 text-gray-500" />
                        Complete Your Purchase
                    </h1>

                    {/* Order Summary */}
                    {voucherDetails && (
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-5">
                             <h3 className="text-sm font-medium text-gray-500 mb-1">Purchasing:</h3>
                             <p className="text-lg font-semibold text-gray-900">{voucherDetails.name}</p>
                             <p className="text-xl font-bold text-green-600 mt-1">Total Price: ₹{voucherDetails.price}</p>
                        </div>
                    )}
                </div>

                <div className="p-6">
                    {/* Wallet Balance */}
                    <div className="mb-6 p-4 border border-blue-200 rounded-md bg-blue-50">
                         <div className="flex justify-between items-center mb-2">
                            <label htmlFor="useWalletCheckbox" className="flex items-center text-sm font-medium text-blue-800 cursor-pointer">
                               <WalletIcon className="h-5 w-5 mr-2 text-blue-600"/>
                               Available Wallet Balance:
                               <span className='ml-1 font-bold text-blue-700'>₹{walletBalance.toFixed(2)}</span>
                           </label>
                           <input
                                type="checkbox"
                                id="useWalletCheckbox"
                                checked={useWallet}
                                onChange={(e) => setUseWallet(e.target.checked)}
                                disabled={walletBalance <= 0} // Disable if balance is zero
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                         </div>
                        {useWallet && voucherDetails && walletBalance < voucherDetails.price && (
                             <p className="text-xs text-orange-700 flex items-center mt-1">
                                 <InformationCircleIcon className="h-4 w-4 mr-1"/>
                                 Wallet balance is insufficient. Remaining amount needs to be paid.
                             </p>
                        )}
                    </div>


                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Select Payment Method</h2>

                    {/* Display Payment Options only if amount is due */}
                    {amountDue > 0 ? (
                        <div className="space-y-4">
                            {/* UPI Option */}
                            <PaymentOption
                                id="UPI"
                                value="UPI"
                                selectedMethod={selectedMethod}
                                setSelectedMethod={setSelectedMethod}
                                icon={QrCodeIcon}
                                label="UPI / QR Code"
                                description="Pay via any UPI app (GPay, PhonePe, etc.)"
                            />

                             {/* Card Option */}
                            <PaymentOption
                                id="CARD"
                                value="CARD"
                                selectedMethod={selectedMethod}
                                setSelectedMethod={setSelectedMethod}
                                icon={CreditCardIcon}
                                label="Credit/Debit Card"
                                description="Visa, Mastercard, RuPay, Amex"
                            />

                             {/* Net Banking Option */}
                            <PaymentOption
                                id="NETBANKING"
                                value="NETBANKING"
                                selectedMethod={selectedMethod}
                                setSelectedMethod={setSelectedMethod}
                                icon={BuildingLibraryIcon}
                                label="Net Banking"
                                description="Select your bank"
                            />
                            {/* Add More Options (e.g., Other Wallets) if needed */}
                        </div>
                    ) : (
                        <div className="text-center p-4 bg-green-50 border border-green-200 rounded-md">
                            <p className="text-green-700 font-medium flex items-center justify-center">
                                <WalletIcon className="h-5 w-5 mr-2"/>
                                Paying entirely with Wallet Balance.
                             </p>
                        </div>
                    )}


                    {/* Amount Due Display */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                             <span className="text-lg font-medium text-gray-700">Amount to Pay Now:</span>
                             <span className="text-2xl font-bold text-indigo-600">₹{amountDue.toFixed(2)}</span>
                        </div>
                    </div>

                     {/* Status Messages */}
                    {status.message && (
                        <div className={`mt-4 p-3 rounded-md text-sm flex items-center ${
                            status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                            {status.type === 'success' ? <CheckCircleIcon className="h-5 w-5 mr-2"/> : <XCircleIcon className="h-5 w-5 mr-2"/>}
                            {status.message}
                        </div>
                    )}


                    {/* Pay Button */}
                    <div className="mt-8">
                        <button
                            onClick={handlePayment}
                            disabled={isProcessing || status.type === 'success'}
                            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${
                            isProcessing || status.type === 'success' ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                        >
                            {isProcessing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /* ... spinner svg ... */ ></svg> Processing...
                                </>
                            ) : status.type === 'success' ? (
                                 <> <CheckCircleIcon className="h-5 w-5 mr-2"/> Payment Successful </>
                            ): (
                                <>
                                    <LockClosedIcon className="h-5 w-5 mr-2"/>
                                    Pay ₹{amountDue.toFixed(2)} Securely
                                </>
                            )}
                        </button>
                    </div>

                     {/* Back Link */}
                     <div className="text-center mt-6">
                        <Link to="/vouchers" className="text-sm text-gray-600 hover:text-indigo-500 inline-flex items-center">
                            <ArrowLeftIcon className="h-4 w-4 mr-1" />
                            Cancel and Go Back
                        </Link>
                     </div>
                </div>
            </div>
        </div>
    );
};


// --- Reusable Payment Option Component ---
const PaymentOption = ({ id, value, selectedMethod, setSelectedMethod, icon: Icon, label, description }) => (
    <label htmlFor={id} className={`flex items-center p-4 border rounded-lg cursor-pointer transition duration-200 ${
        selectedMethod === value ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-200' : 'border-gray-300 hover:bg-gray-50'
    }`}>
        <input
            type="radio"
            id={id}
            name="paymentMethod"
            value={value}
            checked={selectedMethod === value}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 mr-4"
        />
        <Icon className="h-6 w-6 mr-3 text-gray-600"/>
        <div>
            <span className="font-medium text-gray-800">{label}</span>
            <p className="text-xs text-gray-500">{description}</p>
        </div>
    </label>
);


export default PaymentPage;