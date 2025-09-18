// src/components/Navbar.jsx

import { useTheme } from '../contexts/theme';
import { IoMoonSharp, IoSunny } from 'react-icons/io5';
import { useAuth } from '../contexts/auth';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { BsFillPiggyBankFill } from 'react-icons/bs';

export default function NavigationBar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthed } = useAuth();
  console.log(theme);
  return (
    <Navbar bg={theme} variant={theme} expand="md" sticky="top" >
      <Container className="border-bottom py-3">
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center gap-2 text-primary">
          <BsFillPiggyBankFill size={28} className="text-primary" />
          Budget
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/transactions">Transactions</Nav.Link>
            <Nav.Link as={NavLink} to="/places">Places</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About us</Nav.Link>
          </Nav>
          <Nav className="align-items-center gap-2">
            {isAuthed ? (
              <Nav.Link as={NavLink} to="/logout" data-cy="logout_btn">Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register" data-cy="logout_btn">Register</Nav.Link>
              </>
            )}
            <Button
              variant="outline-secondary"
              type="button"
              onClick={toggleTheme}
              className="ms-2"
            >
              {theme === 'dark' ? <IoMoonSharp /> : <IoSunny />}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );

}
