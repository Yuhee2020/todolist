import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import style from "./TodoList.module.css"

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
    addTask: (title: string) => void
    changeStatusCheckbox: (currentId: string, eventStatus: boolean) => void
    filter:FilterValuesType
}

export function TodoList(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>("")

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim());
            setTitle("");
        }else{setError('Title is required')}
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError("")
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    const checkBoxHandler = (currentId: string, currentEvent: boolean) => {
        props.changeStatusCheckbox(currentId, currentEvent)

    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                className={error ? style.error : "" }
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}

            />
            <button onClick={addTask}>+</button>
            {error && <div className={style.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id}>
                        <button onClick={onClickHandler}>x</button>
                        <input type="checkbox" checked={t.isDone}
                               onChange={(e) => checkBoxHandler(t.id, e.currentTarget.checked)}/>
                        <span className={t.isDone ? style.isDone : ""}>{t.title}</span>

                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter==="all" ? style.activeFilter : ""} onClick={onAllClickHandler}>All</button>
            <button className={props.filter==="active" ? style.activeFilter : ""} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter==="completed" ? style.activeFilter : ""} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
