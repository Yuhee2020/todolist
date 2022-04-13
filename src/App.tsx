import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

function App() {

    const [tasks,setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "ReactJS", isDone: false },
    ])

    const[filter, setFilter]=useState("All")
    let filteredTasks=tasks
    if (filter==="Active"){filteredTasks=tasks.filter(el=>el.isDone===false)}
    if (filter==="Completed"){filteredTasks=tasks.filter(el=>el.isDone===true)}



    const changeFilter=(filterValue:string)=>{
        setFilter(filterValue)



    }

    const removeTask=(removeId:string)=>{
        setTasks(tasks.filter(el=>el.id!==removeId))

    }

    const addTask=(newTitle:string)=>{
        let newTask={id: v1(), title: newTitle, isDone: false}
        setTasks([newTask,...tasks])

    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}/>

        </div>
    );
}

export default App;
