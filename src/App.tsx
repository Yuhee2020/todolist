import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "JS", isDone: true},
        {id: 4, title: "ReactJS", isDone: false}
    ])

    const [filter, setFilter] = useState("all")

    let filteredTasks = tasks
    if (filter=== "active"){
        tasks=tasks.filter(el=>!el.isDone)
    }
    if (filter==="completed"){
        tasks=tasks.filter(el=>el.isDone)
    }


    const changeFilter = (filterValue: string) => {
        setFilter(filterValue)
    }


    const removeTask = (newId: number) => {
        tasks = tasks.filter((el) => {
            return el.id !== newId
        })
        setTasks(tasks)
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>

        </div>
    );
}

export default App;
