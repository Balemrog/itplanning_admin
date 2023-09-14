import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Teacher from "./Teacher";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path='/teachers' exact={true} element={<Teacher/>}/>
            </Routes>
        </Router>
    )
}

export default App;