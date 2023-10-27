import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from "../../helpers/AppNavbar";
import {ItPlanningApi} from "../../api/ItPlanningApi";
import {handleLogError} from "../../helpers/ErrorHandler";
import {useAuth} from "../../context/AuthContext";


const TeacherForm = () => {

    const auth = useAuth()
    const user = auth.getUser()

    const initialFormState = {
        firstName: '',
        lastName: '',
        isEmployee: false,
        lessons: [],
    };

    const [teacher, setTeacher] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();
    const [lessons, setLessons] = useState([]);

    const handleGetTeachers = async () => {
        try {
            const response = await ItPlanningApi.getTeachers(user, id);
            if (response.ok) {
                const responseData = await response.json();
                setTeacher(responseData);
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error);
        }
    }

    const handleGetLessons = async () => {
        try {
            const response = await ItPlanningApi.getLessons(user)
            if (response.ok) {
                const responseData = await response.json();
                setLessons(responseData)
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error)
        }
    }

    useEffect(() => {
        if (id !== 'new') {
            handleGetTeachers();
        }
        handleGetLessons();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, setTeacher]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === "checkbox") {
            setTeacher({ ...teacher, [name]: checked });
        } else if (name === "lessons") {
            const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
            setTeacher({ ...teacher, [name]: selectedOptions });
        } else {
            setTeacher({ ...teacher, [name]: value });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await ItPlanningApi.addOrEditTeacher(user, teacher);
            if (response.ok) {
                setTeacher(initialFormState);
                navigate('/admin/teachers');
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error);
        }
    }

    const title = <h2>{teacher.id ? 'Modifier un enseignant' : 'Ajouter un enseignant'}</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="firstName">Prénom</Label>
                        <Input type="text" name="firstName" id="firstName" value={teacher.firstName || ''}
                               onChange={handleChange} autoComplete="firstName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Nom</Label>
                        <Input type="text" name="lastName" id="lastName" value={teacher.lastName || ''}
                               onChange={handleChange} autoComplete="lastName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="isEmployee">Est interne</Label>
                        <Input type="checkbox" name="isEmployee" id="isEmployee" checked={teacher.isEmployee}
                               onChange={handleChange} autoComplete="isEmployee"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lessons">Compétences sur les cours :</Label>
                        <Input type="select" name="lessons" id="lessons" multiple value={teacher.lessons || []}
                               onChange={handleChange} autoComplete="campus">
                            <option disabled>Sélectionnez les cours</option>
                            {lessons.map((lesson) => (
                                <option key={lesson.id} data-key={lesson.id} value={lesson.id}>
                                    {lesson.label}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Enregistrer</Button>{' '}
                        <Button color="secondary" tag={Link} to="/admin/teachers">Annuler</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default TeacherForm;