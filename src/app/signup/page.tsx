"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import {toast} from "react-hot-toast"

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/signup", user);
      router.push("/login");
       
    } catch (error:any) {
        toast.error(error.response?.data?.error || error.message)
    } finally {
      setLoading(false)
    }
   };
  
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">{ loading ? "Processing..." : "Create an Account"}</h1>
        
        <div className="w-full flex flex-col gap-1 mb-4">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300" htmlFor="username">Username</label>
          <input
            className="p-3 border border-gray-300 dark:border-zinc-700 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white transition"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="johndoe"
          />
        </div>

        <div className="w-full flex flex-col gap-1 mb-4">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300" htmlFor="email">Email address</label>
          <input
            className="p-3 border border-gray-300 dark:border-zinc-700 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white transition"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="john@example.com"
          />
        </div>

        <div className="w-full flex flex-col gap-1 mb-6">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300" htmlFor="password">Password</label>
          <input
            className="p-3 border border-gray-300 dark:border-zinc-700 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white transition"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={onSignup}
          disabled={buttonDisabled || loading}
          className="w-full p-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition mb-6"
        >
          {loading ? "Processing..." : "Sign Up"}
        </button>
        
        <div className="flex flex-col gap-3 items-center w-full pt-4 border-t border-gray-200 dark:border-zinc-800 text-sm">
          <div className="text-gray-500 dark:text-gray-400">
            Already have an account? <Link href="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
