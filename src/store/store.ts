import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from "../components/store/task-reducer";
import {todolistsReducer} from "../components/store/todolists-reducer";
import {useDispatch} from "react-redux";
import thunk, {ThunkDispatch} from "redux-thunk";


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

