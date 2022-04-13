import React, {useState} from 'react';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(removeId:string)=>void
    changeFilter:(filterValue:string)=>void
    addTask:(newTitle:string)=>void
}


export function Todolist(props: PropsType) {
    const[newTitle, setNewTitle]=useState("")
    const addTaskHandler=()=>{
        {props.addTask(newTitle)}
        setNewTitle("")
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onKeyPress={(e)=>{if (e.key==="Enter"){addTaskHandler()}}}
                value={newTitle}
                   onChange={(event)=>{setNewTitle(event.currentTarget.value)}}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {props.tasks.map((el) => {
                return (
                    <li key={el.id}><button onClick={()=>{props.removeTask(el.id)}}>x</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>)
            })}

        </ul>
        <div>
            <button onClick={()=>{props.changeFilter('All')}}>All</button>
            <button onClick={()=>{props.changeFilter('Active')}}>Active</button>
            <button onClick={()=>{props.changeFilter('Completed')}}>Completed</button>
        </div>
    </div>
}
