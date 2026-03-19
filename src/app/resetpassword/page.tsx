"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const onResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/user/resetpassword", { 
        token, 
        newPassword 
      });
      toast.success(response.data.message);
      setSuccess(true);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Reset Password</h1>
        
        {!success ? (
          <>
            <p className="mb-6 text-gray-500 dark:text-gray-400 text-center max-w-sm text-sm">Enter your new password below.</p>
            
            <div className="w-full flex flex-col gap-1 mb-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300" htmlFor="newPassword">New Password</label>
              <input
                className="p-3 border border-gray-300 dark:border-zinc-700 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white transition"
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            
            <div className="w-full flex flex-col gap-1 mb-6">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300" htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="p-3 border border-gray-300 dark:border-zinc-700 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white transition"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            
            <button
              onClick={onResetPassword}
              disabled={newPassword.length === 0 || confirmPassword.length === 0 || loading || !token}
              className="w-full p-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition mb-6"
            >
              {loading ? "Processing..." : "Reset Password"}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center w-full mb-6">
            <p className="p-4 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg mb-6 text-center w-full text-sm font-medium border border-green-200 dark:border-green-800">
              Your password has been successfully reset!
            </p>
            <Link href="/login" className="w-full text-center p-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              Proceed to Login
            </Link>
          </div>
        )}
        
        {!success && (
          <div className="flex flex-col gap-3 items-center w-full pt-4 border-t border-gray-200 dark:border-zinc-800 text-sm">
            <Link href="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Return to Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}
