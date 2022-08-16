import React, {useEffect} from 'react';
import {addEquation, Equation, incrementCounterOfFinishedEquations, resetEquations} from "redux/calculationsSlice";
import {generateRandomID} from "utils/generateRandomID";
import {useAppDispatch} from "redux/store";


const useEquations = (noc: number): void => {
    const dispatch = useAppDispatch();

    const getRandomInt = (min: number = 1, max: number = 10): number => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    const getRandomArithmeticOperation = (): string => {
        const operation = getRandomInt(1, 4);

        switch (operation) {
            case 1:
                return '+';
            case 2:
                return '-';
            case 3:
                return '*';
            default:
                return '+'
        }
    }

    const calculateEquation = (n: number, m: number, op: string): number => {
        switch (op) {
            case '+':
                return n + m;
            case '-':
                return n - m;
            case '*':
                return n * m;
            default:
                return 0;
        }
    }

    const generateEquation = (): void => {
        const N = getRandomInt();
        const M = getRandomInt();
        const op = getRandomArithmeticOperation();
        const r = calculateEquation(N, M, op);

        dispatch(addEquation({
            eid: generateRandomID(),
            ar_operation: op,
            op_n: N,
            op_m: M,
            eq: `${N} ${op} ${M} =`,
            answer: r,
            completed: false
        }));
    }

    useEffect(() => {
        dispatch(resetEquations());

        for (let i = 0; i < noc; i++) {
            generateEquation();
        }
    }, []);
};

export default useEquations;