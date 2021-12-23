import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import AddTask from "./pages/AddTask/AddTask";
import AddTeam from "./pages/AddTeam/AddTeam";
import Home from "./pages/Home/Home";
import Project from "./pages/Project/Project";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/project/:id" exact>
          <Project />
        </Route>
        <Route path="/project/:id/addteam">
          <AddTeam />
        </Route>
        <Route path="/project/:id/addtask">
          <AddTask />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
