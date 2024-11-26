import React, { useEffect, useState } from "react"
import axios from 'axios'

interface Task {
    id?: number;
    text: string;
}

const TodoList: React.FC = () => {

    const [whatToDo, setWhatToDo] = useState('')
    const [task, setTask] = useState<Task[]>([])
    const [newText, setNewText] = useState<string>('')
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

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
    const handleEdit = async (id:number) => {
        try {
            const updatedTask = { text: newText }
            const response = await axios.put(`http://localhost:3001/tasks/${id}`, updatedTask)
            setTask(
                task.map((t) =>
                    t.id === id ? { ...t, text: response.data.text } : t
                ))

            setEditingTaskId(null)
            setNewText('')
        } catch (error) {
            console.error('can editing task:', error)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3001/tasks/${id}`)
            setTask(task.filter((i) => i.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error)
        }
    }

    const renderedTask = task.map((data) => {
        const isEditing = editingTaskId === data.id

        return <li className="text-white flex justify-between items-center mb-5 border p-5 rounded " key={data.id}>
            {isEditing ? (<input type="text" onChange={(e) => setNewText(e.target.value)} value={newText} className="text-black p-2 rounded" />) : (
                <>your task is : {data.text}</>)}
            {isEditing ? (<><button onClick={() => handleEdit(data.id!)}>Save</button><button onClick={() => { setEditingTaskId(null); setNewText('') }}>cancel</button></>) : (<>
                <button className=" bg-red-500 p-5 ml-20 rounded-xl " onClick={() => handleDelete(data.id!)}>Delete</button>
                <button onClick={() => { setEditingTaskId(data.id!); setNewText(data.text) }}>Edit</button></>)}
        </li>
    })

    return <div className=" mt-20 ">
        <form onSubmit={handleSubmit} className="flex justify-center ">
            <input className="p-10 outline-none	rounded-xl text-white bg-inherit border " placeholder="What Task you want to do ?" onChange={handleWhatTodo} value={whatToDo} />
            <button className="ml-10  rounded-xl p-5 bg-slate-300	hover:bg-emerald-700 hover:text-white" type="submit" >Submit</button>
        </form>
        <div className="flex justify-center ">
            <ul className="mt-10 ">
                {renderedTask}
            </ul >
        </div>
    </div>
}
export default TodoList