import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './styles/App.css';
import Layout from './Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Item from '../pages/Item';
import Items from '../pages/Items';
import Branches from '../pages/Branches';
import NewBranch from '../pages/NewBranch';
import ItemsBranch from '../pages/ItemsBranch';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/login' component={Login} />
          <Layout>
              <Route exact path='/home' component={Home} />
              <Route exact path='/productos/agregar(\\w+)' component={Item} />
              <Route exact path='/productos/:itemId' component={Item} />
              <Route exact path='/productos' component={Items} />
              <Route exact path='/sucursales/agregar(\\w+)' component={NewBranch} />
              <Route exact path='/sucursales/:branchId' component={ItemsBranch} />
              <Route exact path='/sucursales' component={Branches} />
          </Layout>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
