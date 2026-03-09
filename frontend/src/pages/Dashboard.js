// import React, { useEffect, useState } from "react";
// import API from "../services/api.js";
// import { useNavigate } from "react-router-dom";
// function Dashboard() {
//   const [tasks, setTasks] = useState([]);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [priority, setPriority] = useState("Low");
//   const [dueDate, setDueDate] = useState("");

//   const [editId, setEditId] = useState(null);
//   const [editTitle, setEditTitle] = useState("");
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");

//     navigate("/");
//   };

//   const fetchTasks = async () => {
//     try {
//       const res = await API.get("/tasks");

//       setTasks(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const createTask = async (e) => {
//     e.preventDefault();

//     try {
//       await API.post("/tasks", {
//         title,
//         description,
//         priority,
//         dueDate,
//       });

//       setTitle("");
//       setDescription("");
//       setPriority("Low");
//       setDueDate("");

//       fetchTasks();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       await API.delete(`/tasks/${id}`);

//       fetchTasks();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const startEdit = (task) => {
//     setEditId(task._id);

//     setEditTitle(task.title);
//   };

//   const updateTask = async (id) => {
//     try {
//       await API.put(`/tasks/${id}`, {
//         title: editTitle,
//       });

//       setEditId(null);

//       fetchTasks();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const toggleComplete = async (task) => {
//     try {
//       await API.put(`/tasks/${task._id}`, {
//         completed: !task.completed,
//       });

//       fetchTasks();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div style={{ padding: "30px" }}>
//       <h1>Task Manager Dashboard</h1>
//       <button onClick={logout}>Logout</button>
//       <h3>Create Task</h3>

//       <form onSubmit={createTask}>
//         <input
//           placeholder="Task title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <br />
//         <br />

//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <br />
//         <br />

//         <select value={priority} onChange={(e) => setPriority(e.target.value)}>
//           <option>Low</option>
//           <option>Medium</option>
//           <option>High</option>
//         </select>

//         <br />
//         <br />

//         <input
//           type="date"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//         />

//         <br />
//         <br />

//         <button type="submit">Add Task</button>
//       </form>

//       <hr />

//       <h3>Your Tasks</h3>

//       {tasks.length === 0 ? (
//         <p>No tasks yet</p>
//       ) : (
//         tasks.map((task) => (
//           <div
//             key={task._id}
//             style={{
//               border: "1px solid #ccc",
//               padding: "15px",
//               marginBottom: "10px",
//             }}
//           >
//             <input
//               type="checkbox"
//               checked={task.completed}
//               onChange={() => toggleComplete(task)}
//             />

//             {editId === task._id ? (
//               <div>
//                 <input
//                   value={editTitle}
//                   onChange={(e) => setEditTitle(e.target.value)}
//                 />

//                 <button onClick={() => updateTask(task._id)}>Save</button>

//                 <button onClick={() => setEditId(null)}>Cancel</button>
//               </div>
//             ) : (
//               <div>
//                 <h4
//                   style={{
//                     textDecoration: task.completed ? "line-through" : "none",
//                   }}
//                 >
//                   {task.title}
//                 </h4>

//                 <p>{task.description}</p>

//                 <p>Priority: {task.priority}</p>

//                 <p>
//                   Due:{" "}
//                   {task.dueDate ? task.dueDate.substring(0, 10) : "No date"}
//                 </p>

//                 <button onClick={() => startEdit(task)}>Edit</button>

//                 <button onClick={() => deleteTask(task._id)}>Delete</button>
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Dashboard;

