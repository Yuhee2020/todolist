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
    addTask: (title: string) => void
    filter: FilterValuesType
    changeTaskStatus: (taskId: string, isDone: boolean) => void

}

export function Todolist(props: PropsType) {
    const [error, setError]= useState<boolean>(false)



    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title);
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.length ? props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id}>
                        <button onClick={onClickHandler}>x</button>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked)}
                        />
                        <span className={t.isDone ? "is-done" : ""}>{t.title}</span>

                    </li>
                }) : <span>no tasks</span>
            }
        </ul>
        <div>
            <button
                className={props.filter === 'all' ? "active-filter" : ''}
                onClick={onAllClickHandler}>All
            </button>
            <button
                className={props.filter === 'active' ? "active-filter" : ''}
                onClick={onActiveClickHandler}>Active
            </button>
            <button
                className={props.filter === 'completed' ? "active-filter" : ''}
                onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
