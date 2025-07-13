// // src/App.jsx
// // import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import { AuthProvider } from './Contexts/AuthContext';
// import { WalletProvider,AuthProvider} from './Contexts/WalletContext';
// import { VoucherProvider } from './Contexts/VoucherContext';

// // Components
// import Navbar from './Components/Navbar';
// import Footer from './components/Footer';
// import ScrollToTop from './components/ScrollToTop';
// import BackToHomeButton from './components/BackToHomeButton';

// // Public Pages
// import Home from './Pages/Home';
// import About from './Pages/About';
// import Contact from './Pages/Contact';
// import LoginPage from './Pages/LoginPage';
// import RegisterPage from './Pages/RegisterPage';
// import PrivacyPolicyPage from './Pages/PrivacyPolicyPage';
// import TermsOfServicePage from './Pages/TermsOfServicePage';
// import RewardsInfoPage from './Pages/RewardsInfoPage';
// import ListVoucher from './Pages/ListVoucher';

// // Routes
// import ProtectedRoutes from './routes/ProtectedRoutes';

// const App = () => {
//   return (
//     <AuthProvider>
//       <WalletProvider> {/* ✅ Correctly wrapping the app */}
//         <VoucherProvider>
//           <Router>
//             <ScrollToTop />
//             <BackToHomeButton />
//             <Navbar />
//               <Routes>
//                 {/* Public Routes */}
//                 <Route path="/" element={<Home />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/register" element={<RegisterPage />} />
//                 <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
//                 <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                
//                 <Route path="/rewards-info" element={<RewardsInfoPage />} />
//                 <Route path="/list-voucher" element={<ListVoucher />} />
                

//                 {/* Protected Routes */}
//                 <Route path="/*" element={<ProtectedRoutes />} />
//               </Routes>
            
//             <Footer />
//           </Router>
//         </VoucherProvider>
//       </WalletProvider>
//      </AuthProvider>
//   );
// };

// export default App;



// import { Routes, Route } from "react-router-dom";

// import { WalletProvider }  from "./Contexts/WalletContext";
// import { VoucherProvider } from "./Contexts/VoucherContext";

// // Layout
// import Navbar           from "./Components/Navbar";
// import Footer           from "./Components/Footer";
// import ScrollToTop      from "./components/ScrollToTop";
// import BackToHomeButton from "./components/BackToHomeButton";

// // Public Pages
// import Home                from "./Pages/Home";
// import About               from "./Pages/About";
// import Contact             from "./Pages/Contact";
// import LoginPage           from "./Pages/LoginPage";
// import RegisterPage        from "./Pages/RegisterPage";
// import PrivacyPolicyPage   from "./Pages/PrivacyPolicyPage";
// import TermsOfServicePage  from "./Pages/TermsOfServicePage";
// import RewardsInfoPage     from "./Pages/RewardsInfoPage";
// import ListVoucher         from "./Pages/ListVoucher";

// // Protected Routes
// import ProtectedRoutes from "./routes/ProtectedRoutes";

// const App = () => (
//   <WalletProvider>
//     <VoucherProvider>
//       <ScrollToTop />
//       <BackToHomeButton />
//       <Navbar />

//       <Routes>
//         {/* Public routes */}
//         <Route index element={<Home />} />                 {/* root ("/") */}
//         <Route path="/about"          element={<About />} />
//         <Route path="/contact"        element={<Contact />} />
//         <Route path="/login"          element={<LoginPage />} />
//         <Route path="/register"       element={<RegisterPage />} />
//         <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
//         <Route path="/terms-of-service" element={<TermsOfServicePage />} />
//         <Route path="/rewards-info"   element={<RewardsInfoPage />} />
//         <Route path="/list-voucher"   element={<ListVoucher />} />

//         {/* Protected routes */}
//         <Route path="/*" element={<ProtectedRoutes />} />
//       </Routes>

//       <Footer />
//     </VoucherProvider>
//   </WalletProvider>
// );

// export default App;





// src/App.jsx
// import React from "react";
import { Routes, Route } from "react-router-dom";   // ← remove BrowserRouter

/* Providers */
import { AuthProvider } from "./Contexts/AuthContext";
import { WalletProvider } from "./Contexts/WalletContext";
import { VoucherProvider } from "./Contexts/VoucherContext";

/* Layout */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BackToHomeButton from "./components/BackToHomeButton";

/* Public pages */
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";
import TermsOfServicePage from "./Pages/TermsOfServicePage";
import RewardsInfoPage from "./Pages/RewardsInfoPage";

/* Protected pages */
import Profile from "./Pages/Profile";
import ListVoucher from "./Pages/ListVoucher";
import Vouchers from "./Pages/Vouchers";
import VoucherDetail from "./Pages/VoucherDetail";
import WalletPage from "./Pages/WalletPage";
import UploadImage from "./Pages/UploadImage";
import PaymentPage from "./Pages/PaymentPage";
import WriteReviewPage from "./Pages/WriteReviewPage";

import ProtectedRoutes from "./routes/ProtectedRoutes";

const App = () => (
  <AuthProvider>
    <WalletProvider>
      <VoucherProvider>
        <ScrollToTop />
        <BackToHomeButton />
        <Navbar />

        <Routes>
          {/* ---------- Public routes ---------- */}
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/rewards-info" element={<RewardsInfoPage />} />

          {/* ---------- Protected routes -------- */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/list-voucher" element={<ListVoucher />} />
            <Route path="/vouchers" element={<Vouchers />} />
            <Route path="/vouchers/:id" element={<VoucherDetail />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/upload" element={<UploadImage />} />
            <Route path="/payment/:voucherId" element={<PaymentPage />} />
            <Route path="/write-review/general" element={<WriteReviewPage />} />
            <Route path="/write-review/:voucherId" element={<WriteReviewPage />} />
          </Route>

          {/* Optional 404
          <Route path="*" element={<NotFound />} /> */}
        </Routes>

        <Footer />
      </VoucherProvider>
    </WalletProvider>
  </AuthProvider>
);

export default App;

