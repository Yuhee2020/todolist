import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    const[tasks, setTasks] =useState( [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "JS", isDone: true},
        {id: 4, title: "ReactJS", isDone: false}
    ])
    const [filter, setFilter]=useState("All")
    let filteredTasks=tasks
    if(filter==="Active"){filteredTasks=tasks.filter(el=>el.isDone===false)}
    if(filter==="Completed"){filteredTasks=tasks.filter(el=>el.isDone===true)}

    const removeTask = (id:number) => {
        setTasks(tasks.filter(el=>el.id!==id))
    }

    const changeFilter=(filterValue:string)=>{
        setFilter(filterValue)
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
