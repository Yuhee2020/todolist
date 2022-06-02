import {TasksType} from "../App";
import {v1} from "uuid";

export const tasksReducer=(state: TasksType, action: TsarType):TasksType=>{
    switch (action.type){
        case "ADD-TASK":{
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todoListId]:[...state[action.todoListId],newTask]}
        }
        case "REMOVE-TASK":{
            return {...state, [action.todoListId]:state[action.todoListId].filter(el=>el.id!==action.taskId)}
        }
        case "CHANGE-STATUS":{
            return {...state, [action.todoListId]:state[action.todoListId].map(el=>el.id===action.taskId?{...el, isDone:action.status}:el)}
        }
        case "EDIT-TASK":{
            return {...state, [action.todoListId]:state[action.todoListId].map(el=>el.id===action.taskId?{...el, title:action.newTitle}:el)}
        }
        default: return state
    }
}

type TsarType=addTaskACType | removeTaskACType | changeStatusACType | editTaskACType

export type addTaskACType=ReturnType<typeof addTaskAC>
export const addTaskAC=(todoListId: string, title: string)=>{
    return {
        type: "ADD-TASK",
        todoListId,
        title
    }as const
}

export type removeTaskACType=ReturnType<typeof removeTaskAC>
export const removeTaskAC=(todoListId: string, taskId: string)=>{
    return {
        type: "REMOVE-TASK",
        todoListId,
        taskId
    }as const
}

export type changeStatusACType=ReturnType<typeof changeStatusAC>
export const changeStatusAC=(todoListId: string, taskId: string, status: boolean)=>{
    return {
        type: "CHANGE-STATUS",
        todoListId,
        taskId,
        status
    }as const
}

export type editTaskACType=ReturnType<typeof editTaskAC>
export const editTaskAC=(todoListId: string, taskId: string, newTitle: string)=>{
    return {
        type: "EDIT-TASK",
        todoListId,
        taskId,
        newTitle
    }as const
}