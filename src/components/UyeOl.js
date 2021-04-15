import React from 'react';
import {
  Collapse,  Navbar,  NavbarToggler,  NavbarBrand,  Nav,  NavItem,  NavLink,
  Container, Row, Col, 
   Form, FormGroup, Label, Input, Button,
  } 
  from 'reactstrap';
const UyeOl = () => {
  return (
    <Container>
      <Container  style={{alignItems:'center',marginLeft:300,paddingTop:60,position:'relative'}} >
      <h2>Biletos Kayıt Formu</h2><br/><br/>
      <Form className="form"  style={{alignItems:'center',position:'relative'}}>
        <Col md="4">
              <FormGroup>
                <Label>İsim Soyisim</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder=""
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
              <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="myemail@email.com"
                />
                </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Parola</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="********"
                />
              </FormGroup>
              <Button href="girisyap" style={{alignItems:'center',marginLeft:20,position:'relative',width:300,backgroundColor:' #D61471',border:'none'}}>Kayıt Ol</Button>
              </Col>
        </Form>    
   </Container>
    </Container>
  );
};

export default UyeOl;
