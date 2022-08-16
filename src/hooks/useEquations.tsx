import React, {useEffect} from 'react';
import {addEquation, resetEquations, selectNoEquations} from "redux/calculationsSlice";
import {generateRandomID} from "utils/generateRandomID";
import {useAppDispatch, useAppSelector} from "redux/store";


const useEquations = (): void => {
    const dispatch = useAppDispatch();
    const noc = useAppSelector(selectNoEquations);

    const getRandomInt = (min: number = 1, max: number = 10): number => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    const findQuotient = (n: number, m: number, length: number = 10): number => {
        if (n < m || n === 0) return 0;

        if (n - m === 1) return 1;

        // n / m = r
        // dividend / divisor = quotient
        const numbers = Array.from(Array(length), (_, index) => index + 1)
        let r: number = 0;

        numbers.map(number => {
            if (m * number === n) {
                r = number;
            }
        });

        // if r === 0 it means that we didn't find quotient, so we want to find the closest one
        if (r === 0) {
            r = numbers.reduce((prev: number, current: number) => {
               return m * current < n
                   ? current
                   : prev;
            })
        }

        return r;
    }

    const getRandomArithmeticOperation = (): string => {
        const operation = getRandomInt(1, 5);

        switch (operation) {
            case 1:
                return '+';
            case 2:
                return '-';
            case 3:
                return 'x';
            case 4:
                return '/'
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
            case 'x':
                return n * m;
            case '/':
                return findQuotient(n, m);
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
            correct_answer: r,
            completed: false
        }));
    }

    useEffect(() => {
        for (let i = 0; i < noc; i++) {
            generateEquation();
        }

        return () => {
            dispatch(resetEquations());
        }
    }, []);
};

export default useEquations;