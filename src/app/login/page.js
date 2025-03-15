"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: "/reports", // redirect on success
    });
  };

  return (
    <div className="container">
      {/* Logo at the top */}
      <img src="/ExpandMyBrand_Logo.png" alt="ExpandMyBrand" className="logo" />

      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        <button type="submit" className="button">
          Login
        </button>
      </form>

      {/* Note below the form */}
      <p className="note">
        To obtain login details or for lost password, please contact ExpandMyBrand.
      </p>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
          background-color: #f0f0f0;
        }
        .logo {
          max-width: 200px;
          margin-bottom: 40px;
        }
        .form {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 400px;
          gap: 15px;
        }
        .input {
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .button {
          padding: 10px;
          font-size: 16px;
          border: none;
          border-radius: 4px;
          background-color: #0070f3;
          color: #fff;
          cursor: pointer;
        }
        .button:hover {
          background-color: #005bb5;
        }
        .note {
          font-family: Arial, sans-serif;
          margin-top: 20px;
          font-size: 14px;
          color: #555;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
