import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import { Home } from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NotesState';
import Alert from './Components/Alert'

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar /> 
        <Alert message="this is my note"></Alert>
        <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About/>
          </Route> 
        </Switch>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App; 