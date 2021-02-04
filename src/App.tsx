import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import "./App.css";
import Products from "./Component/Products/Product";

const App: React.FC = () => {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Products} />
            <Route
              exact
              path="/signup"
              component={(): any => {
               return <Redirect to={"/signin"} />;
              }}
            />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
