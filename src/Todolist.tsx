import React from 'react';
import {FilterType, TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    filteredTask: (value: FilterType) => void
    addTask: (newTask: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button onClick={() => props.addTask('www')}>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => {
                    return (
                        <li key={t.id}>
                            <button onClick={() => props.removeTask(t.id)}>x</button>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => props.filteredTask('all')}>All</button>
                <button onClick={() => props.filteredTask('active')}>Active</button>
                <button onClick={() => props.filteredTask('completed')}>Completed</button>
            </div>
        </div>
    );
};
