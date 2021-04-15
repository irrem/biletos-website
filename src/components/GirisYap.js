import React from 'react';
import {
  Collapse,  Navbar,  NavbarToggler,  NavbarBrand,  Nav,  NavItem,  NavLink,
  Container, Row, Col, 
   Form, FormGroup, Label, Input, Button,
  } 
  from 'reactstrap';
const GirisYap = () => {
  return (
  <Container  style={{alignItems:'center',marginLeft:400,paddingTop:60,position:'relative'}} >
     <h2>Biletos Giriş Formu</h2><br/>
      <Form className="form"  style={{alignItems:'center',position:'relative'}}>
        <Col md="4">
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
              <Button href="anasayfa" style={{alignItems:'center',marginLeft:20,position:'relative',width:300,backgroundColor:' #D61471',border:'none'}}>Giriş Yap</Button>
              <br/><br/>
              <a href="uyeol" style={{alignItems:'center',marginLeft:100}}>Hemen Kayıt Olun</a>
              </Col>
        </Form>    
   </Container>
  );
};

export default GirisYap;
