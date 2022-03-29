import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

function App() {
    const todoListTitle_1: string = "What to learn"
    const todoListTitle_2 = "What to buy"
    const todoListTitle_3 = "What to do"

    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]

    const tasks_2: Array<TaskType> = [
        {id: 1, title: "sugar", isDone: true},
        {id: 2, title: "bread", isDone: true},
        {id: 3, title: "water", isDone: false},
    ]

    const tasks_3: Array<TaskType> = [
        {id: 1, title: "go", isDone: true},
        {id: 2, title: "sleep", isDone: true},
        {id: 3, title: "play", isDone: false},
    ]

    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks_1}/>
            <TodoList title={todoListTitle_2} tasks={tasks_2}/>
            <TodoList title={todoListTitle_3} tasks={tasks_3}/>

        </div>
    );
}

export default App;
