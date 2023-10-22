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

    const Auth = useAuth()
    const isLogged = Auth.userIsAuthenticated()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false)

    const loginHandler = async (ev) => {
        ev.preventDefault();
        if (!username || !password) {
            return;
        }
        try {
            const response = await ItPlanningApi.authenticate(username, password);
            if (response.ok) {
                const responseData = await response.json();
                const {id, name, role} = responseData;
                const authData = window.btoa(username + ':' + password);
                const authenticatedUser = {id, name, role, authData};

                Auth.userLogin(authenticatedUser);
                setUsername('');
                setPassword('');
            } else {
                handleLogError(response.statusText); // Handle errors if the response status is not in the 200 range
                setIsError(true);
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
                                    <Label for="exampleEmail" className="mr-sm-2">
                                        Email
                                    </Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="exampleEmail"
                                        placeholder="something@idk.cool"
                                        onChange={(ev) => setUsername(ev.currentTarget.value)}
                                    />
                                </FormGroup>
                                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                                    <Label for="examplePassword" className="mr-sm-2">
                                        Password
                                    </Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="examplePassword"
                                        placeholder="don't tell!"
                                        onChange={(ev) => setPassword(ev.currentTarget.value)}
                                    />
                                </FormGroup>
                                <Button type="submit" color="primary">
                                    Login
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                    <Card className="mt-5">
                        <CardBody>
                            {isLogged && (
                                <>
                                    <div>User is logged in on the system.</div>
                                    <div className="p-3 bg-success my-2 rounded">
                                        <Toast>
                                            <ToastHeader>Reactstrap</ToastHeader>
                                            <ToastBody>
                                                This is a toast on a success background — check it out!
                                            </ToastBody>
                                        </Toast>
                                    </div>
                                </>
                            )}

                            {isError && (
                                <div>
                                    Please login with your credentials. <br /> Look at
                                    https://reqres.in/ for api help.
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;