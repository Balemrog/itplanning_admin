import React from 'react';
import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import TeacherTable from "./entities_component/teacher/TeacherTable";
import Login from "./login/Login";
import PrivateRoute from "./helpers/PrivateRoute";
import AdminRoute from "./helpers/AdminRoute";
import { AuthProvider } from "./context/AuthContext";
import TeacherForm from "./entities_component/teacher/TeacherForm";
import CampusTable from "./entities_component/campus/CampusTable";
import CampusForm from "./entities_component/campus/CampusForm";
import FormationTable from "./entities_component/formation/FormationTable";
import FormationForm from "./entities_component/formation/FormationForm";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
                    <Route path='/admin/teachers' element={<AdminRoute><TeacherTable/></AdminRoute>}/>
                    <Route path='/admin/teachers/:id' element={<AdminRoute><TeacherForm/></AdminRoute>}/>
                    <Route path='/admin/campuses' element={<AdminRoute><CampusTable/></AdminRoute>}/>
                    <Route path='/admin/campuses/:id' element={<AdminRoute><CampusForm/></AdminRoute>}/>
                    <Route path='/admin/formations' element={<AdminRoute><FormationTable/></AdminRoute>}/>
                    <Route path='/admin/formations/:id' element={<AdminRoute><FormationForm/></AdminRoute>}/>
                    <Route path="*" element={<Navigate to="/" />}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App;