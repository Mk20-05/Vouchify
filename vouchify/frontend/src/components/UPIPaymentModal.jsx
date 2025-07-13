import React from 'react';
import { Dialog } from '@headlessui/react';

const UPIPaymentModal = ({ isOpen, closeModal, amount, onProcessPayment }) => {
  const paymentMethods = [
    { id: 'gpay', name: 'Google Pay', icon: '💳' },
    { id: 'phonepe', name: 'PhonePe', icon: '📱' },
    { id: 'paytm', name: 'Paytm', icon: '💰' },
  ];

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white p-6">
          <Dialog.Title className="text-xl font-semibold mb-4">Select Payment Method</Dialog.Title>
          
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => onProcessPayment(method.name)}
                className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <span className="flex items-center">
                  <span className="mr-2">{method.icon}</span>
                  <span>{method.name}</span>
                </span>
                <span className="text-gray-500">₹{parseFloat(amount).toFixed(2)}</span>
              </button>
            ))}
          </div>

          <button
            onClick={closeModal}
            className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UPIPaymentModal;