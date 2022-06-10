import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditSpan} from "./EditSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {changeStatusAC, editTaskAC, removeTaskAC} from "../redux/tasks.reducer";

type PropsType={
    todoListId: string
    index: number
}

export const Task=React.memo((props:PropsType)=>{
    console.log("Task called")
    const task=useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todoListId][props.index])
    const dispatch=useDispatch()
    const onClickHandler =useCallback( () => {
        dispatch(removeTaskAC(props.todoListId, task.id))
    },[props.todoListId])
    const changeStatusHandler =useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatusAC(props.todoListId, task.id, e.currentTarget.checked))
    },[])
    const callBackHandler=useCallback((newTitle: string)=>{
        dispatch(editTaskAC(props.todoListId, task.id, newTitle))
    },[props.todoListId])

    return <div >
        <Checkbox checked={task.isDone} onChange={changeStatusHandler} color="success"/>
        <EditSpan  callBack={callBackHandler}
                   title={task.title}/>
        <IconButton aria-label="delete" onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
})