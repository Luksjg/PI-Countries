import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom' 
import Home from './components/home/Home'
import LandingPage from './components/landingPage/LandingPage.jsx'
import CountryDetail from './components/countryDetail/CountryDetail.jsx';
import CreateActivity from './components/createActivity/CreateActivity.jsx';
import Errors from './components/Error/Errors.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home' component={Home}/>
        <Route path='/activity' component={CreateActivity}/>
        <Route path='/home/:countryId' component={CountryDetail}/>
        <Route path='*' component={Errors}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
