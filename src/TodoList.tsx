import React, {ChangeEvent} from 'react';
import {FilterType} from "./App";
import {FullInput} from "./components/FullInput";
import {EditSpan} from "./components/EditSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, value: FilterType) => void
    addTask: (todoListId: string, title: string) => void
    changeStatus: (todoListId: string, taskId: string, status: boolean) => void
    todoListId: string
    filter: FilterType
    removeTodoList: (todoListId: string) => void
    editTask:(todoListId: string,taskId: string, newTitle: string)=>void
    editTodoListTitle:(todoListId: string,newTitle: string)=>void
}


export function Todolist(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilter(props.todoListId, "all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.todoListId, "active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.todoListId, "completed")
    }
    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId)
    }
    const addTask = (title: string) => {
        props.addTask(props.todoListId, title)
    }
    const editTask= (taskId:string,newTitle: string )=>{
        props.editTask(props.todoListId, taskId,newTitle)
    }
    const editTodolistTitle=(newTitle:string)=>{
        props.editTodoListTitle(props.todoListId, newTitle)
    }


    return <div>
        <h3>
            <EditSpan title={props.title} callBack={editTodolistTitle}/>
            <button onClick={removeTodoListHandler}>x</button>
        </h3>
        <FullInput callBack={addTask}/>

        <ul>{props.tasks.map(el => {
            const onClickHandler = () => {
                props.removeTask(props.todoListId, el.id)
            }
            const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeStatus(props.todoListId, el.id, e.currentTarget.checked)
            }
            const callBackHandler=(newTitle: string)=>{
                editTask(el.id,newTitle)
            }
            return <li key={el.id}>
                <input type="checkbox" checked={el.isDone} onChange={changeStatusHandler}/>
                <EditSpan  callBack={callBackHandler}
                           title={el.title}/>
                <button onClick={onClickHandler}>x</button>
            </li>
        })}

        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
