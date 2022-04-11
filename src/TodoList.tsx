import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function TodoList(props: PropsType) {
    const [title, setTitle] = useState<string>("")
    const onClickAddTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler= (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddTask()
        }
    }
    const onAllOnClickHandler =() => {
        props.changeFilter("all")
    }
    const onActiveOnClickHandler=() => {
        props.changeFilter("active")
    }
    const onCompletedOnClickHandler=() => {
        props.changeFilter("completed")
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}/>

            <button onClick={onClickAddTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t =>{
                    const onClickHandler=() => {props.removeTask(t.id)}
                    return <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={onClickHandler}>x</button>
                </li>})
            }
        </ul>
        <div>
            <button onClick={onAllOnClickHandler}>All</button>
            <button onClick={onActiveOnClickHandler}>Active</button>
            <button onClick={onCompletedOnClickHandler}>Completed</button>
        </div>
    </div>
}
