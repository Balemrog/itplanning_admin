import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../helpers/AppNavbar';
import { Link } from 'react-router-dom';
import {useAuth} from "../../context/AuthContext";
import {ItPlanningApi} from "../../api/ItPlanningApi";
import {handleLogError} from "../../helpers/ErrorHandler";

const CampusTable = () => {

    const auth = useAuth()
    const user = auth.getUser()

    const [campuses, setCampuses] = useState({
        data: []
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleGetCampuses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleGetCampuses = async () => {
        try {
            setIsLoading(true)
            const response = await ItPlanningApi.getCampuses(user)
            if (response.ok) {
                const responseData = await response.json();
                setCampuses(responseData)
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
            const response = await ItPlanningApi.deleteCampus(user, id)
            if (response.ok) {
                await handleGetCampuses();
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

    const campusList = campuses.data.map(campus => {
        const firstname = `${campus.location || ''}`;
        return <tr key={campus.id}>
            <td>{firstname}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/admin/campuses/" + campus.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(campus.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/admin/campuses/new">Ajouter un campus</Button>
                </div>
                <h3>Campus</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Localisation</th>
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {campusList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default CampusTable;