import React from "react";

import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from './hoc/auth'


function App() {
  return (
    <BrowserRouter>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Routes>
          <Route exact path="/" Component={Auth(LandingPage, null)}/> 
          {/*이렇게 컴포넌트를 컴포넌트로 감쌀 수 있다.*/}
          <Route exact path="/login" Component={Auth(LoginPage, false)}/>
          
          <Route exact path="/register" Component={Auth(RegisterPage, false)}/>
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;