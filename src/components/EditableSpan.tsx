import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState('')

    const onDoubleClickHandler = () => {

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

    }

    const onBlurHandler = () => {

    }

    return (
        <>
            {edit
                ? <input value={title} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
                : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
            }
        </>
    );
});
