import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    callBack: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownAddTAsk = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) {
            setError(null)
        }

        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        const newTitle = title.trim()

        if (newTitle !== '') {
            props.callBack(newTitle)
            setTitle('')
        } else {
            setError('Title is required')
            setTimeout(() => setError(null), 4000)
        }
    }

    return (
        <div>
            <TextField
                id="outlined-basic"
                label={error ? 'Title is required' : 'title'}
                variant="outlined"
                size={'small'}
                value={title}
                onChange={onChangeInput}
                onKeyDown={onKeyDownAddTAsk}
                error={!!error}
            />

            <Button
                style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}}
                variant="contained"
                onClick={addTaskHandler}
            >+</Button>
        </div>
    );
});

