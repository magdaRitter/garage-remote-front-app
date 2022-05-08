import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";
import GR from "./GR";
import { Button, Navbar, Container, Card } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  const { state, dispatch } = useContext(AuthContext);

  if (!state.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const { avatar_url, name} = state.user

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src={avatar_url}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Hello, {name}
          </Navbar.Brand>
          <Button onClick={() => handleLogout()}>Log out</Button>
        </Container>
      </Navbar>
      <Card><GR /></Card>
      <ToastContainer />
    </div>
  );
}