import React, { useEffect, useState } from "react";
import API from "../services/api.js";
import { useNavigate } from "react-router-dom";
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0a0f1e;
    --ink-soft: #3d4a5c;
    --ink-muted: #8492a6;
    --surface: #fff;
    --surface-2: #f7f9fc;
    --surface-3: #eef2f7;
    --border: #e2e8f0;
    --blue: #3b82f6;
    --blue-dark: #2563eb;
    --indigo: #6366f1;
    --green: #22c55e;
    --green-bg: #f0fdf4;
    --red: #ef4444;
    --red-bg: #fef2f2;
    --amber: #f59e0b;
    --amber-bg: #fffbeb;
    --sidebar-w: 220px;
  }

  body { font-family: 'Sora', sans-serif; }

  .db-root { display: flex; min-height: 100vh; background: var(--surface-2); color: var(--ink); }

  /* ── Sidebar ── */
  .db-sidebar {
    width: var(--sidebar-w); flex-shrink: 0;
    background: #0a0f1e;
    display: flex; flex-direction: column;
    padding: 20px 0;
    position: sticky; top: 0; height: 100vh;
    overflow-y: auto;
  }

  .db-sidebar-logo {
    display: flex; align-items: center; gap: 9px;
    padding: 0 18px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    margin-bottom: 14px;
  }
  .db-logo-box {
    width: 30px; height: 30px; border-radius: 7px;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .db-logo-name { font-size: 15px; font-weight: 700; color: #fff; letter-spacing: -0.3px; }

  .db-nav-section { padding: 0 10px; margin-bottom: 6px; }
  .db-nav-label {
    font-size: 9.5px; font-weight: 600; color: rgba(255,255,255,0.22);
    text-transform: uppercase; letter-spacing: 0.9px;
    padding: 6px 8px 4px;
  }
  .db-nav-item {
    display: flex; align-items: center; gap: 9px;
    padding: 8px 10px; border-radius: 7px;
    font-size: 13px; color: rgba(255,255,255,0.45);
    cursor: pointer; transition: all .14s; margin-bottom: 1px;
    border: none; background: transparent; width: 100%; text-align: left;
    font-family: 'Sora', sans-serif;
  }
  .db-nav-item:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.82); }
  .db-nav-item.active { background: rgba(59,130,246,0.18); color: #fff; }
  .db-nav-item svg { width: 14px; height: 14px; flex-shrink: 0; }

  .db-sidebar-foot {
    margin-top: auto; padding: 12px 10px 0;
    border-top: 1px solid rgba(255,255,255,0.07);
    position: relative;
  }
  .db-user {
    display: flex; align-items: center; gap: 9px;
    padding: 8px 10px; border-radius: 7px;
    cursor: pointer; transition: background .14s;
    border: none; background: transparent; width: 100%; text-align: left;
  }
  .db-user:hover { background: rgba(255,255,255,0.06); }
  .db-avatar {
    width: 28px; height: 28px; border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0;
  }
  .db-user-name { font-size: 12.5px; font-weight: 500; color: #fff; }
  .db-user-plan { font-size: 11px; color: rgba(255,255,255,0.3); }
  .db-user-chevron { margin-left: auto; color: rgba(255,255,255,0.25); transition: transform .2s; }
  .db-user-chevron.open { transform: rotate(180deg); }

  /* Email dropdown popup */
  .db-user-popup {
    position: absolute; bottom: calc(100% + 8px); left: 10px; right: 10px;
    background: #1a2035;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 14px;
    box-shadow: 0 8px 28px rgba(0,0,0,0.4);
    animation: popUp .18s cubic-bezier(.22,1,.36,1) both;
    z-index: 50;
  }
  @keyframes popUp {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .db-popup-top {
    display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
  }
  .db-popup-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; font-weight: 700; color: #fff; flex-shrink: 0;
  }
  .db-popup-email {
    font-size: 12px; color: rgba(255,255,255,0.85);
    font-weight: 500; word-break: break-all;
  }
  .db-popup-label {
    font-size: 10px; color: rgba(255,255,255,0.3);
    text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;
  }
  .db-popup-divider {
    height: 1px; background: rgba(255,255,255,0.07); margin: 10px 0;
  }
  .db-popup-plan {
    display: flex; align-items: center; gap: 6px;
    font-size: 11.5px; color: rgba(255,255,255,0.4);
  }
  .db-popup-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #22c55e; flex-shrink: 0;
  }

  /* ── Main ── */
  .db-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }

  .db-topbar {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0 28px; height: 54px;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 10;
  }
  .db-topbar-title { font-size: 15px; font-weight: 600; color: var(--ink); letter-spacing: -0.3px; }
  .db-topbar-sub { font-size: 11.5px; color: var(--ink-muted); }

  .db-logout-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 7px 13px;
    background: transparent; border: 1.5px solid var(--border);
    border-radius: 7px; font-size: 12.5px; font-weight: 500;
    color: var(--ink-soft); font-family: 'Sora', sans-serif;
    cursor: pointer; transition: all .14s;
  }
  .db-logout-btn:hover { border-color: var(--red); color: var(--red); background: var(--red-bg); }

  /* ── Content ── */
  .db-content { padding: 24px 28px; }

  /* Stats */
  .db-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 24px; }
  .db-stat {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 10px; padding: 16px 18px;
    animation: riseIn .4s ease both;
  }
  .db-stat:nth-child(1) { animation-delay:.05s }
  .db-stat:nth-child(2) { animation-delay:.1s }
  .db-stat:nth-child(3) { animation-delay:.15s }
  .db-stat:nth-child(4) { animation-delay:.2s }
  @keyframes riseIn {
    from { opacity:0; transform:translateY(12px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .db-stat-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
  .db-stat-label { font-size:11.5px; color:var(--ink-muted); font-weight:500; }
  .db-stat-icon {
    width:26px; height:26px; border-radius:6px;
    display:flex; align-items:center; justify-content:center;
  }
  .db-stat-num { font-size:22px; font-weight:700; letter-spacing:-0.5px; }
  .db-stat-sub { font-size:11px; color:var(--ink-muted); margin-top:2px; }

  /* Grid */
  .db-grid { display:grid; grid-template-columns:1fr 340px; gap:20px; }

  /* Card */
  .db-card {
    background:var(--surface); border:1px solid var(--border);
    border-radius:12px; overflow:hidden;
    animation: riseIn .4s ease .25s both;
  }
  .db-card-head {
    padding:15px 20px; border-bottom:1px solid var(--border);
    display:flex; align-items:center; justify-content:space-between;
  }
  .db-card-head h3 { font-size:14px; font-weight:600; color:var(--ink); letter-spacing:-0.2px; }
  .db-card-head span { font-size:12px; color:var(--ink-muted); }
  .db-card-body { padding:20px; }

  /* Form */
  .db-field { margin-bottom:14px; }
  .db-label { display:block; font-size:11.5px; font-weight:500; color:var(--ink-soft); margin-bottom:5px; }
  .db-input, .db-select, .db-textarea {
    width:100%; padding:8px 12px;
    border:1.5px solid var(--border); border-radius:8px;
    font-size:13px; font-family:'Sora',sans-serif;
    color:var(--ink); background:var(--surface);
    outline:none; transition:border-color .15s, box-shadow .15s;
  }
  .db-input:focus, .db-select:focus, .db-textarea:focus {
    border-color:var(--blue); box-shadow:0 0 0 3px rgba(59,130,246,0.1);
  }
  .db-input::placeholder, .db-textarea::placeholder { color:#b0bac6; }
  .db-textarea { resize:vertical; min-height:70px; }
  .db-row2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

  .db-add-btn {
    width:100%; padding:9px;
    background:linear-gradient(135deg,#3b82f6,#6366f1);
    color:#fff; border:none; border-radius:8px;
    font-size:13px; font-weight:600; font-family:'Sora',sans-serif;
    cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px;
    transition:opacity .15s, transform .12s, box-shadow .15s;
    box-shadow:0 3px 12px rgba(59,130,246,0.3);
  }
  .db-add-btn:hover { opacity:.91; transform:translateY(-1px); box-shadow:0 5px 18px rgba(59,130,246,0.35); }
  .db-add-btn:active { transform:none; }

  /* Filters */
  .db-filters { display:flex; gap:6px; padding:10px 14px; border-bottom:1px solid var(--border); }
  .db-filter {
    padding:4px 10px; border-radius:99px; font-size:12px; font-weight:500;
    border:1.5px solid transparent; cursor:pointer; transition:all .14s;
    background:transparent; font-family:'Sora',sans-serif; color:var(--ink-muted);
  }
  .db-filter.on { background:rgba(59,130,246,0.08); color:var(--blue); border-color:rgba(59,130,246,0.2); }
  .db-filter:not(.on):hover { background:var(--surface-3); color:var(--ink-soft); }

  /* Task list */
  .db-task-list { padding:8px; max-height:500px; overflow-y:auto; }
  .db-task-list::-webkit-scrollbar { width:3px; }
  .db-task-list::-webkit-scrollbar-thumb { background:var(--border); border-radius:99px; }

  .db-empty { text-align:center; padding:36px 16px; color:var(--ink-muted); font-size:12.5px; }
  .db-empty svg { margin-bottom:8px; opacity:.25; }

  .db-task {
    display:flex; align-items:flex-start; gap:10px;
    padding:11px 10px; border-radius:8px;
    border:1px solid transparent; transition:all .13s; margin-bottom:3px;
  }
  .db-task:hover { background:var(--surface-2); border-color:var(--border); }
  .db-task.done { opacity:.5; }

  .db-check {
    width:16px; height:16px; flex-shrink:0;
    border:1.5px solid var(--border); border-radius:4px; margin-top:2px;
    cursor:pointer; display:flex; align-items:center; justify-content:center;
    transition:all .14s; background:var(--surface);
  }
  .db-check.ticked { background:var(--green); border-color:var(--green); }

  .db-task-body { flex:1; min-width:0; }
  .db-task-title { font-size:13px; font-weight:500; color:var(--ink); margin-bottom:3px; letter-spacing:-.1px; }
  .db-task-title.struck { text-decoration:line-through; color:var(--ink-muted); }
  .db-task-desc { font-size:11.5px; color:var(--ink-muted); margin-bottom:5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .db-task-meta { display:flex; align-items:center; gap:5px; flex-wrap:wrap; }

  .db-badge {
    padding:2px 7px; border-radius:99px; font-size:10.5px; font-weight:500;
  }
  .db-badge-High   { background:var(--red-bg);   color:var(--red);   }
  .db-badge-Medium { background:var(--amber-bg);  color:var(--amber); }
  .db-badge-Low    { background:var(--green-bg);  color:#16a34a;      }
  .db-badge-date   { background:var(--surface-3); color:var(--ink-muted); }

  .db-task-actions { display:flex; gap:3px; flex-shrink:0; }
  .db-icon-btn {
    width:27px; height:27px; border-radius:6px; border:none;
    background:transparent; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    color:var(--ink-muted); transition:all .13s;
  }
  .db-icon-btn:hover { background:var(--surface-3); color:var(--ink); }
  .db-icon-btn.danger:hover { background:var(--red-bg); color:var(--red); }

  .db-edit-row { display:flex; gap:5px; margin-top:5px; }
  .db-edit-input {
    flex:1; padding:5px 9px;
    border:1.5px solid var(--blue); border-radius:6px;
    font-size:12.5px; font-family:'Sora',sans-serif; color:var(--ink); outline:none;
  }
  .db-edit-save {
    padding:5px 10px; background:var(--blue); color:#fff;
    border:none; border-radius:6px; font-size:12px; font-weight:600;
    cursor:pointer; font-family:'Sora',sans-serif;
  }
  .db-edit-cancel {
    padding:5px 9px; background:var(--surface-3); color:var(--ink-soft);
    border:none; border-radius:6px; font-size:12px; cursor:pointer;
    font-family:'Sora',sans-serif;
  }

  @media (max-width:1024px) {
    .db-stats { grid-template-columns:repeat(2,1fr); }
    .db-grid  { grid-template-columns:1fr; }
  }
  @media (max-width:768px) {
    .db-sidebar { display:none; }
    .db-content { padding:16px; }
  }
`;

function Dashboard() {
  // ── CORE LOGIC UNTOUCHED ──
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", { title, description, priority, dueDate });
      setTitle("");
      setDescription("");
      setPriority("Low");
      setDueDate("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
  };

  const updateTask = async (id) => {
    try {
      await API.put(`/tasks/${id}`, { title: editTitle });
      setEditId(null);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, { completed: !task.completed });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  // ─────────────────────────

  // UI-only state
  const [filter, setFilter] = useState("all");
  const [showUserPopup, setShowUserPopup] = useState(false);

  // Decode email from JWT token (UI only)
  const getUserEmail = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.email || payload.Email || null;
    } catch {
      return null;
    }
  };
  const userEmail = getUserEmail();
  const emailInitial = userEmail ? userEmail[0].toUpperCase() : "U";
  const filtered = tasks.filter((t) =>
    filter === "all" ? true : filter === "active" ? !t.completed : t.completed,
  );
  const done = tasks.filter((t) => t.completed).length;
  const high = tasks.filter(
    (t) => t.priority === "High" && !t.completed,
  ).length;
  const overdue = tasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < new Date() && !t.completed,
  ).length;

  return (
    <>
      <style>{styles}</style>
      <div className="db-root">
        {/* Sidebar */}
        <aside className="db-sidebar">
          <div className="db-sidebar-logo">
            <div className="db-logo-box">
              <svg
                width="14"
                height="14"
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
            <span className="db-logo-name">Taskify</span>
          </div>

          <div className="db-nav-section">
            <div className="db-nav-label">Workspace</div>
            {[
              {
                icon: (
                  <>
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </>
                ),
                label: "Dashboard",
                active: true,
              },
            ].map((n) => (
              <button
                key={n.label}
                className={`db-nav-item ${n.active ? "active" : ""}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {n.icon}
                </svg>
                {n.label}
              </button>
            ))}
          </div>

          <div className="db-nav-section" style={{ marginTop: "6px" }}>
            {[].map((n) => (
              <button key={n.label} className="db-nav-item">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {n.icon}
                </svg>
                {n.label}
              </button>
            ))}
          </div>

          <div className="db-sidebar-foot">
            {showUserPopup && (
              <div className="db-user-popup">
                <div className="db-popup-top">
                  <div className="db-popup-avatar">{userEmail}</div>
                  <div>
                    <div className="db-popup-label">Signed in as {} </div>
                    <div className="db-popup-email">
                      {}
                    </div>
                  </div>
                </div>
                <div className="db-popup-divider" />
                <div className="db-popup-plan">
                  <div className="db-popup-dot" />
                  Free plan · Active
                </div>
              </div>
            )}
            <button
              className="db-user"
              onClick={() => setShowUserPopup((p) => !p)}
            >
              <div className="db-avatar">{emailInitial}</div>
              <div>
                <div className="db-user-name">My Workspace</div>
                <div className="db-user-plan">
                  {userEmail ? userEmail.split("@")[0] : "Account"}
                </div>
              </div>
              <svg
                className={`db-user-chevron ${showUserPopup ? "open" : ""}`}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="db-main">
          <div className="db-topbar">
            <div>
              <div className="db-topbar-title">Dashboard</div>
            </div>
            <button className="db-logout-btn" onClick={logout}>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign out
            </button>
          </div>

          <div className="db-content">
            {/* Stats */}
            <div className="db-stats">
              {[
                {
                  label: "Total Tasks",
                  num: tasks.length,
                  sub: `${done} completed`,
                  iconBg: "rgba(59,130,246,0.1)",
                  color: "#3b82f6",
                  path: (
                    <>
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                    </>
                  ),
                },
                {
                  label: "Completed",
                  num: done,
                  sub: `${tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0}% done`,
                  iconBg: "rgba(34,197,94,0.1)",
                  color: "#22c55e",
                  path: (
                    <>
                      <path d="M9 11l3 3L22 4" />
                    </>
                  ),
                },
                {
                  label: "High Priority",
                  num: high,
                  sub: "need attention",
                  iconBg: "rgba(239,68,68,0.1)",
                  color: "#ef4444",
                  path: (
                    <>
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </>
                  ),
                },
                {
                  label: "Overdue",
                  num: overdue,
                  sub: "past due date",
                  iconBg: "rgba(245,158,11,0.1)",
                  color: "#f59e0b",
                  path: (
                    <>
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </>
                  ),
                },
              ].map((s) => (
                <div className="db-stat" key={s.label}>
                  <div className="db-stat-row">
                    <span className="db-stat-label">{s.label}</span>
                    <div
                      className="db-stat-icon"
                      style={{ background: s.iconBg }}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={s.color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {s.path}
                      </svg>
                    </div>
                  </div>
                  <div
                    className="db-stat-num"
                    style={{
                      color:
                        s.num > 0 &&
                        s.label !== "Total Tasks" &&
                        s.label !== "Completed"
                          ? s.color
                          : "var(--ink)",
                    }}
                  >
                    {s.num}
                  </div>
                  <div className="db-stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Main grid */}
            <div className="db-grid">
              {/* Create task */}
              <div className="db-card">
                <div className="db-card-head">
                  <h3>Create Task</h3>
                </div>
                <div className="db-card-body">
                  <form onSubmit={createTask}>
                    <div className="db-field">
                      <label className="db-label">Task title</label>
                      <input
                        className="db-input"
                        placeholder="e.g. Review Q3 report"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="db-field">
                      <label className="db-label">Description</label>
                      <textarea
                        className="db-textarea"
                        placeholder="Add more details…"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="db-row2">
                      <div className="db-field">
                        <label className="db-label">Priority</label>
                        <select
                          className="db-select"
                          value={priority}
                          onChange={(e) => setPriority(e.target.value)}
                        >
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                        </select>
                      </div>
                      <div className="db-field">
                        <label className="db-label">Due date</label>
                        <input
                          className="db-input"
                          type="date"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <button className="db-add-btn" type="submit">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      Add Task
                    </button>
                  </form>
                </div>
              </div>

              {/* Task list */}
              <div className="db-card">
                <div className="db-card-head">
                  <h3>Your Tasks</h3>
                  <span>
                    {filtered.length} task{filtered.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="db-filters">
                  {["all", "active", "done"].map((f) => (
                    <button
                      key={f}
                      className={`db-filter ${filter === f ? "on" : ""}`}
                      onClick={() => setFilter(f)}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="db-task-list">
                  {filtered.length === 0 ? (
                    <div className="db-empty">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ display: "block", margin: "0 auto 8px" }}
                      >
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14,2 14,8 20,8" />
                      </svg>
                      No tasks here yet
                    </div>
                  ) : (
                    filtered.map((task) => (
                      <div
                        key={task._id}
                        className={`db-task ${task.completed ? "done" : ""}`}
                      >
                        <div
                          className={`db-check ${task.completed ? "ticked" : ""}`}
                          onClick={() => toggleComplete(task)}
                        >
                          {task.completed && (
                            <svg
                              width="9"
                              height="9"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#fff"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <div className="db-task-body">
                          {editId === task._id ? (
                            <div className="db-edit-row">
                              <input
                                className="db-edit-input"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                              />
                              <button
                                className="db-edit-save"
                                onClick={() => updateTask(task._id)}
                              >
                                Save
                              </button>
                              <button
                                className="db-edit-cancel"
                                onClick={() => setEditId(null)}
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <>
                              <div
                                className={`db-task-title ${task.completed ? "struck" : ""}`}
                              >
                                {task.title}
                              </div>
                              {task.description && (
                                <div className="db-task-desc">
                                  {task.description}
                                </div>
                              )}
                              <div className="db-task-meta">
                                <span
                                  className={`db-badge db-badge-${task.priority}`}
                                >
                                  {task.priority}
                                </span>
                                {task.dueDate && (
                                  <span className="db-badge db-badge-date">
                                    {task.dueDate.substring(0, 10)}
                                  </span>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                        {editId !== task._id && (
                          <div className="db-task-actions">
                            <button
                              className="db-icon-btn"
                              onClick={() => startEdit(task)}
                              title="Edit"
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </button>
                            <button
                              className="db-icon-btn danger"
                              onClick={() => deleteTask(task._id)}
                              title="Delete"
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                <path d="M10 11v6" />
                                <path d="M14 11v6" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
