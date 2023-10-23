import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from "../../helpers/AppNavbar";
import {ItPlanningApi} from "../../api/ItPlanningApi";
import {handleLogError} from "../../helpers/ErrorHandler";
import {useAuth} from "../../context/AuthContext";


const FormationForm = () => {

    const auth = useAuth()
    const user = auth.getUser()

    const initialFormState = {
        label: '',
    };

    const [formation, setFormation] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleGetFormations = async () => {
        try {
            const response = await ItPlanningApi.getFormations(user, id);
            if (response.ok) {
                const responseData = await response.json();
                setFormation(responseData);
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error);
        }
    }

    useEffect(() => {
        if (id !== 'new') {
            handleGetFormations();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, setFormation]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormation({ ...formation, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await ItPlanningApi.addOrEditFormation(user, formation);
            if (response.ok) {
                setFormation(initialFormState);
                navigate('/admin/formations');
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error);
        }
    }

    const title = <h2>{formation.id ? 'Modifier une formation' : 'Ajouter une formation'}</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="location">Localisation</Label>
                        <Input type="text" name="label" id="label" value={formation.label || ''}
                               onChange={handleChange} autoComplete="label"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Enregistrer</Button>{' '}
                        <Button color="secondary" tag={Link} to="/admin/formations">Annuler</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default FormationForm;