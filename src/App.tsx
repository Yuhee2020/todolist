import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {FullInput} from "./components/FullInput";
import {Container, Grid, Paper,} from "@mui/material";
import ButtonAppBar from "./components/AppBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {addTodoListAC} from "./redux/todoLists.reducer";

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
    console.log("App called")
    const todoLists = useSelector<AppRootStateType, TodoListsType[]>(state => state.todolists)
    const dispatch = useDispatch()
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [])

    return (

        <div className="App">
            <Container fixed style={{marginLeft: "auto", marginRight: "auto"}}>
                <ButtonAppBar/>
                <Grid container spacing={5}>
                    <Grid item xs={12} style={{textAlign: 'center', marginTop: "20px"}}>
                        <FullInput callBack={addTodoList}/>
                    </Grid>
                    {todoLists.map(el => {
                        return <Grid item key={el.id} style={{marginLeft: "auto", marginRight: "auto"}}>
                            <Paper elevation={3} style={{padding: "20px"}}>
                                <Todolist
                                    todolist={el}
                                    key={el.id}
                                />
                            </Paper>
                        </Grid>

                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
