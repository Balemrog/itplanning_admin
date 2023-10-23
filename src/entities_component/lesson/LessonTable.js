import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../helpers/AppNavbar';
import { Link } from 'react-router-dom';
import {useAuth} from "../../context/AuthContext";
import {ItPlanningApi} from "../../api/ItPlanningApi";
import {handleLogError} from "../../helpers/ErrorHandler";

const LessonTable = () => {

    const auth = useAuth()
    const user = auth.getUser()

    const [lessons, setLessons] = useState({
        data: []
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleGetLessons()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleGetLessons = async () => {
        try {
            setIsLoading(true)
            const response = await ItPlanningApi.getLessons(user)
            if (response.ok) {
                const responseData = await response.json();
                setLessons(responseData)
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
            const response = await ItPlanningApi.deleteLesson(user, id)
            if (response.ok) {
                await handleGetLessons();
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

    const lessonList = lessons.data.map(lesson => {
        const label = `${lesson.label || ''}`;
        return <tr key={lesson.id}>
            <td>{label}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/admin/lessons/" + lesson.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(lesson.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/admin/lessons/new">Ajouter un cours</Button>
                </div>
                <h3>Cours</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Nom du cours</th>
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {lessonList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default LessonTable;