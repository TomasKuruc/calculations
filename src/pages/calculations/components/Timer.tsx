import React from 'react';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

interface Props {}

const Timer = (props: Props) => {
    return (
        <div className="Timer">
            <TimerOutlinedIcon className={'TimerIcon'}/>
        </div>
    );
};

export default Timer;