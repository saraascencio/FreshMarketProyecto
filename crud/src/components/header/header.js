import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
    return (
        <>
            <Navbar expand="lg" className="custom-navbar">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            src="/images/logo (2).png" 
                            alt="FreshMarket Logo"
                            className="logo"
                        /> 
                        FreshMarket
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
                            <Nav.Link as={Link} to="/product" className="nav-link-custom">Añadir</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
