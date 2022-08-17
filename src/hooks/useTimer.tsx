import React, {useEffect, useState} from 'react';
import {useAppSelector} from "redux/store";
import {selectFinishedEquations, selectNoEquations} from "redux/calculationsSlice";

interface ReturnTypes {
    timer: number
}

const useTimer = (): ReturnTypes => {
    const finishedEq = useAppSelector(selectFinishedEquations);
    const noc = useAppSelector(selectNoEquations);
    const [isActive, setIsActive] = useState<boolean>(true);
    const [timer, setTimer] = useState<number>(0);

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
    }, [finishedEq]);

    return {timer};
};

export default useTimer;