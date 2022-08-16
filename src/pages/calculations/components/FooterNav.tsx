import React from 'react';
import Timer from "pages/calculations/components/Timer";
import {useAppSelector} from "redux/store";
import {selectFinishedEquations, selectNoEquations} from "redux/calculationsSlice";
import {Grid} from "@mui/material";

interface Props {}

const FooterNav = (props: Props) => {
    const finished = useAppSelector(selectFinishedEquations);
    const noc = useAppSelector(selectNoEquations);

    return (
        <Grid container className={'FooterNav'} justifyContent={'space-between'}>
            <Grid item xs={6} style={{textAlign: "left", fontSize: '30px'}}>
                Finished: {finished} / {noc}
            </Grid>
            <Grid item xs={6} style={{textAlign: "right"}}>
                <Timer/>
            </Grid>
        </Grid>
    );
};

export default FooterNav;