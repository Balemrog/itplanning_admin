// import React, { useEffect, useState } from 'react';
// import { Button, ButtonGroup, Container, Table } from 'reactstrap';
// import AppNavbar from '../../helpers/AppNavbar';
// import { Link } from 'react-router-dom';
// import {useAuth} from "../../context/AuthContext";
// import {ItPlanningApi} from "../../api/ItPlanningApi";
// import {handleLogError} from "../../helpers/ErrorHandler";
//
// const DemandTable = () => {
//
//     const auth = useAuth()
//     const user = auth.getUser()
//
//     const [demands, setDemands] = useState({
//         data: []
//     });
//     const [isLoading, setIsLoading] = useState(false);
//
//     useEffect(() => {
//         handleGetDemands()
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])
//
//     const handleGetDemands = async () => {
//         try {
//             setIsLoading(true)
//             const response = await ItPlanningApi.getDemands(user)
//             if (response.ok) {
//                 const responseData = await response.json();
//                 setDemands(responseData)
//             } else {
//                 // Handle errors if the response status is not in the 200 range
//                 handleLogError(response.statusText);
//             }
//         } catch (error) {
//             handleLogError(error)
//         } finally {
//             setIsLoading(false)
//         }
//     }
//
//     const remove = async (id) => {
//         try {
//             const response = await ItPlanningApi.deleteDemand(user, id)
//             if (response.ok) {
//                 await handleGetDemands();
//             } else {
//                 handleLogError(response.statusText);
//             }
//         } catch (error) {
//             handleLogError(error)
//         }
//     }
//
//     if (isLoading) {
//         return <p>Loading...</p>;
//     }
//
//     const demandList = demands.data.map(demand => {
//         const comment = `${demand.comment || ''}`;
//         return <tr key={demand.id}>
//             <td>{comment}</td>
//             <td>
//                 <ButtonGroup>
//                     <Button size="sm" color="primary" tag={Link} to={"/demands/" + demand.id}>Edit</Button>
//                     <Button size="sm" color="danger" onClick={() => remove(demand.id)}>Delete</Button>
//                 </ButtonGroup>
//             </td>
//         </tr>
//     });
//
//     return (
//         <div>
//             <AppNavbar/>
//             <Container fluid>
//                 <div className="float-end">
//                     <Button color="success" tag={Link} to="/demands/new">Ajouter une demande</Button>
//                 </div>
//                 <h3>Demandes</h3>
//                 <Table className="mt-4">
//                     <thead>
//                     <tr>
//                         <th width="20%">Commentaire</th>
//                         <th width="10%">Actions</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                         {demandList}
//                     </tbody>
//                 </Table>
//             </Container>
//         </div>
//     );
// };
//
// export default DemandTable;