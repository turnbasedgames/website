import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';

import { User } from '../models/user';

type Props = {
  classes: any
  setUser: React.Dispatch<React.SetStateAction<User | null>>
};

const NavBar = ({ setUser }: Props) => {
  const firebaseUser = firebase.auth().currentUser;
  const showLogin = firebaseUser === null || firebaseUser.isAnonymous;

  return (
    <Navbar fixed="top" style={{ backgroundColor: "rgb(21, 21, 21)" }}>
      <Navbar.Brand href="/" style={{ color: "white"}}>Turn-Based-Games</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mc-auto">
        </Nav>
        <Nav className="ml-auto">
          <Form inline style={{margin: "auto 30px"}}>
            <FormControl type="text" placeholder="Search" style={{ marginRight: "10px" }} />
            <Button variant="dark" type="submit"><i className="fas fa-search"></i></Button>
          </Form>
          {showLogin
            ? (
              <Button
                variant="dark"
                onClick={(ev) => {
                  ev.preventDefault();
                  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                  firebase.auth().signInWithPopup(googleAuthProvider);
                }}
              >
                Sign In
              </Button>)
            : (<Button
              variant="dark"
              onClick={() => {
                setUser(null);
                firebase.auth().signOut();
              }}
            >
              Sign Out
            </Button>)
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
