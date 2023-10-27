import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../helpers/AppNavbar';
import { Link } from 'react-router-dom';
import {useAuth} from "../../context/AuthContext";
import {ItPlanningApi} from "../../api/ItPlanningApi";
import {handleLogError} from "../../helpers/ErrorHandler";

const StudentTable = () => {

    const auth = useAuth()
    const user = auth.getUser()

    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleGetStudents()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleGetStudents = async () => {
        try {
            setIsLoading(true)
            const response = await ItPlanningApi.getStudents(user)
            if (response.ok) {
                const responseData = await response.json();
                setStudents(responseData)
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
            const response = await ItPlanningApi.deleteStudent(user, id)
            if (response.ok) {
                await handleGetStudents();
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

    const studentList = students.map(student => {
        const firstName = `${student.firstName || ''}`;
        const lastName = `${student.lastName || ''}`;
        const modality = `${student.modality || ''}`;
        const schoolClass = `${student.schoolClass.label || ''}`;
        const formation = `${student.formation.label || ''}`;
        return <tr key={student.id}>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{modality}</td>
            <td>{schoolClass}</td>
            <td>{formation}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/admin/students/" + student.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(student.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/admin/students/new">Ajouter un élève</Button>
                </div>
                <h3>Élèves</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Prénom</th>
                        <th width="20%">Nom</th>
                        <th width="20%">Modalité</th>
                        <th width="20%">Promotion</th>
                        <th width="20%">Formation</th>
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {studentList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default StudentTable;