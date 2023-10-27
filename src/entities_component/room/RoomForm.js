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
        campus: {
            id: '',
            location: '',
        },
    };

    const [room, setRoom] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();
    const [campuses, setCampuses] = useState([]);

    const handleGetRooms = async () => {
        try {
            const response = await ItPlanningApi.getRooms(user, id);
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
    const handleGetCampuses = async () => {
        try {
            const response = await ItPlanningApi.getCampuses(user)
            if (response.ok) {
                const responseData = await response.json();
                setCampuses(responseData)
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error)
        }
    }

    useEffect(() => {
        if (id !== 'new') {
            handleGetRooms();
        }
        handleGetCampuses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, setRoom]);

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        if (type === "select-one") {
            const selectedIndex  = event.target.options.selectedIndex;
            const id = event.target.options[selectedIndex].getAttribute('data-key')
            setRoom({...room, campus: {
                    ...room.campus,
                    id: id,
                    location: value}
            });
        } else {
            setRoom({ ...room, [name]: value });
        }
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
                        <Input type="text" name="material" id="material" value={room.material || ''}
                               onChange={handleChange} autoComplete="material" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="roomName">Nom de la salle</Label>
                        <Input type="text" name="roomName" id="roomName" value={room.roomName || ''}
                               onChange={handleChange} autoComplete="roomName" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="building">Bâtiment</Label>
                        <Input type="text" name="building" id="building" value={room.building || ''}
                               onChange={handleChange} autoComplete="building" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="campus">Campus</Label>
                        <Input type="select" name="campus" id="campus" value={room.campus.location || ''}
                               onChange={handleChange} autoComplete="campus" required>
                            <option value="">Sélectionnez le campus</option>
                            {campuses.map((campus) => (
                                <option key={campus.id} data-key={campus.id} value={campus.location}>
                                    {campus.location}
                                </option>
                            ))}
                        </Input>
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