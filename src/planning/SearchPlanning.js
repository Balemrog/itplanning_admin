import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function SearchPlanning() {
  const initialFormState = {
    room: ["Salle de Senol", "Salle de Semih"],
    lesson: ["Leçon de valorant", "Leçon de cs"],
    teacher: ["Le beau Emre", "Balemroprof"],
  };

  const [planning, setPlanning] = useState(initialFormState);
  const [dropdownOpenSalle, setDropdownOpenSalle] = useState(false);
  const [salle, setSalle] = useState(" ");
  const [dropdownOpenCours, setDropdownOpenCours] = useState(false);
  const [cours, setCours] = useState(" ");
  const [dropdownOpenEnseignant, setDropdownOpenEnseignant] = useState(false);
  const [enseignant, setEnseignant] = useState(" ");

  const toggleSalle = () => setDropdownOpenSalle((prevState) => !prevState);
  const toggleCours = () => setDropdownOpenCours((prevState) => !prevState);
  const toggleEnseignant = () =>
    setDropdownOpenEnseignant((prevState) => !prevState);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSalle(value);
    console.log(salle);

    if (type === "checkbox") {
      setPlanning({ ...planning, [name]: checked });
    } else {
      setPlanning({ ...planning, [name]: value });
    }
  };

  const handleSetSalle = (e) => {
    let roomName = e.target.getAttribute("roomName");
    setSalle(roomName);
  };

  const handleSetCours = (e) => {
    let coursName = e.target.getAttribute("coursName");
    setCours(coursName);
  };

  const handleSetEnseignant = (e) => {
    console.log(e.target.getAttribute("enseignantName"));
    let enseignantName = e.target.getAttribute("enseignantName");
    setEnseignant(enseignantName);
  };

  return (
    <>
      <Row>
        <Col>
          <Card className='className="mb-1"'>
            <CardBody>
              <h2>Rechercher un planning</h2>
              <Form>
                <div className="d-flex justify-content-center">
                  <div className="d-flex p-3">
                    <Dropdown
                      isOpen={dropdownOpenSalle}
                      toggle={toggleSalle}
                      direction={"down"}
                    >
                      <DropdownToggle caret>
                        {salle == " " ? "Votre salle" : salle}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Votre salle</DropdownItem>
                        {initialFormState.room.map((s) => (
                          <DropdownItem onClick={handleSetSalle} roomName={s}>
                            {s}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className="d-flex p-3">
                    <Dropdown
                      isOpen={dropdownOpenCours}
                      toggle={toggleCours}
                      direction={"down"}
                    >
                      <DropdownToggle caret>
                        {cours == " " ? "Votre cours" : cours}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Votre cours</DropdownItem>
                        {initialFormState.lesson.map((c) => (
                          <DropdownItem onClick={handleSetCours} coursName={c}>
                            {c}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className="d-flex p-3">
                    <Dropdown
                      isOpen={dropdownOpenEnseignant}
                      toggle={toggleEnseignant}
                      direction={"down"}
                    >
                      <DropdownToggle caret>
                        {enseignant == " " ? "Votre enseignant" : enseignant}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Votre enseignant</DropdownItem>
                        {initialFormState.teacher.map((e) => (
                          <DropdownItem
                            onClick={handleSetEnseignant}
                            enseignantName={e}
                          >
                            {e}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default SearchPlanning;
