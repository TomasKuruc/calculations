import React from 'react';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import useTimer from "hooks/useTimer";

interface Props {}

const Timer = (props: Props) => {
   const {timer} = useTimer();


    return (
        <div className="Timer">
            <span>{Math.floor(timer / 1000)}s</span>
            <TimerOutlinedIcon className={'TimerIcon'}/>
        </div>
    );
};

export default Timer;