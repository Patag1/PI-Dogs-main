import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './views/Landing';
import Dogs from './views/Dogs';
import DogDetail from './views/DogDetail';
import Temperaments from './views/Temperaments';
import About from './views/About';
import Error from './views/components/Error';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDogs, getTemps } from './redux/actions';

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemps());
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/dogs" exact component={Dogs} />
          <Route path="/dogs/:id" exact component={DogDetail} />
          <Route path="/temperaments" exact component={Temperaments} />
          <Route path="/about" exact component={About} />
          <Route path="/error" exact component={Error} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
