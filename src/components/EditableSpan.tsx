import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState('')

    const onDoubleClickHandler = () => {
        setEdit(true)
        setTitle(props.title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onBlurHandler = () => {
        setEdit(!edit)
        props.callBack(title)
    }

    return (
        <>
            {edit
                ? <input value={title} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
                : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
            }
        </>
    );
};
