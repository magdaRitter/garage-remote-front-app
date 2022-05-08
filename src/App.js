import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { initialState, reducer } from "./store/reducer";


export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} exact />
        <Route path="/" element={<Home/>} exact />
      </Routes>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;


// import React, { Component } from "react";
// import { Button, Stack } from "react-bootstrap";
// import { ToastContainer, toast } from 'react-toastify';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-toastify/dist/ReactToastify.css';
// import { Route } from "react-router-dom";
// import Home from "../home/Home";
// import Login from "../auth/Login";
// import Auth from "../auth/Auth";

// class App extends Component {

//     constructor() {
//         super();

//         this.state = {
//             isUserAuthenticated: false,
//             user: ''
//         }
//     }

//     LoginPage() {
//         return <Login />;
//     }

//     HomePage() {
//         return <><Auth state={this.state} /><Home /></>;
//     }

//     render() {
//         const isLoggedIn = this.state.isUserAuthenticated;
//         let contentPage;
//         if (isLoggedIn) {
//             contentPage = this.HomePage()
//         }
//         else {
//             contentPage = this.LoginPage()
//         }

//         return (
//             <div>
//                 <Stack gap={2} className="col-md-5 mx-auto">
//                     <h1>Garage Remote</h1>
//                 </Stack>
//                 <Stack gap={2} className="col-md-5 mx-auto">
//                     {contentPage}
//                 </Stack>
//             </div>
//         );
//     }
// }

// export default App;
