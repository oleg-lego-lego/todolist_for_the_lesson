import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    let [todolist, setTodolist] = useState<TodolistType[]>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'}
    ])


    const [task, setTask] = useState<TaskType[]>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

    const removeTask = (taskId: string) => {
        setTask(task.filter(t => t.id !== taskId))
    }

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTask([newTask, ...task])
    }

    const filteredTask = (todolistId: string, filter: FilterType) => {
        setTodolist(todolist.map(el => el.id === todolistId ? {...el, filter} : el))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTask(task.map(el => el.id === taskId ? {...el, isDone} : el))
    }


    return (
        <div className="App">
            {todolist.map(t => {
                let filtered = task
                if (t.filter === 'active') {
                    filtered = task.filter(f => !f.isDone)
                }
                if (t.filter === 'completed') {
                    filtered = task.filter(f => f.isDone)
                }

                return (
                    <Todolist
                        key={t.id}
                        todolist={t.id}
                        title={t.title}
                        tasks={filtered}
                        removeTask={removeTask}
                        filteredTask={filteredTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={t.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;
