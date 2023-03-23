import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    filteredTask: (value: FilterType) => void
    addTask: (newTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const [newTitle, setNewTitle] = useState('')

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.addTask(newTitle.trim())
            setNewTitle('')
        }
    }

    const onKeyDownAddTAsk = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onChangeCheckbox = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(taskId, e.currentTarget.checked)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTitle} onChange={onChangeInput} onKeyDown={onKeyDownAddTAsk}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => {
                    return (
                        <li key={t.id}>
                            <button onClick={() => props.removeTask(t.id)}>x</button>
                            <input type="checkbox" checked={t.isDone} onChange={(e) => onChangeCheckbox(t.id, e)}/>
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
