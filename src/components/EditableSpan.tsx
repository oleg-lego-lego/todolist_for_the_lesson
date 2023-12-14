import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
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

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onBlurHandler()
        }
    }

    return (
        <>
            {edit
                ? <input id={`change ${title}`}
                         value={title}
                         onChange={onChangeHandler}
                         onBlur={onBlurHandler} autoFocus
                         onKeyDown={onKeyDownHandler}
                />
                : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
            }
        </>
    );
});
