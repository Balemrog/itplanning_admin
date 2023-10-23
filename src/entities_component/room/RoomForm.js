import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from "../../helpers/AppNavbar";
import {ItPlanningApi} from "../../api/ItPlanningApi";
import {handleLogError} from "../../helpers/ErrorHandler";
import {useAuth} from "../../context/AuthContext";


const RoomForm = () => {

    const auth = useAuth()
    const user = auth.getUser()

    const initialFormState = {
        material: '',
        roomName: '',
        building: '',
    };

    const [room, setRoom] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleGetRooms = async () => {
        try {
            const response = await ItPlanningApi.getFormations(user, id);
            if (response.ok) {
                const responseData = await response.json();
                setRoom(responseData);
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error);
        }
    }

    useEffect(() => {
        if (id !== 'new') {
            handleGetRooms();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, setRoom]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRoom({ ...room, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await ItPlanningApi.addOrEditRoom(user, room);
            if (response.ok) {
                setRoom(initialFormState);
                navigate('/admin/rooms');
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error);
        }
    }

    const title = <h2>{room.id ? 'Modifier une salle' : 'Ajouter une salle'}</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="material">Matériel</Label>
                        <Input type="material" name="material" id="material" value={room.material || ''}
                               onChange={handleChange} autoComplete="material"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="roomName">Libellé</Label>
                        <Input type="roomName" name="roomName" id="roomName" value={room.roomName || ''}
                               onChange={handleChange} autoComplete="roomName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="building">Libellé</Label>
                        <Input type="building" name="building" id="building" value={room.building || ''}
                               onChange={handleChange} autoComplete="building"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Enregistrer</Button>{' '}
                        <Button color="secondary" tag={Link} to="/admin/rooms">Annuler</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default RoomForm;