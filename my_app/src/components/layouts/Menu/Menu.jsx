import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'
import '../../../App.css'

function Menu() {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Nav className="me-auto">
                <NavLink 
                    to="/todo" 
                    className={styles.navLink}
                    style={({ isActive }) => {
                        return {
                            color: isActive ? "#fff" : "",
                        };
                    }}
                >
                    Todo
                </NavLink>
                <NavLink 
                    to="/about" 
                    className={styles.navLink}
                    style={({ isActive }) => {
                        return {
                            color: isActive ? "#fff" : "",
                        };
                    }}
                >
                    About
                </NavLink>
                <NavLink 
                    to="/contact" 
                    className={styles.navLink}
                    style={({ isActive }) => {
                        return {
                            color: isActive ? "#fff" : "",
                        };
                    }}
                >
                    Contact
                </NavLink>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default Menu