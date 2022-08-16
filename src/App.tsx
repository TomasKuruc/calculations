import React from 'react';
import './App.css';
import FrontRoutes from "routes/FrontRoutes";
import {Container} from "@mui/material";
import SimpleNav from "components/SimpleNav";

function App() {
  return (
      <Container maxWidth="xl">
          <SimpleNav/>
          <FrontRoutes/>
      </Container>
  );
}

export default App;
