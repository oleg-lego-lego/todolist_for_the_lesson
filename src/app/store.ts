import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {ActionTaskType, tasksReducer} from "../components/store/task-reducer";
import {ActionTodolistType, todolistsReducer} from "../components/store/todolists-reducer";
import {useDispatch} from "react-redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionType, appReducer} from "./app-reducer";
import {AuthActionsType, authReducer} from "../components/Login/auth-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

type AllAction = ActionTaskType | ActionTodolistType | AppActionType | AuthActionsType

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AllAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;

