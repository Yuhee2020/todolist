import {FilterType, TodoListsType} from "../App";

export const todoListsReducers=(state: TodoListsType, action: TsarType)=>{
    switch (action.type){
        case "REMOVE-TODOLIST":{
            return state
        }
        case "CHANGE-FILTER":{
            return state
        }
        case "EDIT-TODOLIST-TITLE":{
            return state
        }
        case "ADD-TODOLIST":{
            return state
        }
        default: return state
    }
}

type TsarType=removeTodoListACType | changeFilterACType | editTodoListTitleACType | addTodoListACType

export type removeTodoListACType=ReturnType<typeof removeTodoListAC>
export const removeTodoListAC=(todoListId: string)=>{
    return {
        type: "REMOVE-TODOLIST",
        todoListId
    }as const
}

export type changeFilterACType=ReturnType<typeof changeFilterAC>
export const changeFilterAC=(todoListId: string, value: FilterType)=>{
    return {
        type: "CHANGE-FILTER",
        todoListId,
        value
    }as const
}

export type editTodoListTitleACType=ReturnType<typeof editTodoListTitleAC>
export const editTodoListTitleAC=(todoListId: string, newTitle: string)=>{
    return {
        type: "EDIT-TODOLIST-TITLE",
        todoListId,
        newTitle
    }as const
}

export type addTodoListACType=ReturnType<typeof addTodoListAC>
export const addTodoListAC=(todoListId: string, title: string)=>{
    return {
        type: "ADD-TODOLIST",
        todoListId,
        title
    }as const
}