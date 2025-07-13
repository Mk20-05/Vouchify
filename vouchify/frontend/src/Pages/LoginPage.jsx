// src/Pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  ArrowLeftOnRectangleIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../Contexts/AuthContext";  // ← fixed path
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const { login, loginWithGoogle } = useAuth();
  const navigate   = useNavigate();
  const location   = useLocation();
  const redirectTo = location.state?.from?.pathname || "/profile";  // default

  /* ---------- email / password ---------- */
  async function handleEmailLogin(e) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await login(email, password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.message.replace("Firebase:", "").trim());
    } finally {
      setLoading(false);
    }
  }

  /* ---------- Google popup ---------- */
  async function handleGoogleLogin() {
    setLoading(true); setError("");
    try {
      await loginWithGoogle();
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.message.replace("Firebase:", "").trim());
    } finally {
      setLoading(false);
    }
  }

  /* ---------- JSX ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <ArrowLeftOnRectangleIcon className="mx-auto h-12 w-auto text-indigo-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        {/* ---------- GOOGLE BUTTON ---------- */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 py-2 hover:bg-gray-50 disabled:opacity-50"
        >
          <FcGoogle className="h-5 w-5" />
          <span>{loading ? "Please wait…" : "Sign in with Google"}</span>
        </button>

        <hr className="border-t border-gray-200" />

        {/* ---------- EMAIL / PASSWORD ---------- */}
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-10 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="relative">
            <LockClosedIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-10 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
