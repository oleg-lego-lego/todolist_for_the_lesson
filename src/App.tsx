import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    return (
        <div className="App">
            <Todolist title={'What to learn'}/>
            <Todolist title={'What to bye'}/>
        </div>
    );
}

export default App;
