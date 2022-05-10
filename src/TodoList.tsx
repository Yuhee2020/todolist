import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(taskId:string)=>void
    changeFilter: (value:FilterType)=>void
    addTask:(title:string)=>void
    changeStatus:(taskId:string, status:boolean)=>void
}


export function Todolist(props: PropsType) {
    const [title, setTitle]=useState("")
    const [error, setError]=useState("")
    const onAllClickHandler=()=>{
        props.changeFilter("all")
    }
    const onActiveClickHandler=()=>{
        props.changeFilter("active")
    }
    const onCompletedClickHandler=()=>{
        props.changeFilter("completed")
    }
    const addTaskHandler=()=>{
        title.trim() ? props.addTask(title.trim()): setError("title is required")
        setTitle("")
    }
    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
        setError("")
    }
    const onKeyPressHandler=(e:KeyboardEvent<HTMLInputElement>)=>{
        e.key==="Enter" && addTaskHandler()
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} />
            <button onClick={addTaskHandler}>+</button>
            {error? <div>{error}</div>: ""}
        </div>
        <ul>{props.tasks.map(el=>{
            const onClickHandler=()=>{
                props.removeTask(el.id)
            }
            const changeStatusHandler=(e:ChangeEvent<HTMLInputElement>)=>{
                props.changeStatus(el.id,e.currentTarget.checked)
            }
            return <li key={el.id}>
                <input type="checkbox" checked={el.isDone} onChange={changeStatusHandler}/>
                <span>{el.title}</span>
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
