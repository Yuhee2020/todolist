import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {FullInput} from "./components/FullInput";
import {Container, Grid, Paper,} from "@mui/material";
import ButtonAppBar from "./components/AppBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {addTodoListAC, changeFilterAC, editTodoListTitleAC, removeTodoListAC} from "./redux/todoLists.reducer";
import {addTaskAC, changeStatusAC, editTaskAC, removeTaskAC} from "./redux/tasks.reducer";

export type FilterType = "all" | "active" | "completed"
export type TodoListsType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    const tasks=useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const todoLists=useSelector<AppRootStateType, TodoListsType[]>(state => state.todolists)
    const dispatch=useDispatch()

    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }
    const addTask = (todoListId: string, title: string) => {
        dispatch(addTaskAC(todoListId,title))
    }
    const removeTask = (todoListId: string, taskId: string) => {
        dispatch(removeTaskAC(todoListId,taskId))
    }
    const changeFilter = (todoListId: string, value: FilterType) => {
        dispatch(changeFilterAC(todoListId,value))
            }
    const changeStatus = (todoListId: string, taskId: string, status: boolean) => {
        dispatch(changeStatusAC(todoListId,taskId,status))

    }
    const addTodoList = (title: string) => {
        dispatch(addTodoListAC(title))
    }
    const editTask = (todoListId: string, taskId: string, newTitle: string) => {
        dispatch(editTaskAC(todoListId,taskId,newTitle))
    }
    const editTodoListTitle = (todoListId: string, newTitle: string) => {
        dispatch(editTodoListTitleAC(todoListId,newTitle))
    }

    return (

        <div className="App">

            <Container fixed  style={{ marginLeft: "auto", marginRight: "auto"}}>
                <ButtonAppBar/>
                <Grid container spacing={5} >
                    <Grid item xs={12} style={{textAlign: 'center', marginTop:"20px"}}>
                        <FullInput callBack={addTodoList} />
                    </Grid>


                    {todoLists.map(el => {

                        let taskForTodolist = tasks[el.id]
                        if (el.filter === "active") {
                            taskForTodolist = tasks[el.id].filter(el => !el.isDone)
                        }
                        if (el.filter === "completed") {
                            taskForTodolist = tasks[el.id].filter(el => el.isDone)
                        }

                        return <Grid item key={el.id} style={{ marginLeft: "auto", marginRight: "auto"}} >
                            <Paper elevation={3} style={{padding:"20px"}}>
                            <Todolist
                                key={el.id}
                                todoListId={el.id}
                                title={el.title}
                                tasks={taskForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeStatus={changeStatus}
                                filter={el.filter}
                                removeTodoList={removeTodoList}
                                editTask={editTask}
                                editTodoListTitle={editTodoListTitle}/>
                            </Paper>
                        </Grid>

                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
