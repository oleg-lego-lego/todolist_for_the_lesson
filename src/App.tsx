import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    const [task, setTask] = useState<TaskType[]>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    const removeTask = (taskId: string) => {
        setTask(task.filter(t => t.id !== taskId))
    }

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTask([newTask, ...task])
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

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTask(task.map(el => el.id === taskId ? {...el, isDone} : el))
    }


    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={filtered}
                removeTask={removeTask}
                filteredTask={filteredTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
