import React, {useEffect, useState} from 'react';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import {useAppSelector} from "redux/store";
import {selectFinishedEquations, selectNoEquations} from "redux/calculationsSlice";

interface Props {}

const Timer = (props: Props) => {
    const finishedEq = useAppSelector(selectFinishedEquations);
    const noc = useAppSelector(selectNoEquations);
    const [isActive, setIsActive] = useState(true);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval: any = null;

        if (isActive) {
            interval = setInterval(() => {
                setTimer((time) => time + 1000);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive]);


    useEffect(() => {
        if (finishedEq === noc) {
            setIsActive(false);
        }
    }, [finishedEq])


    return (
        <div className="Timer">
            <span>{Math.floor(timer / 1000)}s</span>
            <TimerOutlinedIcon className={'TimerIcon'}/>
        </div>
    );
};

export default Timer;