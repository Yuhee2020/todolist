import React from 'react';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id:number)=>void
    changeFilter: (filterValue:string)=>void
}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>

            {props.tasks.map((el) => {
                return <li key={el.id}>
                    <button onClick={()=>props.removeTask(el.id)}>del</button>
                    <input type="checkbox" checked={el.isDone}/>
                    <span>{el.title}</span>

                </li>
            })}


        </ul>
        <div>
            <button onClick={()=>{props.changeFilter('all')}}>All</button>
            <button onClick={()=>{props.changeFilter('active')}}>Active</button>
            <button onClick={()=>{props.changeFilter ('completed')}}>Completed</button>
        </div>
    </div>
}
