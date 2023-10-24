import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from "../../helpers/AppNavbar";
import {ItPlanningApi} from "../../api/ItPlanningApi";
import {handleLogError} from "../../helpers/ErrorHandler";
import {useAuth} from "../../context/AuthContext";
import {MODALITY} from "../../Constant";


const StudentForm = () => {

    const auth = useAuth()
    const user = auth.getUser()

    const initialFormState = {
        firstName: '',
        lastName: '',
        modality: '',
        schoolClass: {
            id: '',
            label: '',
        },
        formation: {
            id: '',
            label: '',
        },
    };

    const [student, setStudent] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();
    const [schoolClasses, setSchoolClasses] = useState({
        data: []
    });
    const [formations, setFormations] = useState({
        data: []
    });

    const handleGetStudents = async () => {
        try {
            const response = await ItPlanningApi.getStudents(user, id);
            if (response.ok) {
                const responseData = await response.json();
                setStudent(responseData);
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error);
        }
    }

    const handleGetSchoolClasses = async () => {
        try {
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
        }
    }

    const handleGetFormations = async () => {
        try {
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
        }
    }

    useEffect(() => {
        if (id !== 'new') {
            handleGetStudents();
        }
        handleGetSchoolClasses();
        handleGetFormations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, setStudent]);

    const handleChange = (event) => {
        const { name, value, type } = event.target;

        if (type === "select-one") {
            const selectedIndex  = event.target.options.selectedIndex;
            const id = event.target.options[selectedIndex].getAttribute('data-key')
            if (name === "schoolClass") {
                setStudent({...student, schoolClass: {
                        ...student.schoolClass,
                        id: id,
                        label: value}
                });
            } else if (name === "formation") {
                setStudent({...student, formation: {
                        ...student.formation,
                        id: id,
                        label: value}
                });
            }
            else {
                setStudent({ ...student, [name]: value });
            }
        } else {
            setStudent({ ...student, [name]: value });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await ItPlanningApi.addOrEditStudent(user, student);
            if (response.ok) {
                setStudent(initialFormState);
                navigate('/admin/students');
            } else {
                handleLogError(response.statusText);
            }
        } catch (error) {
            handleLogError(error);
        }
    }

    const title = <h2>{student.id ? 'Modifier un élève' : 'Ajouter un élève'}</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="firstName">Prénom</Label>
                        <Input type="text" name="firstName" id="firstName" value={student.firstName || ''}
                               onChange={handleChange} autoComplete="firstName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Nom</Label>
                        <Input type="text" name="lastName" id="lastName" value={student.lastName || ''}
                               onChange={handleChange} autoComplete="lastName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="modality">Modalité</Label>
                        <Input type="select" name="modality" id="modality" value={student.modality || ''}
                               onChange={handleChange} autoComplete="modality">
                            <option value="">Sélectionnez la modalité</option>
                            <option value={MODALITY.PRESENCE}>{MODALITY.PRESENCE}</option>
                            <option value={MODALITY.PRESENCE_REMOTE}>{MODALITY.PRESENCE_REMOTE}</option>
                            <option value={MODALITY.REMOTE}>{MODALITY.REMOTE}</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="schoolClass">Promotion</Label>
                        <Input type="select" name="schoolClass" id="schoolClass" value={student.schoolClass.label || ''}
                               onChange={handleChange} autoComplete="schoolClass">
                            <option value="">Sélectionnez la promotion</option>
                            {schoolClasses.data.map((schoolClass) => (
                                <option key={schoolClass.id} data-key={schoolClass.id} value={schoolClass.label}>
                                    {schoolClass.label}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="formation">Formation</Label>
                        <Input type="select" name="formation" id="formation" value={student.formation.label || ''}
                               onChange={handleChange} autoComplete="formation">
                            <option value="">Sélectionnez la formation</option>
                            {formations.data.map((formation) => (
                                <option key={formation.id} data-key={formation.id} value={formation.label}>
                                    {formation.label}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Enregistrer</Button>{' '}
                        <Button color="secondary" tag={Link} to="/admin/students">Annuler</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default StudentForm;