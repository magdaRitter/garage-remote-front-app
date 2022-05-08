import React, { Component } from "react";
import { Button, Stack, Container } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

class GR extends Component {

  requestSignal(signalType, message) {
    fetch('http://localhost:8080/home/signal', {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        signalType: signalType
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        toast(message);
      })
      .catch(err => {
        console.log(err);
      });
  }

  requestGarageSignal(){
    this.requestSignal("GARAGE", "Request to open garage was fired");
  }

  requestGateSignal(){
    this.requestSignal("GATE", "Request to open gate was fired");
  }

  render() {
    return (
      <div>
        <Container >
        <Stack gap={1} className="col-md-5 mx-auto">
          <Button onClick={this.requestGarageSignal.bind(this)}>Garage</Button>
            <Button onClick={this.requestGateSignal.bind(this)}>Gate</Button>
        </Stack>
        </Container>
        <ToastContainer />
      </div>
    );
  }
}

export default GR;
