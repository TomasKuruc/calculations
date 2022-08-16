import React from 'react';
import {Container, Grid} from "@mui/material";
import {useAppSelector} from "redux/store";
import {selectEquations} from "redux/calculationsSlice";
import useEquations from "hooks/useEquations";
import Equation from "pages/calculations/components/Equation";
import useCatchRefresh from "hooks/useCatchRefresh";
import FooterNav from "pages/calculations/components/FooterNav";

interface Props {}

const Calculations = (props: Props) => {
    const equations = useAppSelector(selectEquations);

    useEquations();
    useCatchRefresh();

    return (
        <Container>
            <Grid container className={'Calculations'}>
                {equations.map(eq => (
                    <Equation key={eq.eid} {...eq}/>
                ))}
            </Grid>
            <FooterNav/>
        </Container>
    );
};

export default Calculations;