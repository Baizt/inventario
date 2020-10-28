import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './styles/App.css';
import Layout from './Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Item from '../pages/Item';
import Items from '../pages/Items';
import Branches from '../pages/Branches';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/productos/agregar' component={Item} />
          <Route exact path='/productos/:itemId' component={Item} />
          <Route exact path='/productos' component={Items} />
          <Route exact path='/sucursales' component={Branches} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
