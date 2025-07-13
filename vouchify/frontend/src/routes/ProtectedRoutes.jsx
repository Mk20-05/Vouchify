// // src/routes/ProtectedRoutes.jsx
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import ProtectedRoute from '../components/ProtectedRoute';

// // Protected Pages
// import Vouchers from '../Pages/Vouchers';
// import VoucherDetail from '../Pages/VoucherDetail';
// import ListVoucher from '../Pages/ListVoucher';
// import WalletPage from '../Pages/WalletPage';
// import UploadImage from '../Pages/Uploadimage';
// import PaymentPage from '../Pages/PaymentPage';
// import WriteReviewPage from '../Pages/WriteReviewPage';

// const ProtectedRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/vouchers" element={<ProtectedRoute><Vouchers /></ProtectedRoute>} />
//       <Route path="/vouchers/:id" element={<ProtectedRoute><VoucherDetail /></ProtectedRoute>} />
//       <Route path="/list-voucher" element={<ProtectedRoute><ListVoucher /></ProtectedRoute>} />
//       <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
//       <Route path="/upload" element={<ProtectedRoute><UploadImage /></ProtectedRoute>} />
//       <Route path="/payment/:voucherId" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
//       <Route path="/write-review/general" element={<ProtectedRoute><WriteReviewPage /></ProtectedRoute>} />
//       <Route path="/write-review/:voucherId" element={<ProtectedRoute><WriteReviewPage /></ProtectedRoute>} />
//     </Routes>
//   );
// };

// export default ProtectedRoutes;


// src/routes/ProtectedRoutes.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";  // ← new import

/**
 * Gate‑keeps every private route.
 * • While Firebase is still loading → show a spinner.
 * • If user is logged in        → render the matched child route.
 * • Otherwise                   → redirect to /login.
 */
const ProtectedRoutes = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen grid place-content-center text-lg">
        Loading…
      </div>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;

