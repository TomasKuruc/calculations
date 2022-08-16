import React from 'react';
import {Grid} from "@mui/material";
import {NavLink} from "react-router-dom";
import clsx from "clsx";

interface Props {}

const SimpleNav = (props: Props) => {
    return (
        <Grid container spacing={2} direction={'row'} wrap={'wrap'} className={'App__navigation'}>
            <Grid item xs={8} sm={4} md={3}>
                <NavLink
                    to={'/'}
                    className={({ isActive }) => (isActive ? 'active' : 'disabled')}>
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