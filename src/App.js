import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import UyeOl from './components/UyeOl';
import GirisYap from './components/GirisYap';
import Anasayfa from './components/Anasayfa';
import BiletAl from './components/BiletAl';
import Profil from './components/Profil';
import Admin from './components/Admin';

function App() {
  return (
    <div className='App'>
      <Router>
        <div>
          <Header />
        </div>
        <Switch>
          <Route path='/uyeol'>
            <UyeOl />
          </Route>
          <Route path='/girisyap'>
            <GirisYap />
          </Route>
          <Route path='/biletal/:topicId'>
            <BiletAl />
          </Route>{' '}
          <Route path='/admin'>
            <Admin />
          </Route>
          <Route path='/profil'>
            <Profil />
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
