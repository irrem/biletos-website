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

const UserManagement = () => {
  const [password, setPassword] = useState(null);
  const [passwordRepeat, setPasswordRepeat] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [id, setId] = useState(null);
  const [usersList, setUsersList] = useState([]);

  function clearInputValue() {
    setEmail("");
    setName("");
    setPassword("");
    setPasswordRepeat("");
    setPhone("");
  }

  function GetDataWithId(id) {
    db.collection("users")
      .doc(id)
      .get()
      .then((querySnapshot) => {
        // console.log(querySnapshot.id, " => ", querySnapshot.data());
        setEmail(querySnapshot.data().email);
        setName(querySnapshot.data().name);
        setPassword(querySnapshot.data().password);
        setPasswordRepeat(querySnapshot.data().password);
        setPhone(querySnapshot.data().phone);
        console.log(email);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    setId(id);
  }

  const InsertUserData = () => {
    if (password == passwordRepeat) {
      db.collection("users")
        .add({
          name: name,
          email: email,
          password: password,
          phone: phone,
        })
        .then((docRef) => {
          //console.log("Document written with ID: ", docRef.id);
          clearInputValue();
          alert("Kayıt işlemi başarıyla tamamlandı!");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      console.log("Girdiğiniz Şifreleri kontrol ediniz!");
    }
  };

  const GetData = () => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        var List = [];

        querySnapshot.forEach((doc) => {
          List.push({
            id: doc.id,
            email: doc.data().email,
            name: doc.data().name,
            password: doc.data().password,
            phone: doc.data().phone,
          });
        });
        setUsersList(List);
      });
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
  function DeleteData(id) {
    db.collection("users").doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }

  useEffect(() => {
    GetData();
  });

  return (
    <Container style={{ paddingTop: 40, marginBottom: 100 }}>
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
          <Col md="5">
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
                  </FormGroup>
                </Form>
              </Row>
            </Table>
          </Col>
          <Col md="6">
            <div className="dataList">
              {" "}
              {usersList.map((item) => (
                <Row>
                  <Col md="8">
                    <div className="data-cell">
                      <p>
                        {" "}
                        {item.name}
                        {" \t"} {item.phone}
                      </p>
                      <p>
                        {item.email}
                        {"  "} {item.password}{" "}
                      </p>
                    </div>
                  </Col>
                  <Col md="1">
                    <div className="chooseBox">
                      <a onClick={() => GetDataWithId(item.id)}>Seç</a>
                    </div>
                  </Col>
                </Row>
              ))}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="8" style={{ marginLeft: 300, alignContent: "center" }}>
            <div className="butonContainer-small">
              <a
                style={{ color: "white", lineHeight: 2, fontWeight: "bold" }}
                onClick={() => InsertUserData()}
              >
                {" "}
                Kaydet{" "}
              </a>
            </div>
            <div className="butonContainer-small">
              <a
                style={{ color: "white", lineHeight: 2, fontWeight: "bold" }}
                onClick={() => UpdateData(id)}
              >
                {" "}
                Güncelle{" "}
              </a>
            </div>

            <div className="butonContainer-small">
              <a
                style={{ color: "white", lineHeight: 2, fontWeight: "bold" }}
                onClick={() => DeleteData(id)}
              >
                Sil
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default UserManagement;
