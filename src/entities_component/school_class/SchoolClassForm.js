import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from "../../helpers/AppNavbar";
import {ItPlanningApi} from "../../api/ItPlanningApi";
import {handleLogError} from "../../helpers/ErrorHandler";
import {useAuth} from "../../context/AuthContext";


const SchoolClassForm = () => {

    const auth = useAuth()
    const user = auth.getUser()

    const initialFormState = {
        label: '',
    };

    const [schoolClass, setSchoolClass] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleGetSchoolClasses = async () => {
        try {
            const response = await ItPlanningApi.getSchoolClasses(user, id);
            if (response.ok) {
                const responseData = await response.json();
                setSchoolClass(responseData);
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error);
        }
    }

    useEffect(() => {
        if (id !== 'new') {
            handleGetSchoolClasses();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, setSchoolClass]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSchoolClass({ ...schoolClass, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await ItPlanningApi.addOrEditSchoolClass(user, schoolClass);
            if (response.ok) {
                setSchoolClass(initialFormState);
                navigate('/admin/school-classes');
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error);
        }
    }

    const title = <h2>{schoolClass.id ? 'Modifier une promotion' : 'Ajouter une promotion'}</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="label">Libellé</Label>
                        <Input type="text" name="label" id="label" value={schoolClass.label || ''}
                               onChange={handleChange} autoComplete="label" required/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Enregistrer</Button>{' '}
                        <Button color="secondary" tag={Link} to="/admin/school-classes">Annuler</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default SchoolClassForm;