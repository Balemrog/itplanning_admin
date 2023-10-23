import React, { useState } from 'react';
import {
    Button,
    Collapse, Dropdown, DropdownItem, DropdownMenu,
    DropdownToggle, Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import {useAuth} from "../context/AuthContext";
import {ROLE} from "../Constant";

const AppNavbar = () => {

    const { getUser, userLogout } = useAuth()
    const logout = () => {
        userLogout()
    }
    const adminPageStyle = () => {
        const user = getUser()
        return user && user.role === ROLE.SERVICE_PLANNING ? { "display": "block" } : { "display": "none" }
    }
    const getUserName = () => {
        const user = getUser()
        return user ? user.login : ''
    }

    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdown] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    const toggleDropdown = () => {
        setDropdown(!dropdownOpen);
    };

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Accueil</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" style={{width: "100%"}} navbar>
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} style={adminPageStyle()}>
                        <DropdownToggle nav caret>
                            Administration
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem href="/admin/teachers">Enseignants</DropdownItem>
                            <DropdownItem href="/admin/campuses">Campus</DropdownItem>
                            <DropdownItem href="/admin/formations">Formations</DropdownItem>
                            <DropdownItem href="/admin/school-classes">Promotions</DropdownItem>
                            <DropdownItem href="/admin/rooms">Salles</DropdownItem>
                            <DropdownItem href="/admin/students">Élèves</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Nav>
                <div className="d-flex">
                    <p className="text-white me-2 my-0">{`${getUserName()}`}</p>
                </div>
                <Button color="outline-danger" type="submit" onClick={logout}>Déconnexion</Button>
            </Collapse>
        </Navbar>
    );
};

export default AppNavbar;