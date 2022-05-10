import React, { useContext } from "react";
import { AuthContext } from "../App";
import { Button, Stack, Container } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

export default function GR() {
  const { state } = useContext(AuthContext);

  const requestGarageSignal = () => {
    const request_url = state.request_garage_url
    requestSignal(request_url, "Request to open garage was fired");
  }

  const requestGateSignal = () => {
    const request_url = state.request_gate_url
    requestSignal(request_url, "Request to open gate was fired");
  }

  const requestSignal = (request_url, message) => {
    fetch(request_url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
    })
      .then(response => {
        console.log(response);
        toast(message);
      })
      .catch(err => {
        console.log(err);
        toast(err);
      });
  }

  return (
    <div>
      <Container >
        <Stack gap={1} className="col-md-5 mx-auto">
          <Button onClick={requestGarageSignal}>Garage</Button>
          <Button onClick={requestGateSignal}>Gate</Button>
        </Stack>
      </Container>
      <ToastContainer />
    </div>
  );
}
