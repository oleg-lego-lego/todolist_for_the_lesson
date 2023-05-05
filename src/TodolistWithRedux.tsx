import React from 'react';
// import {TaskType} from "./App";
// import {AddItemForm} from "./components/AddItemForm";
// import {EditableSpan} from "./components/EditableSpan";
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import {TodolistType} from "./AppWithRedux";
// import {useDispatch, useSelector} from "react-redux";
// import {AppRootStateType} from "./store/store";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./components/store/task-reducer";
// import {changeTodolistTitleAC, filteredTaskAC, removeTodolistAC} from "./components/store/todolists-reducer";
//
// type TodolistPropsType = {
//     todolist: TodolistType
// }
//
// export const TodolistWithRedux = ({todolist}: TodolistPropsType) => {
//     const {id, title, filter} = todolist
//
//     //let task = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])
//     const dispatch = useDispatch()
//
//     const onChangeCheckbox = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
//         dispatch(changeTaskStatusAC(id, taskId, e.currentTarget.checked))
//     }
//
//     const removeTodolistHandler = () => {
//         dispatch(removeTodolistAC(id))
//     }
//
//     const addTask = (title: string) => {
//         dispatch(addTaskAC(id, title))
//     }
//
//     const editableSpanTaskTitle = (taskId: string, title: string) => {
//         dispatch(changeTaskTitleAC(id, taskId, title))
//     }
//
//     const editableSpanTodolistTitle = (title: string) => {
//         dispatch(changeTodolistTitleAC(id, title))
//     }
//
//     if (filter === 'active') {
//         task = task.filter(f => !f.isDone)
//     }
//     if (filter === 'completed') {
//         task = task.filter(f => f.isDone)
//     }
//
//     return (
//         <div>
//             <h3>
//                 <EditableSpan title={title} callBack={editableSpanTodolistTitle}/>
//                 <IconButton onClick={removeTodolistHandler}>
//                     <DeleteIcon/>
//                 </IconButton>
//             </h3>
//             <AddItemForm callBack={addTask}/>
//             <ul>
//
//                 {task.map((t) => {
//                     return (
//                         <li key={t.id} className={t.isDone ? 'isDone' : ''}>
//                             <Checkbox checked={t.isDone} onChange={(e) => onChangeCheckbox(t.id, e)}/>
//                             <EditableSpan title={t.title} callBack={(title) => editableSpanTaskTitle(t.id, title)}/>
//                             <IconButton onClick={() => dispatch(removeTaskAC(id, t.id))}>
//                                 <DeleteIcon/>
//                             </IconButton>
//                         </li>
//                     )
//                 })}
//             </ul>
//             <div>
//                 <Button
//                     variant={filter === 'all' ? "outlined" : "contained"} color="secondary"
//                     onClick={() => dispatch(filteredTaskAC(id, 'all'))}
//                 >All</Button>
//
//                 <Button
//                     variant={filter === 'active' ? "outlined" : "contained"} color="success"
//                     onClick={() => dispatch(filteredTaskAC(id, 'active'))}
//                 >Active</Button>
//
//                 <Button
//                     variant={filter === 'completed' ? "outlined" : "contained"} color="error"
//                     onClick={() => dispatch(filteredTaskAC(id, 'completed'))}
//                 >Completed</Button>
//             </div>
//         </div>
//     );
// };
