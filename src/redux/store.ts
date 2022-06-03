import {todoListsReducer} from "./todoLists.reducer";
import {tasksReducer} from "./tasks.reducer";
import { combineReducers, legacy_createStore as createStore} from 'redux'


const rootReducer=combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer
})

export const store= createStore(rootReducer)
export type AppRootStateType=ReturnType<typeof rootReducer>

// @ts-ignore
window.store=store