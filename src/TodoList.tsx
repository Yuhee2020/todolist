import React, {useState} from "react";
import {FilterValue} from "./App";

type TaskType={
    id: string
    title: string
    isDone: boolean
}


type TodoListType={
    title:string
    tasks: TaskType[]
    removeTask: (removeId:string)=>void
    changeFilter: (value:FilterValue)=>void
    addTask: (title:string)=>void

}


export function TodoList(props:TodoListType){
    let [title,setTitle]=useState("")
    console.log(title)

    const addTaskHandler=()=>{props.addTask(title)
        setTitle("")
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={(e)=>{setTitle(e.currentTarget.value)}}
                        onKeyPress={(e)=>{if(e.key==="Enter"){addTaskHandler()}}}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>

                {props.tasks.map((el)=>{
                    return(
                    <li key={el.id}>
                        <button onClick={()=>{props.removeTask(el.id)}}>x</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span></li>
                    ) })}
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter('all')}}>All</button>
                <button onClick={()=>{props.changeFilter('active')}}>Active</button>
                <button onClick={()=>{props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}