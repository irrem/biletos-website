
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Button } from 'reactstrap'

function App() {
  return (
    <div className="App">
      <Router>
         <div id="logo">
         <Link to="/" style={{ color: '#FFF', textDecoration: 'none' ,textAlign:'center'}}>BiletOs</Link>
         </div>
         <div id="header">
          <nav>
            <ul> 
              <li>
                <Link to="/menu" style={{ color: 'black', textDecoration: 'none' }}>Menü</Link>
              </li>
              <li>
                <Link to="/girisyap" style={{ color: 'black', textDecoration: 'none' }}>Giriş Yap</Link>
              </li>
              <li>
                <Link to="/uyeol" style={{ color: 'black', textDecoration: 'none' }}>Üye Ol</Link>
              </li>
            </ul>
          </nav>
        </div>


        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/uyeol">
            <UyeOl />
          </Route>
          <Route path="/girisyap">
            <GirisYap />
          </Route>

          <Route path="/">
            <BiletOs />
          </Route>
        </Switch>

      </Router>
    </div>
  );
}
function BiletOs() {
  return <div>
     <Button color="primary">Danger!</Button>
  </div>;
}
function GirisYap() {
  return <h2>GirisYap</h2>;
}
function UyeOl() {
  return <h2>UyeOl</h2>;
}
export default App;
