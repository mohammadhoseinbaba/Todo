import { useState } from "react"

interface Task {
    id: number;
    text: string
}

const Todo: React.FC = () => {
    const [taskValue, setTaskValue] = useState("")
    const [tasks, setTasks] = useState<Task[]>([])
    const [editTask, setEditTask] = useState<number | null>(null)
    const [newTask, setNewTask] = useState('')

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskValue(e.target.value)
    }

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!taskValue.trim()) {
            alert('not ok')
            return
        }

        const newTask = { id: Date.now(), text: taskValue }
        setTasks([...tasks, newTask])
        setTaskValue('')
    }

    const handleDelete = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }
    const handleSaveEdit = (id: number) => {
        setTasks(tasks.map((task) => task.id === id ? { ...task, text:newTask } : task))
        setEditTask(null)
        setNewTask("")
    }

    const renderedTask = tasks.map((task) => {
        const isEditing = editTask === task.id

        return <li key={task.id} >{isEditing ? (<input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />) : (<>{task.text}</>)}
            {isEditing ? (<><button onClick={() => handleSaveEdit(task.id)}>save</button><button onClick={() => setEditTask(null)}>cancel</button></>) : (<><button onClick={() => handleDelete(task.id)}>Delete</button><button onClick={() => { setEditTask(task.id); setNewTask(task.text) }}>Edit</button></>)}</li>
    })
    return <div>
        <form onSubmit={handleForm}>
            <input onChange={handleInput} value={taskValue} />
            <button>Submit</button>
        </form>
        <div>
            <ul>
                {renderedTask}
            </ul>
        </div>

    </div>
}
export default Todo
