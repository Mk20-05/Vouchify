import React, { useState } from 'react';

const faqData = [
  {
    question: "Is it safe to buy and sell vouchers on this platform?",
    answer: "Absolutely! We use secure encryption, verified payment gateways, and a buyer-seller protection system to ensure safe and trusted transactions.",
  },
  {
    question: "Are my payment details and personal data protected?",
    answer: "Yes, we comply with data protection standards. Your details are encrypted and never shared with third parties without consent.",
  },
  {
    question: "How do I buy a voucher?",
    answer: "Simply browse the marketplace, choose your preferred voucher, and proceed to secure checkout. Once the transaction is complete, voucher details will be unlocked instantly.",
  },
  {
    question: "What if I buy an invalid or expired voucher?",
    answer: "Our system prevents expired listings. If a valid issue arises, our buyer protection covers you — you can request a refund or dispute the purchase within 48 hours.",
  },
  {
    question: "How can I sell my unused vouchers?",
    answer: "Go to the “List Your Voucher” section, fill in details like code, expiry, and price. Once verified, your voucher will be live on the marketplace.",
  },
  {
    question: "When do I receive payment for my sold voucher?",
    answer: "After a successful sale and buyer confirmation, your payment will be credited to your wallet or preferred method within 24–48 hours.",
  },
  {
    question: "How does the wallet system work?",
    answer: "Your wallet stores earnings and cashback. You can use it for future purchases or withdraw to your bank account securely.",
  },
  {
    question: "What if my transaction fails?",
    answer: "Failed transactions are automatically refunded to your wallet or original payment method within 1–3 business days.",
  },
  {
    question: "Who do I contact for help or issues?",
    answer: "You can reach our support team via the “Help” section or email us at support@vouchify.com. We aim to resolve queries within 24 hours.",
  },
  {
    question: "Can I dispute a transaction?",
    answer: "Yes. You can raise a dispute from your transaction history page within 48 hours of purchase. Our team will mediate and ensure a fair resolution.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">🙋 Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border border-gray-300 rounded-lg">
            <button
              onClick={() => toggleIndex(index)}
              className="w-full text-left px-6 py-4 bg-gray-100 hover:bg-gray-200 font-medium text-lg"
            >
              {faq.question}
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 text-gray-700 bg-white border-t border-gray-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
