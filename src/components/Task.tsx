import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditSpan} from "./EditSpan";
import {Delete} from "@mui/icons-material";

const onClickHandler = () => {
    props.removeTask(props.todoListId, el.id)
}
const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeStatus(props.todoListId, el.id, e.currentTarget.checked)
}
const callBackHandler=(newTitle: string)=>{
    editTask(el.id,newTitle)
}

return <div key={el.id}>
    <Checkbox checked={el.isDone} onChange={changeStatusHandler} color="success"/>
    <EditSpan  callBack={callBackHandler}
               title={el.title}/>
    <IconButton aria-label="delete" onClick={onClickHandler}>
        <Delete />
    </IconButton>
</div>