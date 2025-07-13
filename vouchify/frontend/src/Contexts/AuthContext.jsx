// /* eslint-disable react-refresh/only-export-components */
// import { createContext, useContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import {
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
//   signOut,
// } from "firebase/auth";
// import { auth } from "../lib/firebase";          // adjust path if needed

// /* ─── Context ─────────────────────────── */
// const AuthContext = createContext(null);

// /* ─── Provider ────────────────────────── */
// function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [idToken, setIdToken] = useState(null);

//   /* Listen for auth changes */
//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (fbUser) => {
//       setUser(fbUser);
//       setIdToken(fbUser ? await fbUser.getIdToken(true) : null);
//     });
//     return () => unsub();
//   }, []);

//   /* ---------- helpers ---------- */
//   const login = (email, password) =>
//     signInWithEmailAndPassword(auth, email, password);

//   const loginWithGoogle = () => {
//     const provider = new GoogleAuthProvider();
//     return signInWithPopup(auth, provider);
//   };

//   const logout = () => signOut(auth);

//   /* ---------- value ---------- */
//   const value = {
//     user,
//     idToken,
//     isLoggedIn: !!user,
//     login,
//     loginWithGoogle,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// AuthProvider.propTypes = { children: PropTypes.node.isRequired };

// /* ─── Hook ───────────────────────────── */
// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
//   return ctx;
// };

// export default AuthProvider;

/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  memo,
} from "react";
import PropTypes from "prop-types";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase"; // ← adjust if firebase lives elsewhere

/* ------------------------------------------------------------------ */
/* Context                                                            */
/* ------------------------------------------------------------------ */
export const AuthContext = createContext(null);

/* ------------------------------------------------------------------ */
/* Provider                                                           */
/* ------------------------------------------------------------------ */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Skip listener if auth is undefined (e.g. SSR mis‑match)
    if (!auth) return;

    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setUser(fbUser);
      setIdToken(fbUser ? await fbUser.getIdToken(true) : null);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  /* --------- helpers --------- */
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () =>
    signInWithPopup(auth, new GoogleAuthProvider());

  const logout = () => signOut(auth);

  /* --------- memoised value --------- */
  const value = {
    user,
    idToken,
    isLoggedIn: !!user,
    loading,
    login,
    loginWithGoogle,
    logout,
  };

  /* --------- splash while loading --------- */
  if (loading) {
    return (
      <div className="min-h-screen grid place-content-center text-lg">
        Loading…
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/* ------------------------------------------------------------------ */
/* Hook                                                               */
/* ------------------------------------------------------------------ */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

/* ------------------------------------------------------------------ */
/* Default export for convenience                                     */
/* ------------------------------------------------------------------ */
export default memo(AuthProvider);
