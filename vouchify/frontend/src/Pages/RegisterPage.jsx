 
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserPlusIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  UserIcon as UserOutlineIcon,
} from "@heroicons/react/24/outline";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* handle field change */
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  /* handle submit */
  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess("");

    const { name, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      // Optional: save displayName
      if (name) await updateProfile(cred.user, { displayName: name });

      setSuccess("Registration successful! Redirecting to login…");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("That e‑mail is already in use.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid e‑mail address.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak (min 6 characters).");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  /* ------------- JSX ------------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-100 to-gray-200 py-12 px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <UserPlusIcon className="mx-auto h-12 w-auto text-indigo-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {error && (
          <div className="flex items-center p-3 bg-red-50 text-red-700 rounded border border-red-200">
            <ExclamationCircleIcon className="h-5 w-5 mr-2" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="flex items-center p-3 bg-green-50 text-green-700 rounded border border-green-200">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            <p className="text-sm">{success}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="relative">
            <UserOutlineIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md border px-10 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border px-10 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <LockClosedIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password (min 6 chars)"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-md border px-10 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <LockClosedIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-md border px-10 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Registering…" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
