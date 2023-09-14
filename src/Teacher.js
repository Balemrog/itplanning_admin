import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const Teacher = () => {

    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('/api/teachers')
            .then(response => response.json())
            .then(data => {
                setTeachers(data);
                setLoading(false);
            })
    }, []);

    const remove = async (id) => {
        await fetch(`/api/teacher/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedTeachers = [...teachers].filter(i => i.id !== id);
            setTeachers(updatedTeachers);
        });
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    const teacherList = teachers.map(teacher => {
        const firstname = `${teacher.firstname || ''}`;
        const lastname = `${teacher.lastname || ''}`;
        const isEmployee = `${teacher.isEmployee || ''}`;
        return <tr key={teacher.id}>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{isEmployee}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/teachers/" + teacher.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(teacher.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/teacher/new">Ajouter enseignant</Button>
                </div>
                <h3>Enseignants</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Nom</th>
                        <th width="20%">Prénom</th>
                        <th width="10%">Interne</th>
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {teacherList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default Teacher;