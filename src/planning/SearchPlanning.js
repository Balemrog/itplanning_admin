import React, {useState} from 'react';
import {Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";

function SearchPlanning() {

    const initialFormState = {
        room: '',
        lesson: '',
        teacher: '',
    };
    const [planning, setPlanning] = useState(initialFormState);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === "checkbox") {
            setPlanning({ ...planning, [name]: checked });
        } else {
            setPlanning({ ...planning, [name]: value });
        }
    }

    return (
        <>
            <Row>
                <Col>
                    <Card className='className="mb-5"'>
                        <CardBody>
                            <h2>Rechercher un planning (Non implémenté pour le moment)</h2>
                            <Form>
                                <div className='row'>
                                    <FormGroup className="col-md-4 mb-3">
                                        <Label for="room">Salle</Label>
                                        <Input type="text" name="room" id="room" value={planning.room || ''} onChange={handleChange}/>
                                    </FormGroup>
                                    <FormGroup className="col-md-4 mb-3">
                                        <Label for="lesson">Cours</Label>
                                        <Input type="text" name="lesson" id="lesson" value={planning.lesson || ''} onChange={handleChange}/>
                                    </FormGroup>
                                    <FormGroup className="col-md-4 mb-3">
                                        <Label for="teacher">Enseignant</Label>
                                        <Input type="text" name="teacher" id="teacher" value={planning.teacher || ''} onChange={handleChange}/>
                                    </FormGroup>
                                </div>
                                <Button color="primary" type="button" className='float-end'>Rechercher</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default SearchPlanning;