import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from "../helpers/AppNavbar";
import {ItPlanningApi} from "../api/ItPlanningApi";
import {handleLogError} from "../helpers/ErrorHandler";
import {useAuth} from "../context/AuthContext";


const CampusForm = () => {

    const auth = useAuth()
    const user = auth.getUser()

    const initialFormState = {
        location: '',
    };

    const [campus, setCampus] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleGetCampuses = async () => {
        try {
            const response = await ItPlanningApi.getCampuses(user, id);
            if (response.ok) {
                const responseData = await response.json();
                setCampus(responseData);
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error);
        }
    }

    useEffect(() => {
        if (id !== 'new') {
            handleGetCampuses();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, setCampus]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCampus({ ...campus, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await ItPlanningApi.addOrEditCampus(user, campus);
            if (response.ok) {
                setCampus(initialFormState);
                navigate('/admin/campuses');
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error);
        }
    }

    const title = <h2>{campus.id ? 'Edit Campus' : 'Add Campus'}</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="location">Localisation</Label>
                        <Input type="text" name="location" id="location" value={campus.location || ''}
                               onChange={handleChange} autoComplete="location"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Enregistrer</Button>{' '}
                        <Button color="secondary" tag={Link} to="/admin/campuses">Annuler</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default CampusForm;