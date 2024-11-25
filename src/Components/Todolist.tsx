import React, { useEffect, useState } from "react"
import axios from 'axios'

interface Task {
    id?:number;
    text: string;
}

const TodoList: React.FC = () => {

    const [whatToDo, setWhatToDo] = useState('')
    const [task, setTask] = useState<Task[]>([])


    const handleWhatTodo = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setWhatToDo(e.target.value)
    }

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get("http://localhost:3001/tasks")
                setTask(response.data)
            } catch (error) {
                console.error('error fetchin tasks', error)
            }
        }
        fetchTask()
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!whatToDo.trim()) {
            alert(`Please insert What you want to do`)
            return
        }

        const newTask = { text: whatToDo }
        setTask([...task, newTask])
        setWhatToDo('')

        try {
            const response = await axios.post('http://localhost:3001/tasks', newTask)
            setTask([...task, response.data])
            setWhatToDo('')
        } catch (error) {
            console.error('error deleting task:', error)
        }
    }

    const renderedTask = task.map((data) => {
        return <li key={data.id}>your task is : {data.text}
            <button onClick={() => handleDelete(data.id!)}>Delete</button>
        </li>
    })
    const handleDelete = async(id: number) => {
        try{
            await axios.delete(`http://localhost:3001/tasks/${id}`)
            setTask(task.filter((i) => i.id !== id));
        }catch(error){
            console.error("Error deleting task:",error)
        }
    }


    return <div>
        <form onSubmit={handleSubmit}>
            <input placeholder="What Task you want to do ?" onChange={handleWhatTodo} value={whatToDo} />
            <button type="submit">Submit</button>
        </form>
        <ul>
            {renderedTask}
        </ul>
    </div>
}
export default TodoList