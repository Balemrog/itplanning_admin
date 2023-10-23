import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from "../../helpers/AppNavbar";
import {ItPlanningApi} from "../../api/ItPlanningApi";
import {handleLogError} from "../../helpers/ErrorHandler";
import {useAuth} from "../../context/AuthContext";


const StudentForm = () => {

    const auth = useAuth()
    const user = auth.getUser()

    const initialFormState = {
        firstName: '',
        lastName: '',
    };

    const [student, setStudent] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleGetStudents = async () => {
        try {
            const response = await ItPlanningApi.getStudents(user, id);
            if (response.ok) {
                const responseData = await response.json();
                setStudent(responseData);
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error);
        }
    }

    useEffect(() => {
        if (id !== 'new') {
            handleGetStudents();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, setStudent]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStudent({ ...student, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await ItPlanningApi.addOrEditStudent(user, student);
            if (response.ok) {
                setStudent(initialFormState);
                navigate('/admin/students');
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error);
        }
    }

    const title = <h2>{student.id ? 'Modifier un élève' : 'Ajouter un élève'}</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="firstName">Prénom</Label>
                        <Input type="firstName" name="firstName" id="firstName" value={student.firstName || ''}
                               onChange={handleChange} autoComplete="firstName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Nom</Label>
                        <Input type="lastName" name="lastName" id="lastName" value={student.lastName || ''}
                               onChange={handleChange} autoComplete="lastName"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Enregistrer</Button>{' '}
                        <Button color="secondary" tag={Link} to="/admin/students">Annuler</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default StudentForm;