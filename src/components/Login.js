import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import GithubIcon from "mdi-react/GithubIcon";
import { AuthContext } from "../App";
import { Button, Stack, Navbar, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  const { client_id, redirect_uri } = state;

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      setData({ ...data, isLoading: true });

      const requestData = {
        code: newUrl[1]
      };

      const proxy_url = state.proxy_url;

      // Use code parameter and other parameters to make POST request to proxy_server
      fetch(proxy_url, {
        method: "POST",
        body: JSON.stringify(requestData)
      })
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: "LOGIN",
            payload: { user: data, isLoggedIn: true }
          });
        })
        .catch(error => {
          setData({
            isLoading: false,
            errorMessage: "Sorry! Login failed"
          });
        });
    }
  }, [state, dispatch, data]);

  if (state.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
    <Navbar  bg="dark" variant="dark">
    <Container>
          <Navbar.Brand>
            Garage Remote App
          </Navbar.Brand>
        </Container>
    </Navbar>
    <Container >
    <div>
    <Stack gap={1} className="col-md-5 mx-auto">
          <span>{data.errorMessage}</span>
          <Button
          href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`} 
          onClick={() => {
            setData({ ...data, errorMessage: "" });
          }}
          >
            <GithubIcon />
            Login with GitHub
              </Button>
              </Stack>
        </div>
    </Container>
    </div>
  );
}

