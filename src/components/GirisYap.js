import React from 'react';
import {
  Collapse,  Navbar,  NavbarToggler,  NavbarBrand,  Nav,  NavItem,  NavLink,
  Container, Row, Col, 
   Form, FormGroup, Label, Input, Button,
  } 
  from 'reactstrap';

  import firebase from 'firebase';
  import firebaseConfig from '../constants/firebase';

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
 const GirisYap = () => {
   const Auth=()=>{
    firebase.auth().signInWithEmailAndPassword("irem@irem.irem", "12356")
    .then(function(result) {
      window.location.href = 'uyeol';
      console.log(result);
    }).catch(function(error) {

      console.log(error);
    });
   };
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
              <Button onClick={()=>Auth()} style={{alignItems:'center',marginLeft:20,position:'relative',width:300,backgroundColor:' #D61471',border:'none'}}>Giriş Yap</Button>
              <br/><br/>
              <a href="uyeol" style={{alignItems:'center',marginLeft:100}}>Hemen Kayıt Olun</a>
              </Col>
        </Form>    
   </Container>
  );
};

export default GirisYap;
