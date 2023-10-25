import React from 'react';
import './App.css';
import AppNavbar from './helpers/AppNavbar';
import { Container } from 'reactstrap';
import SearchPlanning from "./planning/SearchPlanning";
import Planning from "./planning/Planning";
import {useAuth} from "./context/AuthContext";
import {useNavigate} from "react-router-dom";

const Home = () => {
    return (
        <div>
            <AppNavbar/>
            <Container>
                <SearchPlanning/>
                <Planning user={useAuth().getUser()} navigate={useNavigate()}/>
            </Container>
        </div>
    );
}

export default Home;