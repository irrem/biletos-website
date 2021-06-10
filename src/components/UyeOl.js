import React, { useState,useEffect } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

import firebase from "firebase";
import firebaseConfig from "../constants/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const UyeOl = () => {
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);

  var db = firebase.firestore();

  const createUser = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (result) {
        InsertMethod();
        alert("Tebrikler Başarıyla Kayıt Oldunuz.");
      
      })
      .catch(function (error) {
       console.log(error);
      });
     
  };

  const InsertMethod = () => { 
    db.collection("users")
      .add({
        name: name,
        email: email,
        password: password,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        window.location.href = "girisyap";
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
      
  };

  const GetData=()=>{
    db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
      });
  });
  };
  useEffect(() => {
    GetData();
  });

  return (
    <Container
      style={{
        alignItems: "center",
        marginLeft: 400,
        paddingTop: 60,
        position: "relative",
      }}
    >
      <h2>Biletos Kayıt Formu</h2>
      <br />
      <Form
        className="form"
        style={{ alignItems: "center", position: "relative" }}
      >
        <Col md="4">
          <FormGroup>
            <Label>İsim Soyisim</Label>
            <Input
              onChange={(text) => setName(text.target.value)}
              type="text"
              name="name"
              id="name"
              placeholder=""
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              onChange={(text) => setEmail(text.target.value)}
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="myemail@email.com"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Parola</Label>
            <Input
              onChange={(text) => setPassword(text.target.value)}
              type="password"
              name="password"
              id="examplePassword"
              placeholder="********"
            />
          </FormGroup>
          <Button
            onClick={() => createUser()}
            style={{
              alignItems: "center",
              marginLeft: 20,
              position: "relative",
              width: 300,
              backgroundColor: " #D61471",
              order: "none",
            }}
          >
            Kayıt Ol
          </Button>
          <br />
          <br />
          <a href="girisyap" style={{ alignItems: "center", marginLeft: 100 }}>
            Zaten Bir Hesabım Var
          </a>
        </Col>
      </Form>
    </Container>
  );
};

export default UyeOl;
