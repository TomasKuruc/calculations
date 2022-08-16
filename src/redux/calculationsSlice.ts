import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {RootState} from "redux/store";

export interface Equation {
    eid: string,
    ar_operation: string,
    op_n: number,
    op_m: number,
    eq: string,
    answer: number,
    completed: boolean
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
        incrementCounterOfFinishedEquations: (state, action: PayloadAction<void>) => {
            state.finished_eq = state.equations.filter(eq => eq.completed).length;
        },

        resetEquations: (state, action: PayloadAction<void>) => {
            Object.assign(state, initialState);
        }
    },
})

export const { addEquation, resetEquations, incrementCounterOfFinishedEquations } = calculationsSlice.actions;

export const selectEquations = (state: RootState) => state.calculations.equations;

export default calculationsSlice.reducer;