import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {RootState} from "redux/store";

export interface Equation {
    eid: string,
    ar_operation: string,
    op_n: number,
    op_m: number,
    eq: string,
    correct_answer: number,
    user_answer?: number,
    completed: boolean
}

interface MutateOptions {
    eid: string,
    key: string,
    value: string | number | boolean
}

interface CalculationsState {
    equations: Equation[],
    no_equations: number,
    finished_eq: number
}

const initialState: CalculationsState = {
    equations: [],
    no_equations: 0,
    finished_eq: 0
}

export const calculationsSlice = createSlice({
    name: 'calculations',
    initialState,
    reducers: {
        addEquation: (state, action: PayloadAction<Equation>) => {
            state.equations.push(action.payload);
        },
        mutateEquation: (state, action: PayloadAction<MutateOptions[]>) => {
            Promise.all(action.payload.map((equation: MutateOptions) => {
                const eqIndex = state.equations.findIndex(eq => eq.eid === equation.eid);

                if (eqIndex === -1 || eqIndex === undefined) {
                    return;
                }

                state.equations[eqIndex] = {
                    ...state.equations[eqIndex],
                    [equation.key]: equation.value
                };
            }));
        },
        setNoEquations: (state, action: PayloadAction<number>) => {
            state.no_equations = action.payload;
        },
        incrementCounterOfFinishedEquations: (state, action: PayloadAction<void>) => {
            state.finished_eq = state.equations.filter(eq => eq.completed).length;
        },

        reset: (state, action: PayloadAction<void>) => {
            Object.assign(state, initialState);
        },
        resetEquations: (state, action: PayloadAction<void>) => {
            state.equations = [];
            state.finished_eq = 0;
        }
    },
})

export const {
    addEquation,
    resetEquations,
    incrementCounterOfFinishedEquations,
    setNoEquations,
    mutateEquation,
    reset
} = calculationsSlice.actions;

export const selectEquations = (state: RootState) => state.calculations.equations;
export const selectNoEquations = (state: RootState) => state.calculations.no_equations;
export const selectFinishedEquations = (state: RootState) => state.calculations.finished_eq;

export default calculationsSlice.reducer;