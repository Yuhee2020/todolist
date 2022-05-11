import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterType = "all" | "active" | "completed"
export type TodoListsType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksType={
    [key:string]:Array<TaskType>
}

function App() {


    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });
    const removeTodoList=(todoListId: string)=>{
        setTodoLists(todoLists.filter(el=>el.id!==todoListId))
    }
    const addTask = (todoListId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const removeTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(el => el.id !== taskId)})
    }
    const changeFilter = (todoListId: string, value: FilterType) => {
        setTodoLists(todoLists.map(el => el.id === todoListId ? {...el, filter: value} : el))
    }
    const changeStatus = (todoListId: string, taskId: string, status: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, isDone: status} : el)})
    }


    return (
        <div className="App">

            {todoLists.map(el => {

                let taskForTodolist = tasks[el.id]
                if (el.filter === "active") {
                    taskForTodolist = tasks[el.id].filter(el => !el.isDone)
                }
                if (el.filter === "completed") {
                    taskForTodolist = tasks[el.id].filter(el => el.isDone)
                }

                return <Todolist
                    key={el.id}
                    todoListId={el.id}
                    title={el.title}
                    tasks={taskForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={el.filter}
                    removeTodoList={removeTodoList}/>

            })}


        </div>
    );
}

export default App;
