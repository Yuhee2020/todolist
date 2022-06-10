import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddCircleOutline} from "@mui/icons-material";

type PropsType = {
    callBack: (title: string) => void
}

export const FullInput = React.memo((props: PropsType) => {
    console.log("FullInput called")
    const [title, setTitle] = useState("")
    const [error, setError] = useState<null | string>(null)

    const addTaskHandler = () => {
        title.trim() ? props.callBack(title.trim()) : setError("title is required")
        setTitle("")
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error !== null && setError(null)
        setTitle(e.currentTarget.value)

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addTaskHandler()

    }
    return <div>

        <TextField
            error={!!error}
            helperText={error ? error : ''}
            id="outlined-basic"
            label="Enter title"
            variant="outlined"
            size={"small"}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}/>
        <IconButton onClick={addTaskHandler}>
            <AddCircleOutline/>
        </IconButton>

    </div>
})

