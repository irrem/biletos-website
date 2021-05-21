import React, { Component, useState, useEffect } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Table,
} from "reactstrap";
import firebase from "firebase";
import firebaseConfig from "../constants/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var db = firebase.firestore();

const Profile = () => {
  const [password, setPassword] = useState(null);
  const [passwordRepeat, setPasswordRepeat] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [uid, setUid] = useState(null);
  const [id, setId] = useState(null);
  const [usersList, setUsersList] = useState([]);

  function clearInputValue() {
    setEmail("");
    setName("");
    setPassword("");
    setPasswordRepeat("");
    setPhone("");
  }

  var user = firebase.auth().currentUser;

  if (user != null) {
    user.providerData.forEach(function (profile) {
      
      setEmail(profile.uid.toString());
    });
  }
  
  useEffect(() => {
  GetData(email);
  },[]);
  const GetData = (email) => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
console.log(email);
          if (email==doc.data().email) {
            console.log("ljshfsdfjlk");
            setId(doc.id);
            setName(doc.data().name);
            setPassword(doc.data().password);
            setPhone(doc.data().phone);
          }
        });
      });
      console.log(id);
  };

  function UpdateData(id) {
    console.log(id);
    db.collection("users").doc(id).update({
      email,
      name,
      password,
      phone,
    });
    return;
  }


  return (
    <Container
      style={{
        paddingTop: 60,
        position: "relative",
      }}
    >
      <Row>
        <Col
          style={{ marginLeft: 20, paddingTop: 60, position: "relative" }}
        ></Col>
        <Col md="8">
          <Table>
            <Row>
              {" "}
              <Form style={{ alignItems: "center", position: "relative" }}>
                <FormGroup>
                  <Label>İsim Soyisim</Label>
                  <Input
                    onChange={(text) => setName(text.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="İsminizi giriniz"
                    value={name}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    onChange={(text) => setEmail(text.target.value)}
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="email@email.com"
                    value={email}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Telefon</Label>
                  <Input
                    onChange={(text) => setPhone(text.target.value)}
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="500-000-00-00"
                    value={phone}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Şifre</Label>
                  <Input
                    onChange={(text) => setPassword(text.target.value)}
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="******"
                    value={password}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Şifre Tekrar</Label>
                  <Input
                    onChange={(text) => setPasswordRepeat(text.target.value)}
                    type="password"
                    name="passwordRepeat"
                    id="examplePassword"
                    placeholder="******"
                    value={passwordRepeat}
                  />
                  <br />
                  <Button
                    style={{
                      color: "white",
                      lineHeight: 2,
                      fontWeight: "bold",
                    }}
                    onClick={() => UpdateData(id)}
                  >
                    {" "}
                    Güncelle
                  </Button>
                </FormGroup>
              </Form>
            </Row>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
