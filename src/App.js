import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import UyeOl from "./components/UyeOl";
import GirisYap from "./components/GirisYap";
import Anasayfa from "./components/Anasayfa";
import BiletAl from "./components/BiletAl";
import Profil from "./components/Profil";
import Admin from "./components/Admin";
import Payment from "./components/Payment";
import UserManagement from "./components/UserManagement";
import ProductManagement from "./components/ProductManagement";
import SessionManagement from "./components/SessionManagement";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Header />
        </div>
        <Switch>
          <Route path="/usermanagement">
            <UserManagement />
          </Route>
          <Route path="/uyeol">
            <UyeOl />
          </Route>
          <Route path="/girisyap">
            <GirisYap />
          </Route>
          <Route path="/payment">
            <Payment />
          </Route>
          <Route path="/profile">
            <Profil />
          </Route>
          <Route path="/biletal/:filmId">
            <BiletAl />
          </Route>
          <Route path="/sessionmanagement">
            <SessionManagement />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/productmanagement/:productType">
            <ProductManagement />
          </Route>
          <Route path="/">
            <Anasayfa />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
