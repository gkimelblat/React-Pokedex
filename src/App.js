import React from 'react';
import { HashRouter as 
  Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Views/Home';
import About from './Views/About';
import Dashboard from './Components/Dashboard';
import Pokemon from './Components/pokemon/Pokemon';


function App() {
  
  return(
    <div>
     <Router>
        <Header />

        <div className="p-3">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
        </Switch>
        </div>

        <Footer />

      </Router>      
    </div>
  );
}

export default App;
