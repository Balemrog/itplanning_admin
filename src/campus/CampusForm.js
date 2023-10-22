// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
// import AppNavbar from "../helpers/AppNavbar";
// import {ItPlanningApi} from "../api/ItPlanningApi";
// import {handleLogError} from "../helpers/ErrorHandler";
// import {useAuth} from "../context/AuthContext";
//
//
// const TeacherForm = () => {
//
//     const auth = useAuth()
//     const user = auth.getUser()
//
//     const initialFormState = {
//         firstName: '',
//         lastName: '',
//         isEmployee: '',
//     };
//
//     const [teacher, setTeacher] = useState(initialFormState);
//     const navigate = useNavigate();
//     const { id } = useParams();
//
//     // useEffect(() => {
//     //     if (id !== 'new') {
//     //         fetch(`/api/admin/teachers/${id}`)
//     //             .then(response => response.json())
//     //             .then(data => setTeacher(data));
//     //     }
//     // }, [id, setTeacher]);
//
//     const handleGetTeachers = async () => {
//         try {
//             const response = await ItPlanningApi.getTeachers(user, id)
//             if (response.ok) {
//                 const responseData = await response.json();
//                 setTeacher(responseData)
//             } else {
//                 // Handle errors if the response status is not in the 200 range
//                 handleLogError(response.statusText);
//             }
//         } catch (error) {
//             handleLogError(error)
//         }
//     }
//
//     useEffect(() => {
//         handleGetTeachers()
//     }, [id, setTeacher]);
//
//     const handleChange = (event) => {
//         const { name, value } = event.target
//
//         setTeacher({ ...teacher, [name]: value })
//     }
//
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//
//         try {
//             const response = await ItPlanningApi.addOrEditTeacher();
//             if (response.ok) {
//                 setTeacher(initialFormState);
//                 navigate('/admin/teachers');
//             } else {
//                 handleLogError(response.statusText);
//             }
//         } catch (error) {
//             handleLogError(error);
//         }
//     }
//
//     const title = <h2>{teacher.id ? 'Edit Teacher' : 'Add Teacher'}</h2>;
//
//     return (<div>
//             <AppNavbar/>
//             <Container>
//                 {title}
//                 <Form onSubmit={handleSubmit}>
//                     <FormGroup>
//                         <Label for="firstName">Prénom</Label>
//                         <Input type="text" name="firstName" id="firstName" value={teacher.firstName || ''}
//                                onChange={handleChange} autoComplete="firstName"/>
//                     </FormGroup>
//                     <FormGroup>
//                         <Label for="lastName">Nom</Label>
//                         <Input type="text" name="lastName" id="lastName" value={teacher.lastName || ''}
//                                onChange={handleChange} autoComplete="lastName"/>
//                     </FormGroup>
//                     <FormGroup>
//                         <Label for="isEmployee">Est interne</Label>
//                         <Input type="isEmployee" name="isEmployee" id="isEmployee" value={teacher.isEmployee || ''}
//                                onChange={handleChange} autoComplete="isEmployee"/>
//                     </FormGroup>
//                     <div className="row">
//                         <FormGroup className="col-md-4 mb-3">
//                             <Label for="stateOrProvince">State/Province</Label>
//                             <Input type="text" name="stateOrProvince" id="stateOrProvince" value={''}
//                                    onChange={handleChange} autoComplete="address-level1"/>
//                         </FormGroup>
//                         <FormGroup className="col-md-5 mb-3">
//                             <Label for="country">Country</Label>
//                             <Input type="text" name="country" id="country" value={''}
//                                    onChange={handleChange} autoComplete="address-level1"/>
//                         </FormGroup>
//                         <FormGroup className="col-md-3 mb-3">
//                             <Label for="country">Postal Code</Label>
//                             <Input type="text" name="postalCode" id="postalCode" value={''}
//                                    onChange={handleChange} autoComplete="address-level1"/>
//                         </FormGroup>
//                     </div>
//                     <FormGroup>
//                         <Button color="primary" type="submit">Enregistrer</Button>{' '}
//                         <Button color="secondary" tag={Link} to="/admin/teachers">Annuler</Button>
//                     </FormGroup>
//                 </Form>
//             </Container>
//         </div>
//     )
// };
//
// export default TeacherForm;