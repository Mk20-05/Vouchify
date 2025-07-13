import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useVouchers } from '../Contexts/VoucherContext'; // Ensure this path is correct
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  InformationCircleIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/solid';
import { Switch } from '@headlessui/react'; // Make sure you installed: npm install @headlessui/react

// --- Platform Defined FIXED Distribution Rules (Percentages of Original Price) ---
// --- BASED ON USER EXAMPLE: Original = 100 ---
const SELLER_PAYOUT_PERCENT = 0.30;   // 30% Goes to the Voucher Owner (Seller) -> Gets ₹30
const BUYER_DISCOUNT_PERCENT = 0.50;  // 50% Saving for the Buyer -> Buyer Saves ₹50 (Pays ₹50)
const PLATFORM_FEE_PERCENT = 0.15; // 10.5% Goes to this Web Platform -> Gets ₹1.50
const COMPANY_SHARE_PERCENT = 0.05; // 0.5% Goes to the Original Voucher Company -> Gets ₹0.50
// Note: Total specified distribution = 30 + 50 + 1.5 + 0.5 = 82% of original value.

// Helper for class names
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ListVoucher = () => {
  const { addVoucher } = useVouchers();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Other',
    originalPrice: '', // Seller enters this *only*
    expiry: '',
    code: '',
    isListedForSale: true,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // State to store automatically calculated values based on the NEW fixed percentages
  const [calculatedValues, setCalculatedValues] = useState({
    sellingPrice: 0,        // What the buyer pays (Original - Buyer Discount)
    buyerDiscountAmount: 0, // The amount buyer saves
    sellerPayoutAmount: 0,  // Amount seller receives
    platformFeeAmount: 0,   // Amount platform receives
    companyShareAmount: 0,  // Amount original company receives
  });

  // Effect to automatically calculate all amounts based *only* on originalPrice
  useEffect(() => {
    const originalPriceNum = parseFloat(formData.originalPrice);

    if (formData.isListedForSale && !isNaN(originalPriceNum) && originalPriceNum > 0) {
      // Calculate amounts based on the fixed percentages of the original price
      const buyerDiscount = originalPriceNum * BUYER_DISCOUNT_PERCENT;
      const sellingPrice = originalPriceNum - buyerDiscount; // What the buyer pays
      const sellerPayout = originalPriceNum * SELLER_PAYOUT_PERCENT;
      const platformFee = originalPriceNum * PLATFORM_FEE_PERCENT;
      const companyShare = originalPriceNum * COMPANY_SHARE_PERCENT;

      setCalculatedValues({
        sellingPrice: parseFloat(sellingPrice.toFixed(2)),
        buyerDiscountAmount: parseFloat(buyerDiscount.toFixed(2)),
        sellerPayoutAmount: parseFloat(sellerPayout.toFixed(2)),
        platformFeeAmount: parseFloat(platformFee.toFixed(2)),
        companyShareAmount: parseFloat(companyShare.toFixed(2)),
      });
    } else {
      // Reset if not listed or original price is invalid/zero
      setCalculatedValues({
        sellingPrice: 0, buyerDiscountAmount: 0, sellerPayoutAmount: 0,
        platformFeeAmount: 0, companyShareAmount: 0,
      });
    }
  }, [formData.originalPrice, formData.isListedForSale]); // Dependencies


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: null }));
    if (submitError) setSubmitError(null);
    if (successMessage) setSuccessMessage('');
  };

   const handleSwitchChange = (checked) => {
    setFormData(prev => ({ ...prev, isListedForSale: checked }));
    if (submitError) setSubmitError(null);
    if (successMessage) setSuccessMessage('');
  };

  const validateForm = () => {
    const errors = {};
    const today = new Date().toISOString().split('T')[0];
    const originalPriceNum = Number(formData.originalPrice);

    if (!formData.name.trim()) errors.name = 'Voucher name is required.';
    if (!formData.description.trim()) errors.description = 'Description is required.';
    if (!formData.code.trim()) errors.code = 'Voucher code is required.';

    if (formData.originalPrice === '' || formData.originalPrice === null) {
       errors.originalPrice = 'Original value is required.';
    } else if (isNaN(originalPriceNum) || originalPriceNum <= 0) {
       errors.originalPrice = 'Please enter a valid positive original value.';
    }

    if (!formData.expiry) {
      errors.expiry = 'Expiry date is required.';
    } else {
        try {
            const expiryDate = new Date(formData.expiry + 'T00:00:00');
            const todayDate = new Date(today + 'T00:00:00');
             if (expiryDate < todayDate) errors.expiry = 'Expiry date cannot be in the past.';
        } catch(e) { errors.expiry = 'Invalid date format.'; }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // --- Styling Helpers (getInputClass, getSelectClass - remain the same) ---
   const getInputClass = (field) => {
    const base = 'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed';
    return `${base} ${formErrors[field] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'}`;
  };
  const getSelectClass = (field) => {
    const base = 'mt-1 block w-full pl-3 pr-10 py-2 border bg-white rounded-md shadow-sm focus:outline-none sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed';
    return `${base} ${formErrors[field] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'}`;
  };

  // --- Form Submission Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSuccessMessage('');

    if (!validateForm()) {
        const firstErrorField = Object.keys(formErrors).find(key => formErrors[key]);
        if (firstErrorField) {
            const element = document.getElementById(firstErrorField);
            element?.focus({ preventScroll: true });
            element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    if (formData.isListedForSale && calculatedValues.sellingPrice <= 0 && parseFloat(formData.originalPrice) > 0) {
        // This case might happen if buyer discount is 100% or more, based on constants
        setSubmitError("Calculation error: Selling price cannot be zero or less based on current rules.");
        return;
    }
     if (formData.isListedForSale && parseFloat(formData.originalPrice) <= 0) {
        setSubmitError("Cannot list voucher: Original price seems invalid.");
        document.getElementById('originalPrice')?.focus();
        return;
    }


    setIsSubmitting(true);

    try {
      const originalPriceNum = parseFloat(formData.originalPrice);

      // Prepare data based on the NEW fixed calculation rules
      const voucherData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        category: formData.category,
        originalPrice: originalPriceNum,
        price: formData.isListedForSale ? calculatedValues.sellingPrice : null, // Price Buyer Pays
        expiry: formData.expiry,
        code: formData.code.trim(),
        seller: 'CurrentUser', // Replace with actual user ID
        brandLogo: '', // Placeholder

        // Store the calculated amounts based on the fixed percentages
        sellerPayout: formData.isListedForSale ? calculatedValues.sellerPayoutAmount : 0,
        platformFee: formData.isListedForSale ? calculatedValues.platformFeeAmount : 0,
        companyShare: formData.isListedForSale ? calculatedValues.companyShareAmount : 0,
        // buyerDiscount: calculatedValues.buyerDiscountAmount, // Store if needed

        status: formData.isListedForSale ? 'listed' : 'unlisted',
        isListedForSale: formData.isListedForSale,
        listedDate: new Date().toISOString(),

        // Store the rules used (optional)
        // distributionRulesSnapshot: formData.isListedForSale ? { /* ... percentages ... */ } : null,
      };

      console.log('Submitting Voucher Data (New Rules):', voucherData);
      // const voucherId = await addVoucher(voucherData); // Replace with your actual async call
      const voucherId = addVoucher(voucherData); // Assuming sync context for now

      setSuccessMessage(`Voucher "${formData.name}" ${formData.isListedForSale ? 'listing confirmed' : 'saved'}! Redirecting...`);
       setFormData({
        name: '', description: '', category: 'Other', originalPrice: '',
        expiry: '', code: '', isListedForSale: true,
      });
      setFormErrors({});

      setTimeout(() => {
        navigate(voucherId ? `/vouchers/${voucherId}` : '/');
      }, 2500);

    } catch (err) {
      console.error('Submission Error:', err);
      setSubmitError(err.message || `Failed to ${formData.isListedForSale ? 'list' : 'save'} voucher.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Component Render ---
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white p-6 sm:p-8 rounded-xl shadow-lg relative">
        {/* Back Link */}
        <Link to="/" className="absolute top-4 left-4 text-indigo-600 hover:text-indigo-800 transition" title="Back">
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-700 mb-3">
          {formData.isListedForSale ? 'Confirm Voucher Listing' : 'Save Voucher Details'}
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6 sm:mb-8">
          {formData.isListedForSale
            ? `Buyers get ${BUYER_DISCOUNT_PERCENT * 100}% off the original value. You receive ${SELLER_PAYOUT_PERCENT * 100}% back.`
            : 'Save voucher details. You can list it later.'}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Status Messages */}
          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center" role="alert">
              <XCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" aria-hidden="true" />
              <span>{submitError}</span>
            </div>
          )}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-center" role="alert">
              <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" aria-hidden="true" />
              <span>{successMessage}</span>
            </div>
           )}

          {/* --- Willing to Sell Toggle --- */}
          <Switch.Group as="div" className="flex items-center justify-between py-3 border-t border-b border-gray-200">
              <span className="flex-grow flex flex-col pr-4">
                <Switch.Label as="span" className="text-sm font-medium text-gray-900 cursor-pointer" passive>
                  List this voucher for sale?
                </Switch.Label>
                <Switch.Description as="span" className="text-xs text-gray-500">
                  Makes it available for purchase based on the fixed rates.
                </Switch.Description>
              </span>
              <Switch
                checked={formData.isListedForSale}
                onChange={handleSwitchChange}
                name="isListedForSale"
                disabled={isSubmitting || !!successMessage}
                className={classNames(
                  formData.isListedForSale ? 'bg-indigo-600' : 'bg-gray-200', // Changed color scheme
                  'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                <span className={classNames(
                    formData.isListedForSale ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                  )}
                />
              </Switch>
          </Switch.Group>

          {/* --- Core Voucher Details (Inputs remain structurally same) --- */}
          <div> {/* Name Input */}
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Voucher Name <span className="text-red-500">*</span></label>
            <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className={getInputClass('name')} required disabled={isSubmitting || !!successMessage}/>
            {formErrors.name && <p className="mt-1 text-xs text-red-600">{formErrors.name}</p>}
          </div>
          <div> {/* Code Input */}
             <label htmlFor="code" className="block text-sm font-medium text-gray-700">Voucher Code <span className="text-red-500">*</span></label>
             <input id="code" name="code" type="text" value={formData.code} onChange={handleChange} className={getInputClass('code')} required disabled={isSubmitting || !!successMessage} />
             {formErrors.code && <p className="mt-1 text-xs text-red-600">{formErrors.code}</p>}
             <p className="mt-1 text-xs text-gray-500">Revealed after purchase if listed.</p>
          </div>
          <div> {/* Description Input */}
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description & Terms <span className="text-red-500">*</span></label>
            <textarea id="description" name="description" rows="3" value={formData.description} onChange={handleChange} className={getInputClass('description')} required disabled={isSubmitting || !!successMessage}/>
            {formErrors.description && <p className="mt-1 text-xs text-red-600">{formErrors.description}</p>}
          </div>
          <div> {/* Category Select */}
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
             <select id="category" name="category" value={formData.category} onChange={handleChange} className={getSelectClass('category')} disabled={isSubmitting || !!successMessage}>
                <option>Electronics</option><option>Fashion</option><option>Food & Dining</option>
                <option>Travel & Hotels</option><option>Entertainment</option><option>Groceries</option>
                <option>Health & Beauty</option><option>Services</option><option>Other</option>
             </select>
          </div>

          {/* --- Original Price Input --- */}
          <div>
            <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">
              Original Voucher Value (₹) <span className="text-red-500">*</span>
            </label>
             <div className="relative mt-1 rounded-md shadow-sm">
                 <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <CurrencyRupeeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                 </div>
                <input type="number" id="originalPrice" name="originalPrice" min="0.01" step="0.01" value={formData.originalPrice} onChange={handleChange} aria-invalid={!!formErrors.originalPrice} aria-describedby="originalPrice-description originalPrice-error" className={`${getInputClass('originalPrice')} pl-10 pr-3`} placeholder="e.g., 100.00" required disabled={isSubmitting || !!successMessage}/>
             </div>
            {formErrors.originalPrice && <p className="mt-1 text-xs text-red-600" id="originalPrice-error">{formErrors.originalPrice}</p>}
            <p id="originalPrice-description" className="mt-1 text-xs text-gray-500">Enter the exact face value. Calculations depend on this.</p>
          </div>

           {/* --- Calculation Display (Updated for New Rules) --- */}
          {formData.isListedForSale && parseFloat(formData.originalPrice) > 0 && !formErrors.originalPrice && (
             <div className="mt-4 p-4 border border-purple-200 bg-purple-50 rounded-lg space-y-3 text-sm">
                <h3 className="font-semibold text-purple-800 mb-2">Fixed Price & Payout Details:</h3>
                 <div className="flex justify-between items-center text-gray-700">
                    <span>Original Value:</span>
                    <span className="font-medium">₹{parseFloat(formData.originalPrice).toFixed(2)}</span>
                </div>
                 <div className="flex justify-between items-center text-red-600">
                    <span>Buyer Discount ({BUYER_DISCOUNT_PERCENT * 100}%):</span>
                    <span className="font-medium"> - ₹{calculatedValues.buyerDiscountAmount.toFixed(2)}</span>
                 </div>
                 <hr className="border-purple-100 my-2"/>
                 <div className="flex justify-between items-center text-purple-900 font-bold text-base">
                    <span>Buyer Pays:</span>
                    <span>₹{calculatedValues.sellingPrice.toFixed(2)}</span>
                 </div>
                 <hr className="border-purple-100 my-2"/>
                 <div className="flex justify-between items-center text-green-700 font-semibold">
                    <span> You Will Receive ({SELLER_PAYOUT_PERCENT * 100}%):</span>
                    <span>+ ₹{calculatedValues.sellerPayoutAmount.toFixed(2)}</span>
                 </div>
                 <div className="text-xs text-gray-500 pt-2 border-t border-purple-100 mt-2 space-y-1">
                      <p className="flex justify-between"><span>Platform Fee ({PLATFORM_FEE_PERCENT*100}%):</span> <span>₹{calculatedValues.platformFeeAmount.toFixed(2)}</span></p>
                      <p className="flex justify-between"><span>Company Share ({COMPANY_SHARE_PERCENT*100}%):</span> <span>₹{calculatedValues.companyShareAmount.toFixed(2)}</span></p>
                 </div>

                 <div className="mt-3 text-xs text-gray-600 flex items-start pt-2 ">
                     <InformationCircleIcon className="h-4 w-4 mr-1.5 flex-shrink-0 text-gray-400 mt-0.5" aria-hidden="true"/>
                     <span>By listing, you agree to receive ₹{calculatedValues.sellerPayoutAmount.toFixed(2)} based on the original value, subject to payout terms.</span>
                 </div>
             </div>
          )}

          {/* Expiry Date Input */}
          <div>
             <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry Date <span className="text-red-500">*</span></label>
             <input id="expiry" name="expiry" type="date" value={formData.expiry} onChange={handleChange} className={getInputClass('expiry')} min={new Date().toISOString().split('T')[0]} required aria-invalid={!!formErrors.expiry} aria-describedby="expiry-error" disabled={isSubmitting || !!successMessage}/>
             {formErrors.expiry && <p className="mt-1 text-xs text-red-600" id="expiry-error">{formErrors.expiry}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" disabled={isSubmitting || !!successMessage || (formData.isListedForSale && calculatedValues.sellingPrice <= 0 && parseFloat(formData.originalPrice) > 0)} className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-150 ease-in-out ${ /* Styles */ (isSubmitting || !!successMessage || (formData.isListedForSale && calculatedValues.sellingPrice <= 0 && parseFloat(formData.originalPrice) > 0) ) ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' } `}>
                {isSubmitting && ( <ArrowPathIcon className="animate-spin h-5 w-5 mr-3" /> )}
                {isSubmitting ? 'Processing...' : (successMessage ? 'Success!' : (formData.isListedForSale ? 'Confirm & List Voucher' : 'Save Voucher Details'))}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListVoucher;