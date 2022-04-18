import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValue = 'all' | 'completed' | 'active'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ])

    const addTask = (title:string) => {
        let task={id: v1(), title:title , isDone: false}
        setTasks([task, ...tasks])

        console.log("add task")
    }

    const removeTask = (removeId: string) => {
        setTasks(tasks.filter(el => el.id !== removeId))
        console.log(tasks)
    }

    let [filter, setFilter] = useState<FilterValue>("all")
    let tasksForTodolist = tasks

    if (filter === "active") {
        tasksForTodolist = tasks.filter(el => !el.isDone)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(el => el.isDone)
    }

    const ChangeFilter = (value: FilterValue) => {
        setFilter(value)
    }


    return (<div className="App">
            <TodoList title={"What to learn"}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={ChangeFilter}
                      addTask={addTask}/>


        </div>
    );
}

export default App;
