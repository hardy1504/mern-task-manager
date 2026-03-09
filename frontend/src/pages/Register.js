// import React,{useState} from "react";
// import API from "../services/api";
// import {Link,useNavigate} from "react-router-dom";

// function Register(){

//  const navigate = useNavigate();

//  const [name,setName] = useState("");
//  const [email,setEmail] = useState("");
//  const [password,setPassword] = useState("");

//  const handleSubmit = async(e)=>{

//   e.preventDefault();

//   await API.post("/auth/register",{
//    name,
//    email,
//    password
//   });

//   navigate("/");
//  };

//  return(

//  <div>

//  <h2>Register</h2>

//  <form onSubmit={handleSubmit}>

//  <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />

//  <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />

//  <input
//  type="password"
//  placeholder="Password"
//  onChange={(e)=>setPassword(e.target.value)}
//  />

//  <button type="submit">Register</button>

//  </form>

//  <p>
//  Already have account?
//  <Link to="/"> Login</Link>
//  </p>

//  </div>

//  );
// }

// export default Register;

import React, { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .rp-root {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif;
    background: #f0f4f8;
    padding: 24px;
    position: relative; overflow: hidden;
  }
  .rp-root::before {
    content: '';
    position: fixed; top: -200px; right: -200px;
    width: 580px; height: 580px; border-radius: 50%;
    background: radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 65%);
    pointer-events: none;
  }
  .rp-root::after {
    content: '';
    position: fixed; bottom: -160px; left: -160px;
    width: 420px; height: 420px; border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%);
    pointer-events: none;
  }

  .rp-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 16px; padding: 40px;
    width: 100%; max-width: 440px;
    box-shadow: 0 8px 32px rgba(10,15,30,0.07);
    animation: riseIn 0.45s cubic-bezier(.22,1,.36,1) both;
    position: relative; z-index: 1;
  }
  @keyframes riseIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .rp-top {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 26px;
  }
  .rp-logo { display: flex; align-items: center; gap: 8px; }
  .rp-logo-box {
    width: 32px; height: 32px; border-radius: 8px;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    display: flex; align-items: center; justify-content: center;
  }
  .rp-logo-name { font-size: 15px; font-weight: 700; color: #0a0f1e; letter-spacing: -0.3px; }
  .rp-login-link { font-size: 12.5px; color: #8492a6; }
  .rp-login-link a { color: #3b82f6; font-weight: 500; text-decoration: none; }
  .rp-login-link a:hover { text-decoration: underline; }

  .rp-head { margin-bottom: 22px; }
  .rp-head h1 { font-size: 21px; font-weight: 700; color: #0a0f1e; letter-spacing: -0.4px; margin-bottom: 4px; }
  .rp-head p { font-size: 13px; color: #8492a6; }

  .rp-field { margin-bottom: 14px; }
  .rp-label { display: block; font-size: 12px; font-weight: 500; color: #3d4a5c; margin-bottom: 5px; }
  .rp-input {
    width: 100%; padding: 9px 13px;
    border: 1.5px solid #e2e8f0; border-radius: 8px;
    font-size: 13.5px; font-family: 'Sora', sans-serif;
    color: #0a0f1e; background: #fff;
    outline: none; transition: border-color .15s, box-shadow .15s;
  }
  .rp-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
  .rp-input::placeholder { color: #b0bac6; }

  .rp-btn {
    width: 100%; padding: 11px; margin-top: 6px;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    color: #fff; border: none; border-radius: 8px;
    font-size: 14px; font-weight: 600; font-family: 'Sora', sans-serif;
    cursor: pointer; letter-spacing: 0.1px;
    transition: opacity .15s, transform .12s, box-shadow .15s;
    box-shadow: 0 4px 14px rgba(59,130,246,0.32);
  }
  .rp-btn:hover { opacity: 0.91; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(59,130,246,0.38); }
  .rp-btn:active { transform: translateY(0); }

  .rp-perks {
    display: flex; gap: 14px; margin-top: 18px;
    padding-top: 18px; border-top: 1px solid #f0f4f8;
  }
  .rp-perk { display: flex; align-items: center; gap: 5px; font-size: 11.5px; color: #8492a6; }
  .rp-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; flex-shrink: 0; }

  @media (max-width: 480px) {
    .rp-card { padding: 28px 22px; }
  }
`;

function Register() {
  // ── CORE LOGIC UNTOUCHED ──
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", { name, email, password });
    navigate("/");
  };
  // ─────────────────────────

  return (
    <>
      <style>{styles}</style>
      <div className="rp-root">
        <div className="rp-card">
          <div className="rp-top">
            <div className="rp-logo">
              <div className="rp-logo-box">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
              </div>
              <span className="rp-logo-name">TaskFlow</span>
            </div>
            <div className="rp-login-link">
              Have an account? <Link to="/">Sign in</Link>
            </div>
          </div>

          <div className="rp-head">
            <h1>Create your account</h1>
            <p>Free forever for individuals. No credit card needed.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="rp-field">
              <label className="rp-label">Full name</label>
              <input
                className="rp-input"
                placeholder="Jane Smith"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="rp-field">
              <label className="rp-label">Email address</label>
              <input
                className="rp-input"
                placeholder="jane@company.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="rp-field">
              <label className="rp-label">Password</label>
              <input
                className="rp-input"
                type="password"
                placeholder="Min. 8 characters"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="rp-btn" type="submit">
              Create free account
            </button>
          </form>

          <div className="rp-perks">
            <div className="rp-perk">
              <div className="rp-dot" /> Free plan
            </div>
            <div className="rp-perk">
              <div className="rp-dot" /> No credit card
            </div>
            <div className="rp-perk">
              <div className="rp-dot" /> Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
