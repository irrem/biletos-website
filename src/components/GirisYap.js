import React, { useState } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import firebase from 'firebase';
import firebaseConfig from '../constants/firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const GirisYap = () => {
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [validation, setValidation] = useState(null);

  const Auth = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (result) {
        window.location.href = 'uyeol';
      })
      .catch(function (error) {
        setValidation(error.message);
      });
  };
  return (
    <Container
      style={{ alignItems: 'center', marginLeft: 400, paddingTop: 60, position: 'relative' }}
    >
      <h2>Biletos Giriş Formu</h2>
      <br />
      <Form className='form' style={{ alignItems: 'center', position: 'relative' }}>
        <Col md='4'>
          <a style={{ color: 'red' }}>{validation}</a>
          <br />
          <br />
          <FormGroup>
            <Label>Email</Label>
            <Input
              onChange={text => setEmail(text.target.value)}
              type='email'
              name='email'
              id='exampleEmail'
              placeholder='myemail@email.com'
            />
          </FormGroup>
          <FormGroup>
            <Label for='examplePassword'>Parola</Label>
            <Input
              onChange={text => setPassword(text.target.value)}
              type='password'
              name='password'
              id='examplePassword'
              placeholder='********'
            />
          </FormGroup>
          <Button
            onClick={() => Auth()}
            style={{
              alignItems: 'center',
              marginLeft: 20,
              position: 'relative',
              width: 300,
              backgroundColor: ' #D61471',
              border: 'none'
            }}
          >
            Giriş Yap
          </Button>
          <br />
          <br />
          <a href='uyeol' style={{ alignItems: 'center', marginLeft: 100 }}>
            Hemen Kayıt Olun
          </a>
        </Col>
      </Form>
    </Container>
  );
};

export default GirisYap;
