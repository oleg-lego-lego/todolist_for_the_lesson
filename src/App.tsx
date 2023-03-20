import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    const [task, setTask] = useState<TaskType[]>([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    const removeTask = (taskId: number) => {
        setTask(task.filter(t => t.id !== taskId))
    }

    const addTask = (newTask: string) => {
        console.log(newTask)
    }

    let filtered = task
    if (filter === 'active') {
        filtered = task.filter(f => f.isDone)
    }
    if (filter === 'completed') {
        filtered = task.filter(f => !f.isDone)
    }

    const filteredTask = (value: FilterType) => {
        setFilter(value)
    }


    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={filtered}
                removeTask={removeTask}
                filteredTask={filteredTask}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
