import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    filteredTask: (todolistId: string, filter: FilterType) => void
    addTask: (newTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterType
}

export const Todolist = (props: TodolistPropsType) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.addTask(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyDownAddTAsk = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
                <input
                    value={newTitle}
                    onChange={onChangeInput}
                    onKeyDown={onKeyDownAddTAsk}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={error ? 'errorMessage' : ''}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {
                    return (
                        <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                            <button onClick={() => props.removeTask(props.todolistId,t.id)}>x</button>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={(e) => onChangeCheckbox(t.id, e)}
                            />
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'activeFilter' : ''}
                    onClick={() => props.filteredTask(props.todolistId, 'all')}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'activeFilter' : ''}
                    onClick={() => props.filteredTask(props.todolistId, 'active')}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'activeFilter' : ''}
                    onClick={() => props.filteredTask(props.todolistId, 'completed')}>Completed
                </button>
            </div>
        </div>
    );
};
