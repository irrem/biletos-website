import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import UyeOl from './components/UyeOl';
import GirisYap from './components/GirisYap';
import Anasayfa from './components/Anasayfa';
import BiletAl from './components/BiletAl';
import Payment from './components/Payment';
import Profile from './components/Profile';
import Admin from './components/Admin';
import UserManagement from './components/UserManagement';
import ProductManagement from './components/ProductManagement';
import SessionManagement from './components/SessionManagement';

function App() {
  return (
    <div className='App'>
      <Router>
        <div>
          <Header />
        </div>
        <Switch>
          <Route path='/usermanagement'>
            <UserManagement />
          </Route>
          <Route path='/uyeol'>
            <UyeOl />
          </Route>
          <Route path='/girisyap'>
            <GirisYap />
          </Route>
          <Route path='/sessionmanagement/:productType'>
            <SessionManagement />
          </Route>
          <Route path='/biletal/:productType/:productId'>
            <BiletAl />
          </Route>
          <Route path='/admin'>
            <Admin />
          </Route>
          <Route path='/payment'>
            <Payment />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/productmanagement/:productType'>
            <ProductManagement />
          </Route>
          <Route path='/'>
            <Anasayfa />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
