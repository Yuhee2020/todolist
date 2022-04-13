import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    let [tasks,setTasks] =useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "JS", isDone: true },
        { id: 4, title: "ReactJS", isDone: false }
    ])

    const removeTask=(newId:number)=>{
        tasks=tasks.filter((el)=>
        { return el.id!==newId})
        setTasks(tasks)

        console.log(tasks)


    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}/>

        </div>
    );
}

export default App;
