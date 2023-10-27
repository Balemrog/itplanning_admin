import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../helpers/AppNavbar';
import { Link } from 'react-router-dom';
import {useAuth} from "../../context/AuthContext";
import {ItPlanningApi} from "../../api/ItPlanningApi";
import {handleLogError} from "../../helpers/ErrorHandler";

const TeacherTable = () => {

    const auth = useAuth()
    const user = auth.getUser()

    const [teachers, setTeachers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleGetTeachers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        try {
            const response = await ItPlanningApi.deleteTeacher(user, id)
            if (response.ok) {
                await handleGetTeachers();
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error)
        }
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const teacherList = teachers.map(teacher => {
        const firstname = `${teacher.firstName || ''}`;
        const lastname = `${teacher.lastName || ''}`;
        const isEmployee = teacher.isEmployee || false;
        const lessons = teacher.lessons || [];
        const lessonLabels = lessons.map(lesson => lesson.label).join(', ');


        return <tr key={teacher.id}>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>
                <input type="checkbox" checked={isEmployee} disabled />
            </td>
            <td>{lessonLabels}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/admin/teachers/" + teacher.id}>Edit</Button>
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
                    <Button color="success" tag={Link} to="/admin/teachers/new">Ajouter un enseignant</Button>
                </div>
                <h3>Enseignants</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Nom</th>
                        <th width="20%">Prénom</th>
                        <th width="10%">Interne</th>
                        <th width="10%">Compétences sur les cours</th>
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

export default TeacherTable;