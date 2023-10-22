import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../helpers/AppNavbar';
import { Link } from 'react-router-dom';
import {useAuth} from "../context/AuthContext";
import {ItPlanningApi} from "../api/ItPlanningApi";
import {handleLogError} from "../helpers/ErrorHandler";

const Teacher = () => {

    const auth = useAuth()
    const user = auth.getUser()

    const [teachers, setTeachers] = useState({
        data: []
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleGetTeachers()
    }, [])

    const handleGetTeachers = async () => {
        try {
            setIsLoading(true)
            const response = await ItPlanningApi.getTeachers(user)
            if (response.ok) {
                const responseData = await response.json();
                setTeachers(responseData)
            } else {
                // Handle errors if the response status is not in the 200 range
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error)
        } finally {
            setIsLoading(false)
        }
    }

    const remove = async (id) => {
        await fetch(`/api/teacher/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedTeachers = [...teachers].filter(i => i.id !== id);
            setTeachers(updatedTeachers);
        });
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const teacherList = teachers.data.map(teacher => {
        const firstname = `${teacher.firstName || ''}`;
        const lastname = `${teacher.lastName || ''}`;
        const isEmployee = `${teacher.employee || ''}`;
        return <tr key={teacher.id}>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{isEmployee}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/teachers/" + teacher.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(teacher.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/teacher/new">Ajouter enseignant</Button>
                </div>
                <h3>Enseignants</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Nom</th>
                        <th width="20%">Prénom</th>
                        <th width="10%">Interne</th>
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {teacherList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default Teacher;