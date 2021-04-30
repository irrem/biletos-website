import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';

const links = [
  { href: 'anasayfa', text: '', type: 'icon', className: 'menuItem' },
  { href: 'anasayfa', text: 'Anasayfa', type: 'text', className: 'menuItem' },
  { href: 'uyeol', text: 'Kayıt Ol', type: 'text', className: 'menuItem' },
  { href: 'girisyap', text: 'Giriş Yap', type: 'text', className: 'menuItem' },
  { href: 'biletal', text: 'Bilet Al', type: 'text', className: 'menuItem' }
];

const createNavItem = ({ href, text, className, type }) => (
  <NavItem>
    <NavLink href={href} className={className}>
      {type == 'icon' ? (
        <img
          src='https://tr.seaicons.com/wp-content/uploads/2016/08/Very-Basic-Search-icon-1.png'
          height='20'
          width='20'
          className='borderLeftWidth'
        />
      ) : (
        text
      )}
    </NavLink>
  </NavItem>
);

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar expand='md'>
          <Container>
            <NavbarBrand href='/' className='logoContainer'>
              BiletOs
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto menuItem' navbar>
                {links.map(createNavItem)}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
