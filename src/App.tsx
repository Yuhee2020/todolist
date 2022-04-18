import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type FilterValue = 'all' | 'completed' | 'active'

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ])

    const removeTask = (removeId: number) => {
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
                      changeFilter={ChangeFilter}/>


        </div>
    );
}

export default App;
