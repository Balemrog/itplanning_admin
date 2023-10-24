import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from "../../helpers/AppNavbar";
import {ItPlanningApi} from "../../api/ItPlanningApi";
import {handleLogError} from "../../helpers/ErrorHandler";
import {useAuth} from "../../context/AuthContext";


const LessonForm = () => {

    const auth = useAuth()
    const user = auth.getUser()

    const initialFormState = {
        label: '',
    };

    const [lesson, setLesson] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleGetLessons = async () => {
        try {
            const response = await ItPlanningApi.getLessons(user, id);
            if (response.ok) {
                const responseData = await response.json();
                setLesson(responseData);
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error);
        }
    }

    useEffect(() => {
        if (id !== 'new') {
            handleGetLessons();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, setLesson]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLesson({ ...lesson, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await ItPlanningApi.addOrEditLesson(user, lesson);
            if (response.ok) {
                setLesson(initialFormState);
                navigate('/admin/lessons');
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error);
        }
    }

    const title = <h2>{lesson.id ? 'Modifier un cours' : 'Ajouter un cours'}</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="label">Nom du cours</Label>
                        <Input type="text" name="label" id="label" value={lesson.label || ''}
                               onChange={handleChange} autoComplete="label"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Enregistrer</Button>{' '}
                        <Button color="secondary" tag={Link} to="/admin/lessons">Annuler</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default LessonForm;