import React from 'react';
import './App.css';
import AppNavbar from './helpers/AppNavbar';
import { Container } from 'reactstrap';
import SearchPlanning from "./planning/SearchPlanning";

const Home = () => {
    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <SearchPlanning/>
            </Container>
        </div>
    );
}

export default Home;