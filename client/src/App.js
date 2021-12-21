import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Project from "./pages/Project/Project";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/projects/:id">
          <Project />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
