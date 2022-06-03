import {FilterType, TodoListsType} from "../App";
import {v1} from "uuid";
const initialState:TodoListsType[]=[]
export const todoListsReducer=(state: TodoListsType[]=initialState, action: TsarType):TodoListsType[]=>{
    switch (action.type){
        case "REMOVE-TODOLIST":{
            return state.filter(el=>el.id!==action.todoListId)
        }
        case "CHANGE-FILTER":{
            return state.map(el=>el.id===action.todoListId? {...el, filter:action.value}: el)
        }
        case "EDIT-TODOLIST-TITLE":{
            return state.map(el=>el.id===action.todoListId?{...el, title:action.newTitle}:el)
        }
        case "ADD-TODOLIST":{
            let newTodolist: TodoListsType = {id: action.todoListId, title: action.title, filter: 'all'}
            return [newTodolist ,...state]
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
export const addTodoListAC=(title: string)=>{
    return {
        type: "ADD-TODOLIST",
        todoListId: v1(),
        title

    }as const
}