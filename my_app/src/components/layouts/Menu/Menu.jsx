import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'
import '../../../App.css'
import { connect } from 'react-redux'

function Menu(props) {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Nav className="me-auto">
                <NavLink 
                    to="/todo" 
                    className={styles.navLink}
                    style={({ isActive }) => {
                        return {
                            color: isActive ? "rgb(13 110 253)" : "",
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
                            color: isActive ? "rgb(13 110 253)" : "",
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
                            color: isActive ? "rgb(13 110 253)" : "",
                        };
                    }}
                >
                    Contact
                </NavLink>
                <NavLink 
                    to="/" 
                    className={styles.navLink}
                    style={({ isActive }) => {
                        return {
                            color: isActive ? "rgb(13 110 253)" : "",
                        };
                    }}
                    onClick={(event) => {
                        event.preventDefault();
                        props.onChange()
                    }}
                >
                    {props.value}
                </NavLink>
                <NavLink 
                    to="/" 
                    className={styles.navLink}
                    style={({ isActive }) => {
                        return {
                            color: isActive ? "rgb(13 110 253)" : "",
                        };
                    }}
                    onClick={(event) => {
                        event.preventDefault();
                        props.onChange2(2)
                    }}
                >
                    {props.value}
                </NavLink>
            </Nav>
        </Container>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
    return {
        value: state.test
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: () => {
            dispatch({type: 'CHANGE_TEST'})
        },
        onChange2: (val) => {
            dispatch({type: 'CHANGE_TEST_2', num: val})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)