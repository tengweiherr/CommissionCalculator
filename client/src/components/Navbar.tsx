import React, { Dispatch, SetStateAction, useState } from "react";
import { Container, Row, Col, Navbar, Nav, Modal, Button, NavDropdown } from 'react-bootstrap';
import Login from "./LoginButton";
import Information from "./Information";
import { UserIDToken } from "../types";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";

type Props = {
    user:UserIDToken|null,
    fund:string,
    setFund:Dispatch<SetStateAction<string>>,
    currentTab:string,
    setCurrentTab:Dispatch<SetStateAction<string>>,
}

const NavBar = ({user,fund,setFund,currentTab,setCurrentTab}:Props) => {

    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const onNavDropdownSelect = (e:string|null) => {
        if(e){
          setFund(e);
          navigate(e);
        }
      }

  return(
    <>
    <Navbar collapseOnSelect expand="lg" variant="light" bg="light">
        <Container>
            <Row className='justify-content-between w-100' >
                <Col className='d-flex align-items-center'>
                    <Navbar.Brand>TFXI Referral Manager</Navbar.Brand>
                </Col>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Col sm={3}>
                    <Navbar.Collapse className="me-auto justify-content-end">
                        {user && 
                        <>
                            <NavLink to="calculator" className={`me-4 nav-link ${currentTab==="calculator" && styles.navlinkActive} ${styles.navlink}`} onClick={()=>setCurrentTab("calculator")}>Calculator</NavLink>
                            <NavLink to="attachments" className={`me-4 nav-link ${currentTab==="attachments" && styles.navlinkActive} ${styles.navlink}`} onClick={()=>setCurrentTab("attachments")}>Attachments</NavLink>
                            <Nav.Link className={`me-4 ${styles.navlink}`} onClick={()=>setShow(true)}>Information</Nav.Link>  
                            <NavDropdown className="me-4 px-3 py-1 rounded" style={{background:"lightgrey"}} title={fund} id="fund-dropdown" onSelect={onNavDropdownSelect}>
                                <NavDropdown.Item eventKey="GMC">
                                    GMC
                                </NavDropdown.Item>
                                <NavDropdown.Item eventKey="Takami">
                                    Takami
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                        }
                        <Login/>
                    </Navbar.Collapse>
                </Col>
            </Row>
        </Container>
  </Navbar>
            <Modal show={show} onHide={()=>setShow(false)}>
            <Modal.Header>
            <Modal.Title>Information</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-4'>
                <Information />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>setShow(false)}>
                Close
            </Button>
                </Modal.Footer>
            </Modal>
  </>

  )
}

export default NavBar;
