import React from 'react';

type TaskDescriptionPropsType = {
    title: string
}

export const TaskDescription = (props: TaskDescriptionPropsType) => {
    return (
        <div className={'task__description'}>
            {props.title}
        </div>
    );
};
