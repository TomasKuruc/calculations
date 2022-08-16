import React from 'react';
import {Button, Container, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {useAppDispatch} from "redux/store";
import {setNoEquations} from "redux/calculationsSlice";
import {useNavigate} from "react-router";

interface Props {}

const Home = (props: Props) => {
    const methods = useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleStartGame = (data: any): void => {
        console.log('set noc')
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