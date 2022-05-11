import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton} from "@mui/material";
import {AddCircleOutline, Delete} from "@mui/icons-material";

type PropsType={
 callBack:(title:string)=>void
}

export const FullInput=(props:PropsType)=>{
    const [title, setTitle]=useState("")
    const [error, setError]=useState("")

    const addTaskHandler=()=>{
        title.trim() ? props.callBack( title.trim()): setError("title is required")
        setTitle("")
    }
    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
        setError("")
    }
    const onKeyPressHandler=(e:KeyboardEvent<HTMLInputElement>)=>{
        e.key==="Enter" && addTaskHandler()
    }
    return <div>
        <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler} />
        <IconButton onClick={addTaskHandler}>
            <AddCircleOutline/>
        </IconButton>
        {error? <div>{error}</div>: ""}
    </div>
}