import React, {useCallback} from 'react';
import {TodoListsType} from "./App";
import {FullInput} from "./components/FullInput";
import {EditSpan} from "./components/EditSpan";
import {Button, IconButton} from '@mui/material';
import {Delete} from "@mui/icons-material";
import {Task} from "./components/Task";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {changeFilterAC, editTodoListTitleAC, removeTodoListAC} from "./redux/todoLists.reducer";
import {addTaskAC} from "./redux/tasks.reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodoListsType
}


export const Todolist = React.memo((props: PropsType) => {
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolist.id])
    const dispatch = useDispatch()

    console.log("todolist called")
    const onAllClickHandler = useCallback(() => {
        dispatch(changeFilterAC(props.todolist.id, "all"))
    }, [props.todolist.id])
    const onActiveClickHandler = useCallback(() => {
        dispatch(changeFilterAC(props.todolist.id, "active"))
    }, [props.todolist.id])
    const onCompletedClickHandler = useCallback(() => {
        dispatch(changeFilterAC(props.todolist.id, "completed"))
    }, [props.todolist.id])
    const removeTodoListHandler =useCallback( () => {
        dispatch(removeTodoListAC(props.todolist.id))
    },[props.todolist.id])
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(props.todolist.id, title))
    }, [props.todolist.id])

    const editTodolistTitle = useCallback((newTitle: string) => {
        dispatch(editTodoListTitleAC(props.todolist.id, newTitle))
    }, [props.todolist.id])

    let taskForTodolist = tasks
    if (props.todolist.filter === "active") {
        taskForTodolist = tasks.filter(el => !el.isDone)
    }
    if (props.todolist.filter === "completed") {
        taskForTodolist = tasks.filter(el => el.isDone)
    }

    return (<>
        <h3>
            <EditSpan title={props.todolist.title} callBack={editTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodoListHandler}>
                <Delete/>
            </IconButton>
        </h3>
        <FullInput callBack={addTask}/>

        {taskForTodolist.map((el, i) => {
            return <Task
                key={el.id}
                todoListId={props.todolist.id}
                index={i}/>
        })}


        <div>
            <Button variant={props.todolist.filter === "all" ? "contained" : "outlined"}
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={props.todolist.filter === "active" ? "contained" : "outlined"}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.todolist.filter === "completed" ? "contained" : "outlined"}
                    onClick={onCompletedClickHandler}>Completed</Button>

        </div>
    </>)
})
