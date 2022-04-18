import React from "react";
import {FilterValue} from "./App";

type TaskType={
    id: number
    title: string
    isDone: boolean
}


type TodoListType={
    title:string
    tasks: TaskType[]
    removeTask: (removeId:number)=>void
    changeFilter: (value:FilterValue)=>void

}


export function TodoList(props:TodoListType){
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
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