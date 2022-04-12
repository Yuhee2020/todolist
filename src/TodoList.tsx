import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
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
    addTask: (newTitle:string)=>void
}

export function Todolist(props: PropsType) {
    let[newTitle,setNewTitle]=useState("")
    console.log(newTitle)

     const addTaskHandler=()=>{
         props.addTask(newTitle)
         setNewTitle("")
    }

    const onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>
    {setNewTitle(event.currentTarget.value)}

    const onKeyPressHandler=(e:KeyboardEvent<HTMLInputElement>)=>{
       if(e.key ==='Enter'){addTaskHandler()}
    }

    /*const changeFilterHandlerAll=()=>{props.changeFilter("all")}
    const changeFilterHandlerActive=()=>{props.changeFilter("active")}
    const changeFilterHandlerCompleted=()=>{props.changeFilter("completed")}*/

    const changeFilterHandler=(value:FilterValuesType)=>{
        props.changeFilter(value)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onKeyPress={onKeyPressHandler} value={newTitle} onChange={onChangeHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={ () => { props.removeTask(t.id) } }>x</button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={ ()=>changeFilterHandler("all") }>
                All
            </button>
            <button onClick={ ()=>changeFilterHandler("active") }>
                Active
            </button>
            <button onClick={ ()=>changeFilterHandler("completed") }>
                Completed
            </button>
        </div>
    </div>
}
