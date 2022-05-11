import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    title: string
    callBack: (newTitle:string)=>void
}


export const EditSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)

    const setEditMode = () => {
        setEdit(!edit)
        props.callBack(newTitle)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key == "Enter" && setEditMode()

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (edit
            ? <input
                value={newTitle}
                onBlur={setEditMode}
                onKeyPress={onKeyPressHandler}
                autoFocus
                onChange={onChangeHandler}/>
            : <span onDoubleClick={setEditMode}>{props.title}</span>
    )
}