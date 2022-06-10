import React, {useCallback} from 'react';
import {FilterType} from "./App";
import {FullInput} from "./components/FullInput";
import {EditSpan} from "./components/EditSpan";
import {Button, IconButton} from '@mui/material';
import {Delete} from "@mui/icons-material";
import {Task} from "./components/Task";

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
    editTask: (todoListId: string, taskId: string, newTitle: string) => void
    editTodoListTitle: (todoListId: string, newTitle: string) => void
}


export const Todolist=React.memo((props: PropsType)=> {

    console.log("todolist called")
    const onAllClickHandler =useCallback( () => {
        props.changeFilter(props.todoListId, "all")
    },[props.changeFilter,props.todoListId])
    const onActiveClickHandler =useCallback( () => {
        props.changeFilter(props.todoListId, "active")
    },[props.changeFilter,props.todoListId])
    const onCompletedClickHandler =useCallback (() => {
        props.changeFilter(props.todoListId, "completed")
    },[props.changeFilter,props.todoListId])
    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId)
    }
    const addTask =useCallback( (title: string) => {
        props.addTask(props.todoListId, title)
    },[props.addTask,props.todoListId])
    const editTask = useCallback((taskId: string, newTitle: string) => {
        props.editTask(props.todoListId, taskId, newTitle)
    },[props.editTask,props.todoListId])
    const editTodolistTitle =useCallback( (newTitle: string) => {
        props.editTodoListTitle(props.todoListId, newTitle)
    },[props.editTodoListTitle,props.todoListId])

    let taskForTodolist = props.tasks
    if (props.filter === "active") {
        taskForTodolist = props.tasks.filter(el => !el.isDone)
    }
    if (props.filter === "completed") {
        taskForTodolist = props.tasks.filter(el => el.isDone)
    }

    return (<>
        <h3>
            <EditSpan title={props.title} callBack={editTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodoListHandler}>
                <Delete/>
            </IconButton>
        </h3>
        <FullInput callBack={addTask}/>

        {taskForTodolist.map(el => {
           return <Task
                key={el.id}
                removeTask={props.removeTask}
                changeStatus={props.changeStatus}
                editTask={editTask}
                todoListId={props.todoListId}
                task={el}/>
        })}


        <div>
            <Button variant={props.filter === "all" ? "contained" : "outlined"} onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === "active" ? "contained" : "outlined"}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === "completed" ? "contained" : "outlined"}
                    onClick={onCompletedClickHandler}>Completed</Button>

        </div>
    </>)
})
