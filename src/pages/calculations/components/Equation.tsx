import React from 'react';
import {Grid} from "@mui/material";
import {useForm} from "react-hook-form";
import {useAppDispatch} from "redux/store";
import {incrementCounterOfFinishedEquations, mutateEquation} from "redux/calculationsSlice";
import clsx from "clsx";

interface Props {
    eid: string,
    eq: string,
    completed: boolean,
    correct_answer: number,
    user_answer?: number
}

const Equation = (props: Props) => {
    const dispatch = useAppDispatch();
    const methods = useForm();
    const bgColor: string = props.user_answer === props.correct_answer ? 'green-bg' : 'red-bg'

    const handleSubmitEqAnswer = (data: any): void => {
        if (!data.value) {
            alert('please insert result!')
            return;
        }

        if (props.completed) {
            return;
        }

        dispatch(mutateEquation([{
            eid: data.eid,
            key: "user_answer",
            value: parseInt(data.value)
        }, {
            eid: data.eid,
            key: "completed",
            value: true
        }]));

        dispatch(incrementCounterOfFinishedEquations());
    }

    return (
        <Grid item xs={2}
              className={clsx('Calculations__grid-item',
                  props.completed && bgColor)}>
            <form onSubmit={methods.handleSubmit(handleSubmitEqAnswer)} className={'Calculations__eq-wrap'}>
                <div style={{textAlign: 'center', fontSize: '25px'}}>
                    {props.eq}
                </div>
                <div className={'Calculations__input-wrap'}>
                    <input type="hidden" {...methods.register('eid')} defaultValue={props.eid}/>
                    <input type="text" {...methods.register('value')} disabled={props.completed} pattern="^[-+]?[0-9]"/>
                </div>
            </form>
        </Grid>
    );
};

export default Equation;