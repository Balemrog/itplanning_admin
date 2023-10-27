import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../helpers/AppNavbar';
import { Link } from 'react-router-dom';
import {useAuth} from "../../context/AuthContext";
import {ItPlanningApi} from "../../api/ItPlanningApi";
import {handleLogError} from "../../helpers/ErrorHandler";

const RoomTable = () => {

    const auth = useAuth()
    const user = auth.getUser()

    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleGetRooms()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleGetRooms = async () => {
        try {
            setIsLoading(true)
            const response = await ItPlanningApi.getRooms(user)
            if (response.ok) {
                const responseData = await response.json();
                setRooms(responseData)
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
            const response = await ItPlanningApi.deleteRoom(user, id)
            if (response.ok) {
                await handleGetRooms();
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

    const roomList = rooms.map(room => {
        const material = `${room.material || ''}`;
        const roomName = `${room.roomName || ''}`;
        const building = `${room.building || ''}`;
        const location = `${room.campus.location || ''}`;
        return <tr key={room.id}>
            <td>{material}</td>
            <td>{roomName}</td>
            <td>{building}</td>
            <td>{location}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/admin/rooms/" + room.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(room.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/admin/rooms/new">Ajouter une salle</Button>
                </div>
                <h3>Salle</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Matériel</th>
                        <th width="20%">Salle</th>
                        <th width="20%">Bâtiment</th>
                        <th width="20%">Campus</th>
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {roomList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default RoomTable;