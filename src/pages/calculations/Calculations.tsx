import React from 'react';
import {Container, Grid} from "@mui/material";
import {useAppSelector} from "redux/store";
import {selectEquations} from "redux/calculationsSlice";
import useEquations from "hooks/useEquations";
import Equation from "pages/calculations/components/Equation";

interface Props {}

const Calculations = (props: Props) => {
    const equations = useAppSelector(selectEquations);

    useEquations();

    return (
        <Container>
            <Grid container className={'Calculations'}>
                {equations.map(eq => (
                    <Equation key={eq.eid} {...eq}/>
                ))}
            </Grid>
        </Container>
    );
};

export default Calculations;