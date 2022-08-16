import React, {useEffect} from 'react';
import {Button, Container, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {useAppDispatch} from "redux/store";
import {reset, setNoEquations} from "redux/calculationsSlice";
import {useNavigate} from "react-router";

interface Props {}

const Home = (props: Props) => {
    const methods = useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(reset());
    }, []);

    const handleStartGame = (data: any): void => {
        if (!data.noc) {
            alert('insert number of calculations')
            return;
        }

        if (parseInt(data.noc) < 20 || parseInt(data.noc) > 60) {
            alert('insert number of calculations from interval <20 ; 60>');
            methods.reset();
            return;
        }

        dispatch(setNoEquations(parseInt(data.noc)));
        navigate('/calculations');
    }

    return (
       <Container maxWidth={'sm'} className={'Homepage'}>
           <Typography variant={'h4'}>NoC</Typography>
           <form onSubmit={methods.handleSubmit(handleStartGame)} className={'Homepage__noc-input-wrap'}>
               <input type="text" {...methods.register('noc')} pattern="[0-9]+"/>
               <Button type={'submit'} variant="contained" className={'Homepage__start-button'}>Start</Button>
           </form>
       </Container>
    );
};

export default Home;