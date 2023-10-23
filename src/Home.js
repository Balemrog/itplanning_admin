import React from 'react';
import './App.css';
import AppNavbar from './helpers/AppNavbar';
import { Container } from 'reactstrap';
import SearchPlanning from "./planning/SearchPlanning";
import Planning from "./planning/Planning";

const Home = () => {
    return (
        <div>
            <AppNavbar/>
            <Container>
                <SearchPlanning/>
                <Planning/>
            </Container>
        </div>
    );
}

export default Home;