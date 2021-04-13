import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Navbar, Nav, Button } from 'react-bootstrap';

import { User } from '../models/user';

type Props = {
  classes: any
  setUser: React.Dispatch<React.SetStateAction<User | null>>
};

const NavBar = ({ setUser }: Props) => {
  const firebaseUser = firebase.auth().currentUser;
  const showLogin = firebaseUser === null || firebaseUser.isAnonymous;

  return (
      <Navbar style={{ backgroundColor: "transparent" }}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {showLogin
              ? (
                <Button
                  variant="outline-light"
                  onClick={(ev) => {
                    ev.preventDefault();
                    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                    firebase.auth().signInWithPopup(googleAuthProvider);
                  }}
                >
                  Sign In
                </Button>)
              : (<Button
                variant="outline-light"
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
