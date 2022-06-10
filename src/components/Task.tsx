import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditSpan} from "./EditSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../Todolist";

type PropsType={
    removeTask:(todoListId: string, taskId: string) => void
    changeStatus: (todoListId: string, taskId: string, status: boolean) => void
    editTask:(taskId: string, newTitle: string)=>void
    todoListId: string
    task: TaskType
}

export const Task=React.memo((props:PropsType)=>{
    console.log("Task called")
    const onClickHandler = () => {
        props.removeTask(props.todoListId, props.task.id)
    }
    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.todoListId,  props.task.id, e.currentTarget.checked)
    }
    const callBackHandler=useCallback((newTitle: string)=>{
        props.editTask( props.task.id,newTitle)
    },[ props.task.id])

    return <div >
        <Checkbox checked={props.task.isDone} onChange={changeStatusHandler} color="success"/>
        <EditSpan  callBack={callBackHandler}
                   title={props.task.title}/>
        <IconButton aria-label="delete" onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
})