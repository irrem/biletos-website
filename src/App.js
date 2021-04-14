import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import UyeOl from './components/UyeOl';
import GirisYap from './components/GirisYap';
import Anasayfa from './components/Anasayfa';
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
          <Route path='/'>
            <Anasayfa />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
