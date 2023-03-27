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
    let todolist1 = v1()
    let todolist2 = v1()

    let [todolist, setTodolist] = useState<TodolistType[]>([
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'all'}
    ])


    const [task, setTask] = useState({
            [todolist1]: [
                {id: v1(), title: "HTML & CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false}
            ],
            [todolist2]: [
                {id: v1(), title: "milk", isDone: true},
                {id: v1(), title: "bread", isDone: true},
                {id: v1(), title: "rice", isDone: false}
            ]
        }
    )

    const removeTask = (todolistId: string, taskId: string) => {
        setTask({...task, [todolistId]: task[todolistId].filter(el => el.id !== taskId)})
    }

    const addTask = (todolistId: string, newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTask({...task, [todolistId]: [newTask, ...task[todolistId]]})
    }

    const filteredTask = (todolistId: string, filter: FilterType) => {
        setTodolist(todolist.map(el => el.id === todolistId ? {...el, filter} : el))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTask({...task, [todolistId]: task[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)})
    }


    return (
        <div className="App">
            {todolist.map(t => {
                let filtered = task[t.id]
                if (t.filter === 'active') {
                    filtered = task[t.id].filter(f => !f.isDone)
                }
                if (t.filter === 'completed') {
                    filtered = task[t.id].filter(f => f.isDone)
                }

                return (
                    <Todolist
                        key={t.id}
                        todolistId={t.id}
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
