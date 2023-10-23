import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../helpers/AppNavbar';
import { Link } from 'react-router-dom';
import {useAuth} from "../../context/AuthContext";
import {ItPlanningApi} from "../../api/ItPlanningApi";
import {handleLogError} from "../../helpers/ErrorHandler";

const FormationTable = () => {

    const auth = useAuth()
    const user = auth.getUser()

    const [formations, setFormations] = useState({
        data: []
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleGetFormations()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleGetFormations = async () => {
        try {
            setIsLoading(true)
            const response = await ItPlanningApi.getFormations(user)
            if (response.ok) {
                const responseData = await response.json();
                setFormations(responseData)
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
            const response = await ItPlanningApi.deleteFormation(user, id)
            if (response.ok) {
                await handleGetFormations();
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

    const campusList = formations.data.map(formation => {
        const label = `${formation.label || ''}`;
        return <tr key={formation.id}>
            <td>{label}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/admin/formations/" + formation.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(formation.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/admin/formations/new">Ajouter formation</Button>
                </div>
                <h3>Campus</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Libellé</th>
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

export default FormationTable;