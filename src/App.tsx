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

    const removeTask = (taskId: number) => {
        setTask(task.filter(t => t.id !== taskId))
    }


    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={task} removeTask={removeTask}/>
        </div>
    );
}

export default App;
