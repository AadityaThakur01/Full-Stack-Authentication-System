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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{ loading ? "Processing" : "SignUp"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 foucs:outline-none focus:border-gray-600 "
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 foucs:outline-none focus:border-gray-600 "
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 foucs:outline-none focus:border-gray-600 "
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onSignup}
        className="p-2 border border-gray-500 rounded-lg mb-4 foucs:outline-none focus:border-gray-600 "
      >
        {buttonDisabled ? "No signup" : loading ? "Processing" : "Signup"}
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  );
}
