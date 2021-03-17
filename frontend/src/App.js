import { BrowserRouter, Switch } from 'react-router-dom';
import Header from './components/Home/Header/Header';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import {ProtectedRoute} from './util/ProtectedRoute/ProtectedRoute'

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <ProtectedRoute exact path="/home" component={Home}/>
        <ProtectedRoute exact path="/" component={Login}/>
        <ProtectedRoute exact path="/login" component={Login}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
