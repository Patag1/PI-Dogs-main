import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './views/Landing';
import Dogs from './views/Dogs';
import DogDetail from './views/DogDetail';
import Temperaments from './views/Temperaments';
import About from './views/About';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/dogs" exact component={Dogs} />
          <Route path="/dogs/:id" exact component={DogDetail} />
          <Route path="/temperaments" exact component={Temperaments} />
          <Route path="/about" exact component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
