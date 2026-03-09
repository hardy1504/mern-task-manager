{tasks.map(task => (
  <div key={task._id} style={{
    border:"1px solid #ccc",
    padding:"10px",
    marginBottom:"10px"
  }}>

    <h3>{task.title}</h3>
    <p>{task.description}</p>
    <p>Priority: {task.priority}</p>

    <button onClick={() => deleteTask(task._id)}>
      Delete
    </button>

  </div>
))}