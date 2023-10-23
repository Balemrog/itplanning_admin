import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../helpers/AppNavbar';
import { Link } from 'react-router-dom';
import {useAuth} from "../../context/AuthContext";
import {ItPlanningApi} from "../../api/ItPlanningApi";
import {handleLogError} from "../../helpers/ErrorHandler";

const SchoolClassTable = () => {

    const auth = useAuth()
    const user = auth.getUser()

    const [schoolClasses, setSchoolClasses] = useState({
        data: []
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleGetSchoolClasses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleGetSchoolClasses = async () => {
        try {
            setIsLoading(true)
            const response = await ItPlanningApi.getSchoolClasses(user)
            if (response.ok) {
                const responseData = await response.json();
                setSchoolClasses(responseData)
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
            const response = await ItPlanningApi.deleteSchoolClass(user, id)
            if (response.ok) {
                await handleGetSchoolClasses();
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

    const schoolClassList = schoolClasses.data.map(schoolClass => {
        const label = `${schoolClass.label || ''}`;
        return <tr key={schoolClass.id}>
            <td>{label}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/admin/school-classes/" + schoolClass.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(schoolClass.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/admin/school-classes/new">Ajouter une promotion</Button>
                </div>
                <h3>Promotion</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Libellé</th>
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {schoolClassList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default SchoolClassTable;