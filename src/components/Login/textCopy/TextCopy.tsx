import {useState} from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type TextCopyPropsType = {
    text: string;
}

export const TextCopy = (props: TextCopyPropsType) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
        navigator.clipboard.writeText(props.text).then();
        setTimeout(() => setOpen(false), 1000);
    };

    return (
        <Tooltip title={'Copied'} open={open} placement={'bottom'} followCursor>
             <span>
                {props.text}
                 <IconButton onClick={handleClick} style={{marginLeft: '5px'}}>
                    <ContentCopyIcon/>
                </IconButton>
            </span>
        </Tooltip>
    );
};

