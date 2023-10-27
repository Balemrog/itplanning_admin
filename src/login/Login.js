import React, {useState} from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Toast,
    ToastBody,
    ToastHeader
} from "reactstrap";
import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {ItPlanningApi} from "../api/ItPlanningApi";
import {handleLogError} from "../helpers/ErrorHandler";

function Login () {

    const auth = useAuth()
    const isLogged = auth.userIsAuthenticated()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const loginHandler = async (ev) => {
        ev.preventDefault();
        if (!username || !password) {
            return;
        }
        try {
            const response = await ItPlanningApi.authenticate(username, password);
            if (response.ok) {
                const responseData = await response.json();
                const {id, login, role} = responseData;
                const authData = window.btoa(username + ':' + password);
                const authenticatedUser = {id, login, role, authData};

                auth.userLogin(authenticatedUser);
                setUsername('');
                setPassword('');
            } else {
                handleLogError(response.statusText); // Handle errors if the response status is not in the 200 range
                setIsError(true);
                setErrorMsg("Les identifiants sont erronées");
            }
        } catch (error) {
            handleLogError(error.message); // Handle network errors, etc.
            setIsError(true);
        }

    };

    if (isLogged) {
        return <Navigate to={'/'} />
    }

    return (
        <Container>
            <h1>IT-Planning</h1>
            <h2>Welcome ENI</h2>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <Form onSubmit={loginHandler}>
                                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                                    <Label for="email" className="mr-sm-2">Email</Label>
                                    <Input type="email" name="email" id="email" placeholder="nom.prenom@eni.fr"
                                           onChange={(ev) => setUsername(ev.currentTarget.value)} required/>
                                </FormGroup>
                                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                                    <Label for="password" className="mr-sm-2">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="fourni par l'équipe planning"
                                           onChange={(ev) => setPassword(ev.currentTarget.value)} required/>
                                </FormGroup>
                                <Button type="submit" color="primary">
                                    Login
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                    <Card className="mt-5">
                        <CardBody>
                            {isError && (
                                <>
                                    <div className="p-3 bg-danger my-2 rounded">
                                        <Toast>
                                            <ToastHeader>Erreur !</ToastHeader>
                                            <ToastBody>
                                                {errorMsg}
                                            </ToastBody>
                                        </Toast>
                                    </div>
                                </>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;