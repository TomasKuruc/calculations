import React from 'react';
import {Navigate, Route, Routes} from "react-router";
import SuspenseWrap from "components/SuspenseWrap";

const Home = React.lazy(() => import('pages/home/Home'));
const Calculations = React.lazy(() => import('pages/calculations/Calculations'));

const FrontRoutes = () => {
    return (
        <Routes>
            <Route path={'/calculations'} element={
                <SuspenseWrap>
                    <Calculations/>
                </SuspenseWrap>}/>
            <Route path={'/'} element={
                <SuspenseWrap>
                    <Home/>
                </SuspenseWrap>}/>
            <Route path={'*'} element={<Navigate to={'/'}/>}/>
        </Routes>
    );
};

export default FrontRoutes;