import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const task1: TaskType[] = [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]

    const task2: TaskType[] = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am happy", isDone: false},
        {id: 3, title: "Yo", isDone: false}
    ]


    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={task1}/>
            <Todolist title={'What to bye'} tasks={task2}/>
        </div>
    );
}

export default App;
