import React from 'react';
import {Grid} from "@mui/material";
import {NavLink} from "react-router-dom";
import clsx from "clsx";
import {useAppSelector} from "redux/store";
import {selectFinishedEquations, selectNoEquations} from "redux/calculationsSlice";

interface Props {}

const SimpleNav = (props: Props) => {
    const finishedEq = useAppSelector(selectFinishedEquations);
    const noc = useAppSelector(selectNoEquations);

    return (
        <Grid container spacing={2} direction={'row'} wrap={'wrap'} className={'App__navigation'}>
            <Grid item xs={8} sm={4} md={3}>
                <NavLink
                    to={'/'}
                    replace
                    className={clsx(({ isActive }: any) => (isActive ? 'active' : ''),
                        finishedEq === noc ? '' : 'disable')}>
                    Homepage
                </NavLink>
            </Grid>
            <Grid item xs={8} sm={4} md={3}>
                <NavLink
                    to={'/calculations'}
                    className={clsx('disabled', ({ isActive }: any) => (isActive ? 'active' : ''))}>
                    Calculations
                </NavLink>
            </Grid>
        </Grid>
    );
};

export default SimpleNav;