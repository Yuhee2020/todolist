import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterType="all"| "active" | "completed"

function App() {

    const [filter, setFilter] = useState<FilterType>("all")
    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
    ])

    const addTask=(title:string)=>{
        let newTask={id: v1(), title: title, isDone: false}
        setTasks([newTask,...tasks])
    }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(el => el.id !== taskId))
    }
    const changeFilter=(value:FilterType)=>{
        setFilter(value)
    }
    const changeStatus=(taskId: string, status:boolean)=>{
        setTasks(tasks.map(el=>el.id===taskId? {...el, isDone:status}:el))
    }



    let taskForTodolist=tasks
    if(filter==="active"){taskForTodolist=tasks.filter(el=>!el.isDone)}
    if(filter==="completed"){taskForTodolist=tasks.filter(el=>el.isDone)}


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}/>

        </div>
    );
}

export default App;
