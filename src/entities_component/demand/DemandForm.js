import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from "../../helpers/AppNavbar";
import {ItPlanningApi} from "../../api/ItPlanningApi";
import {handleLogError} from "../../helpers/ErrorHandler";
import {useAuth} from "../../context/AuthContext";


const DemandForm = () => {

    const auth = useAuth()
    const user = auth.getUser()

    const initialFormState = {
        comment: '',
    };

    const [demand, setDemand] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleGetDemands = async () => {
        try {
            const response = await ItPlanningApi.getDemands(user, id);
            if (response.ok) {
                const responseData = await response.json();
                setDemand(responseData);
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error);
        }
    }

    useEffect(() => {
        if (id !== 'new') {
            handleGetDemands();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, setDemand]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDemand({ ...demand, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await ItPlanningApi.addOrEditDemand(user, demand);
            if (response.ok) {
                setDemand(initialFormState);
                navigate('/demands');
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error);
        }
    }

    const title = <h2>{demand.id ? 'Modifier une demande' : 'Ajouter une demande'}</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="comment">Commentaire</Label>
                        <Input type="text" name="comment" id="comment" value={demand.comment || ''}
                               onChange={handleChange} autoComplete="comment"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Enregistrer</Button>{' '}
                        <Button color="secondary" tag={Link} to="/demands">Annuler</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default DemandForm;