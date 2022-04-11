import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    console.log(v1())

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    const addTask=(title:string)=>{
        let task: TaskType={id: v1(), title: title, isDone: false }
        let NewTask=[task,...tasks]
        setTasks(NewTask)
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <TodoList title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter} />
        </div>
    );
}

export default App;
