import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Components/Login";
import Jokes from "./Components/Jokes";
import Register from "./Components/Register";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <h1 style={{ alignText: "center" }}>Dad Jokes</h1>
      <BrowserRouter>
        <PrivateRoute exact path="/" component={Jokes} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </BrowserRouter>
    </div>
  );
}

export default App;
