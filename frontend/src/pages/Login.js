// import React,{useState} from "react";
// import API from "../services/api";
// import { useNavigate, Link } from "react-router-dom";

// function Login(){

//  const navigate = useNavigate();

//  const [email,setEmail] = useState("");
//  const [password,setPassword] = useState("");

// const handleLogin = async(e)=>{

//  e.preventDefault();

//  const res = await API.post("/auth/login",{
//   email,
//   password
//  });

//  console.log(res.data);   // add this

//  localStorage.setItem("token",res.data.token);

//  navigate("/dashboard");
// };

//  return(

//  <div>

//  <h2>Login</h2>

//  <form onSubmit={handleLogin}>

//  <input
//  placeholder="Email"
//  onChange={(e)=>setEmail(e.target.value)}
//  />

//  <input
//  placeholder="Password"
//  type="password"
//  onChange={(e)=>setPassword(e.target.value)}
//  />

//  <button type="submit">Login</button>

//  </form>

//  <p>
//  Don't have an account?
//  <Link to="/register"> Register</Link>
//  </p>

//  </div>

//  );
// }

// export default Login;

// import React, { useState } from "react";
// import API from "../services/api";
// import { useNavigate, Link } from "react-router-dom";

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   .lp-root {
//     min-height: 100vh;
//     display: grid;
//     grid-template-columns: 1.1fr 1fr;
//     font-family: 'Sora', sans-serif;
//     background: #fff;
//   }

//   .lp-left {
//     background: #0a0f1e;
//     padding: 48px 52px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     position: relative;
//     overflow: hidden;
//   }
//   .lp-left::before {
//     content: '';
//     position: absolute;
//     width: 520px; height: 520px; border-radius: 50%;
//     background: radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 68%);
//     top: -160px; right: -160px; pointer-events: none;
//   }
//   .lp-left::after {
//     content: '';
//     position: absolute;
//     width: 340px; height: 340px; border-radius: 50%;
//     background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 68%);
//     bottom: -100px; left: -80px; pointer-events: none;
//   }

//   .lp-logo { display: flex; align-items: center; gap: 10px; z-index: 1; }
//   .lp-logo-box {
//     width: 38px; height: 38px; border-radius: 10px;
//     background: linear-gradient(135deg, #3b82f6, #6366f1);
//     display: flex; align-items: center; justify-content: center;
//   }
//   .lp-logo-name { font-size: 18px; font-weight: 700; color: #fff; letter-spacing: -0.4px; }

//   .lp-hero { z-index: 1; }
//   .lp-hero h2 {
//     font-size: 38px; font-weight: 700; color: #fff;
//     line-height: 1.18; letter-spacing: -0.8px; margin-bottom: 14px;
//   }
//   .lp-hero h2 span { color: #60a5fa; }
//   .lp-hero p { font-size: 14px; color: rgba(255,255,255,0.42); line-height: 1.7; max-width: 300px; }

//   .lp-cards { display: flex; gap: 12px; z-index: 1; }
//   .lp-card {
//     flex: 1;
//     background: rgba(255,255,255,0.05);
//     border: 1px solid rgba(255,255,255,0.08);
//     border-radius: 12px; padding: 16px;
//   }
//   .lp-card-num { font-size: 20px; font-weight: 700; color: #fff; letter-spacing: -0.5px; margin-bottom: 3px; }
//   .lp-card-label { font-size: 11px; color: rgba(255,255,255,0.32); text-transform: uppercase; letter-spacing: 0.6px; }

//   .lp-right {
//     display: flex; align-items: center; justify-content: center;
//     padding: 48px 52px; background: #fafbfc;
//   }

//   .lp-form-wrap {
//     width: 100%; max-width: 360px;
//     animation: riseIn 0.5s cubic-bezier(.22,1,.36,1) both;
//   }
//   @keyframes riseIn {
//     from { opacity: 0; transform: translateY(18px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   .lp-form-head { margin-bottom: 28px; }
//   .lp-form-head h1 { font-size: 24px; font-weight: 700; color: #0a0f1e; letter-spacing: -0.5px; margin-bottom: 5px; }
//   .lp-form-head p { font-size: 13.5px; color: #8492a6; }
//   .lp-form-head p a { color: #3b82f6; font-weight: 500; text-decoration: none; }
//   .lp-form-head p a:hover { text-decoration: underline; }

//   .lp-field { margin-bottom: 15px; }
//   .lp-label { display: block; font-size: 12.5px; font-weight: 500; color: #3d4a5c; margin-bottom: 5px; }
//   .lp-input {
//     width: 100%; padding: 10px 13px;
//     border: 1.5px solid #e2e8f0; border-radius: 8px;
//     font-size: 13.5px; font-family: 'Sora', sans-serif;
//     color: #0a0f1e; background: #fff;
//     outline: none; transition: border-color .15s, box-shadow .15s;
//   }
//   .lp-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
//   .lp-input::placeholder { color: #b0bac6; }

//   .lp-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
//   .lp-check { display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: #6b7a90; cursor: pointer; }
//   .lp-check input { accent-color: #3b82f6; }
//   .lp-forgot { font-size: 12.5px; color: #3b82f6; font-weight: 500; text-decoration: none; }
//   .lp-forgot:hover { text-decoration: underline; }

//   .lp-btn {
//     width: 100%; padding: 11px;
//     background: linear-gradient(135deg, #3b82f6, #6366f1);
//     color: #fff; border: none; border-radius: 8px;
//     font-size: 14px; font-weight: 600; font-family: 'Sora', sans-serif;
//     cursor: pointer; letter-spacing: 0.1px;
//     transition: opacity .15s, transform .12s, box-shadow .15s;
//     box-shadow: 0 4px 14px rgba(59,130,246,0.35);
//   }
//   .lp-btn:hover { opacity: 0.92; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(59,130,246,0.4); }
//   .lp-btn:active { transform: translateY(0); }

//   @media (max-width: 768px) {
//     .lp-root { grid-template-columns: 1fr; }
//     .lp-left { display: none; }
//     .lp-right { padding: 32px 24px; background: #fff; }
//   }
// `;

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const res = await API.post("/auth/login", { email, password });
//     console.log(res.data);
//     localStorage.setItem("token", res.data.token);
//     navigate("/dashboard");
//   };

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="lp-root">
//         <div className="lp-left">
//           <div className="lp-logo">
//             <div className="lp-logo-box">
//               <svg
//                 width="18"
//                 height="18"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="#fff"
//                 strokeWidth="2.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M9 11l3 3L22 4" />
//                 <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
//               </svg>
//             </div>
//             <span className="lp-logo-name">Taskify</span>
//           </div>

//           <div className="lp-hero">
//             <h2>
//               Manage tasks.
//               <br />
//               <span>Ship faster.</span>
//             </h2>
//             <p>
//               The enterprise workspace built for teams that move fast and stay
//               organised.
//             </p>
//           </div>

//           <div className="lp-cards">
//             <div className="lp-card">
//               <div className="lp-card-num">Free</div>
//               <div className="lp-card-label">Todoist</div>
//             </div>
//             <div className="lp-card">
//               <div className="lp-card-num">99.9%</div>
//               <div className="lp-card-label">Uptime</div>
//             </div>
//             <div className="lp-card">
//               <div className="lp-card-num">4.9 ★</div>
//               <div className="lp-card-label">Rating</div>
//             </div>
//           </div>
//         </div>

//         <div className="lp-right">
//           <div className="lp-form-wrap">
//             <div className="lp-form-head">
//               <h1>Welcome back</h1>
//               <p>
//                 No account? <Link to="/register">Sign up free</Link>
//               </p>
//             </div>

//             <form onSubmit={handleLogin}>
//               <div className="lp-field">
//                 <label className="lp-label">Email address</label>
//                 <input
//                   className="lp-input"
//                   type="email"
//                   placeholder="you@company.com"
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div className="lp-field">
//                 <label className="lp-label">Password</label>
//                 <input
//                   className="lp-input"
//                   type="password"
//                   placeholder="••••••••"
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//               <div className="lp-row">
//                 <label className="lp-check">
//                   <input type="checkbox" /> Remember me
//                 </label>
//                 <a href="#" className="lp-forgot">
//                   Forgot password?
//                 </a>
//               </div>
//               <button className="lp-btn" type="submit">
//                 Sign in
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lp-root {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    font-family: 'Sora', sans-serif;
    background: #fff;
  }

  .lp-left {
    background: #0a0f1e;
    padding: 48px 52px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }
  .lp-left::before {
    content: '';
    position: absolute;
    width: 520px; height: 520px; border-radius: 50%;
    background: radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 68%);
    top: -160px; right: -160px; pointer-events: none;
  }
  .lp-left::after {
    content: '';
    position: absolute;
    width: 340px; height: 340px; border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 68%);
    bottom: -100px; left: -80px; pointer-events: none;
  }

  .lp-logo { display: flex; align-items: center; gap: 10px; z-index: 1; }
  .lp-logo-box {
    width: 38px; height: 38px; border-radius: 10px;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    display: flex; align-items: center; justify-content: center;
  }
  .lp-logo-name { font-size: 18px; font-weight: 700; color: #fff; letter-spacing: -0.4px; }

  .lp-hero { z-index: 1; }
  .lp-hero h2 {
    font-size: 38px; font-weight: 700; color: #fff;
    line-height: 1.18; letter-spacing: -0.8px; margin-bottom: 14px;
  }
  .lp-hero h2 span { color: #60a5fa; }
  .lp-hero p { font-size: 14px; color: rgba(255,255,255,0.42); line-height: 1.7; max-width: 300px; }

  .lp-cards { display: flex; gap: 12px; z-index: 1; }
  .lp-card {
    flex: 1;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px; padding: 16px;
  }
  .lp-card-num { font-size: 20px; font-weight: 700; color: #fff; letter-spacing: -0.5px; margin-bottom: 3px; }
  .lp-card-label { font-size: 11px; color: rgba(255,255,255,0.32); text-transform: uppercase; letter-spacing: 0.6px; }

  .lp-right {
    display: flex; align-items: center; justify-content: center;
    padding: 48px 52px; background: #fafbfc;
  }

  .lp-form-wrap {
    width: 100%; max-width: 360px;
    animation: riseIn 0.5s cubic-bezier(.22,1,.36,1) both;
  }
  @keyframes riseIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .lp-form-head { margin-bottom: 28px; }
  .lp-form-head h1 { font-size: 24px; font-weight: 700; color: #0a0f1e; letter-spacing: -0.5px; margin-bottom: 5px; }
  .lp-form-head p { font-size: 13.5px; color: #8492a6; }
  .lp-form-head p a { color: #3b82f6; font-weight: 500; text-decoration: none; }
  .lp-form-head p a:hover { text-decoration: underline; }

  .lp-field { margin-bottom: 15px; }
  .lp-label { display: block; font-size: 12.5px; font-weight: 500; color: #3d4a5c; margin-bottom: 5px; }
  .lp-input {
    width: 100%; padding: 10px 13px;
    border: 1.5px solid #e2e8f0; border-radius: 8px;
    font-size: 13.5px; font-family: 'Sora', sans-serif;
    color: #0a0f1e; background: #fff;
    outline: none; transition: border-color .15s, box-shadow .15s;
  }
  .lp-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
  .lp-input::placeholder { color: #b0bac6; }

  .lp-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .lp-check { display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: #6b7a90; cursor: pointer; }
  .lp-check input { accent-color: #3b82f6; }
  .lp-forgot {
    font-size: 12.5px; color: #3b82f6; font-weight: 500;
    text-decoration: none; background: none; border: none;
    cursor: pointer; padding: 0; font-family: 'Sora', sans-serif;
  }
  .lp-forgot:hover { text-decoration: underline; }

  .lp-btn {
    width: 100%; padding: 11px;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    color: #fff; border: none; border-radius: 8px;
    font-size: 14px; font-weight: 600; font-family: 'Sora', sans-serif;
    cursor: pointer; letter-spacing: 0.1px;
    transition: opacity .15s, transform .12s, box-shadow .15s;
    box-shadow: 0 4px 14px rgba(59,130,246,0.35);
  }
  .lp-btn:hover { opacity: 0.92; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(59,130,246,0.4); }
  .lp-btn:active { transform: translateY(0); }

  @media (max-width: 768px) {
    .lp-root { grid-template-columns: 1fr; }
    .lp-left { display: none; }
    .lp-right { padding: 32px 24px; background: #fff; }
  }
`;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", { email, password });
    console.log(res.data);
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="lp-root">
        <div className="lp-left">
          <div className="lp-logo">
            <div className="lp-logo-box">
              <svg
                width="18"
                height="18"
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
            <span className="lp-logo-name">Taskify</span>
          </div>

          <div className="lp-hero">
            <h2>
              Manage tasks.
              <br />
              <span>Ship faster.</span>
            </h2>
            <p>
              The enterprise workspace built for teams that move fast and stay
              organised.
            </p>
          </div>

          <div className="lp-cards">
            <div className="lp-card">
              <div className="lp-card-num">Free</div>
              <div className="lp-card-label">Todoist</div>
            </div>
            <div className="lp-card">
              <div className="lp-card-num">99.9%</div>
              <div className="lp-card-label">Uptime</div>
            </div>
            <div className="lp-card">
              <div className="lp-card-num">4.9 ★</div>
              <div className="lp-card-label">Rating</div>
            </div>
          </div>
        </div>

        <div className="lp-right">
          <div className="lp-form-wrap">
            <div className="lp-form-head">
              <h1>Welcome back</h1>
              <p>
                No account? <Link to="/register">Sign up free</Link>
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="lp-field">
                <label className="lp-label">Email address</label>
                <input
                  className="lp-input"
                  type="email"
                  placeholder="you@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="lp-field">
                <label className="lp-label">Password</label>
                <input
                  className="lp-input"
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="lp-row">
                <label className="lp-check">
                  <input type="checkbox" /> Remember me
                </label>
                {/* ✅ Fixed: changed <a href="#"> to <button> to pass ESLint */}
                <button type="button" className="lp-forgot">
                  Forgot password?
                </button>
              </div>
              <button className="lp-btn" type="submit">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;