"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onForgotPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/forgotpassword", { email });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">{loading ? "Processing..." : "Forgot Password"}</h1>
        
        <p className="mb-6 text-gray-500 dark:text-gray-400 text-center max-w-sm text-sm">Enter your registered email address and we'll send you a secure link to reset your password.</p>

        <div className="w-full flex flex-col gap-1 mb-6">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300" htmlFor="email">Email address</label>
          <input
            className="p-3 border border-gray-300 dark:border-zinc-700 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white transition"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
          />
        </div>
        
        <button
          onClick={onForgotPassword}
          disabled={email.length === 0 || loading}
          className="w-full p-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition mb-6"
        >
          {loading ? "Processing..." : "Send Reset Link"}
        </button>

        <div className="flex flex-col gap-3 items-center w-full pt-4 border-t border-gray-200 dark:border-zinc-800 text-sm">
          <Link href="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Return to Login</Link>
        </div>
      </div>
    </div>
  );
}
