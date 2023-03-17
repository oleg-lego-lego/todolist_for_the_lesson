import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const [task, setTask] = useState<TaskType[]>([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    const [filter, setFilter] = useState('all')

    const removeTask = (taskId: number) => {
        setTask(task.filter(t => t.id !== taskId))
    }

    let filtered = task
    if (filter === 'active') {
        filtered = task.filter(f => f.isDone)
    }
    if (filter === 'completed') {
        filtered = task.filter(f => !f.isDone)
    }


    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={filtered} removeTask={removeTask}/>
        </div>
    );
}

export default App;
