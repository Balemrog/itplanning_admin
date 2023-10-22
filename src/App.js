import React from 'react';
import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Teacher from "./teacher/Teacher";
import Login from "./login/Login";
import PrivateRoute from "./helpers/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
                    <Route path='/teachers' element={<PrivateRoute><Teacher/></PrivateRoute>}/>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App;