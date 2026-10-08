import { useState } from 'react'
import './App.css'

function App() {
  const [buf, bufferize] = useState("")
  const [taskObjArr, changeTaskObjArr] = useState([])

  function appendTask() {

    if (buf.trim() === "") return;

    const newTaskObj = {
      id: Date.now(),
      content: buf,
      completionState: false
    }

    changeTaskObjArr([...taskObjArr, newTaskObj])
    bufferize("")
  }

  function removeTask(taskObjID) {
    for (let i = 0; taskObjArr[i].id != taskObjID; i++) {
      if (taskObjArr[i].id === taskObjID) {
        changeTaskObjArr(taskObjArr.filter((taskObj) => taskObj.id != taskObjID))
      }
    }
  }

  function changeCompletionState(taskObjID) {
    changeTaskObjArr(
      taskObjArr.map(task =>
        task.id === taskObjID
          ? { ...task, completionState: !task.completionState }
          : task
      )
    )
  }

  return (
    <main>
      <h1>Todo List</h1>
      <input value={buf} onChange={(e) => bufferize(e.target.value)} placeholder="Enter task contents..."></input>
      <button onClick={appendTask}>Add task</button>

      <ul>
        {taskObjArr.map((task) => (
          <li key={task.id}>
            <span onClick={() => changeCompletionState(task.id)} style={{ textDecoration: task.copletionState ? 'line-through' : 'none', cursor: 'pointer' }}>
              {task.content}
              <button onClick={() => removeTask(task.id)}>Remove</button>
            </span>
          </li>
        ))}
      </ul>
    </main>
  )

}

export default App;