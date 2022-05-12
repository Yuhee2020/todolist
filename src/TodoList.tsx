import React, {ChangeEvent} from 'react';
import {FilterType} from "./App";
import {FullInput} from "./components/FullInput";
import {EditSpan} from "./components/EditSpan";
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from "@mui/icons-material";

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
            <IconButton aria-label="delete" onClick={removeTodoListHandler}>
                <Delete />
            </IconButton>
        </h3>
        <FullInput callBack={addTask}/>

        {props.tasks.map(el => {
            const onClickHandler = () => {
                props.removeTask(props.todoListId, el.id)
            }
            const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeStatus(props.todoListId, el.id, e.currentTarget.checked)
            }
            const callBackHandler=(newTitle: string)=>{
                editTask(el.id,newTitle)
            }
            return <div key={el.id}>
                <Checkbox checked={el.isDone} onChange={changeStatusHandler} color="success"/>
                <EditSpan  callBack={callBackHandler}
                           title={el.title}/>
                <IconButton aria-label="delete" onClick={onClickHandler}>
                    <Delete />
                </IconButton>
            </div>
        })}


        <div>
            <Button variant={props.filter==="all"? "contained" :"outlined"} onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter==="active"? "contained" :"outlined"} onClick={onActiveClickHandler} >Active</Button>
            <Button variant={props.filter==="completed"? "contained" :"outlined"} onClick={onCompletedClickHandler}>Completed</Button>

        </div>
    </div>
}
