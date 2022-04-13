import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
}


export function Todolist(props: PropsType) {
    let [newTitle, setNewTitle] = useState("")
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onClickHandler=()=>{
        props.addTask(newTitle)
        setNewTitle("")
    }
    const onKeyPressHandler=(e:KeyboardEvent<HTMLInputElement>)=>{
        if (e.key==='Enter'){onClickHandler()}
    }

    /*const changeFilterAllHandler=()=>{props.changeFilter("all")}
    const changeFilterActiveHandler=()=>{props.changeFilter("active")}
    const changeFilterCompletedHandler=()=>{props.changeFilter("completed")}*/
    const changeFilterHandler=(t:FilterValuesType)=>{props.changeFilter(t)}

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        props.removeTask(t.id)
                    }}>x
                    </button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={()=>changeFilterHandler("all")}>
                All
            </button>
            <button onClick={()=>changeFilterHandler("active")}>
                Active
            </button>
            <button onClick={()=>changeFilterHandler("completed")}>
                Completed
            </button>
        </div>
    </div>
}
