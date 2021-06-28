import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import firebase from "firebase";
import firebaseConfig from "../constants/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const links = [
  { href: "../anasayfa", text: "", type: "icon", className: "menuItem" },
  { href: "../anasayfa", text: "Anasayfa", type: "text", className: "menuItem" },
  { href: "../uyeol", text: "Kayıt Ol", type: "text", className: "menuItem" },
  { href: "../girisyap", text: "Giriş Yap", type: "text", className: "menuItem" },
  { href: "../../profile", text: "Profil", type: "text", className: "menuItem" },
  { href: "../../admin", text: "Admin", type: "text", className: "menuItem" }
];

const logOut = () => {
  // console.log(firebase.auth().currentUser);
  firebase
    .auth()
    .signOut()
    .then(
      function () {
        localStorage.removeItem("user-session");
        console.log("Signed Out");
        window.location.href = 'girisyap';
      },
      function (error) {
        console.error("Sign Out Error", error);
      }
    );
};

const createNavItem = ({ href, text, className, type }) => {
  if (
    localStorage.getItem("user-session") &&
    (text == "Kayıt Ol" || text == "Giriş Yap")
  )
      return null;
  else if(
    !localStorage.getItem("user-session") &&
    (text == "Anasayfa" || text == "Admin"|| text == "Profil")
  )
  return null;
 
  else 
    return (
      <NavItem>
        <NavLink href={href} className={className}>
          {type == "icon" ? (
            <img
              src="https://tr.seaicons.com/wp-content/uploads/2016/08/Very-Basic-Search-icon-1.png"
              height="20"
              width="20"
              className="borderLeftWidth"
            />
          ) : (
            text
          )}
        </NavLink>
      </NavItem>
    );
};
  

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div>
        <Navbar expand="md">
          <Container>
            <NavbarBrand href="/" className="logoContainer">
              BiletOs
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto menuItem" navbar>
                {links.map(createNavItem)}
                {localStorage.getItem("user-session") ? (
                  <NavItem>
                    <NavLink onClick={() => logOut()} className="menuItem" style={{cursor:"pointer"}}>
                      Çıkış Yap
                    </NavLink>
                  </NavItem>
                ) : null}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
