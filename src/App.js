import React from 'react';
import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import TeacherTable from "./teacher/TeacherTable";
import Login from "./login/Login";
import PrivateRoute from "./helpers/PrivateRoute";
import AdminRoute from "./helpers/AdminRoute";
import { AuthProvider } from "./context/AuthContext";
import TeacherForm from "./teacher/TeacherForm";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
                    <Route path='/admin/teachers' element={<AdminRoute><TeacherTable/></AdminRoute>}/>
                    <Route path='/admin/teachers/:id' element={<AdminRoute><TeacherForm/></AdminRoute>}/>
                    <Route path="*" element={<Navigate to="/" />}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App;