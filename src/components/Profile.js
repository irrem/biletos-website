import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import firebaseConfig from "../constants/firebase";
import jwt from "jsonwebtoken";
import { get } from "jquery";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var user = firebase.auth().currentUser;
var db = firebase.firestore();
const Profil = () => {
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [name, setName] = useState(null);
  const [id, setId] = useState(null);

  function GetDataWithMail() {
    jwt.verify(
      localStorage.getItem("user-session"),
      "biletos-password",
      function (err, token) {
        if (token)
          db.collection("users")
            .where("email", "==", token[0].email)
            .get()
            .then((querySnapshot) =>
              db
                .collection("users")
                .doc(querySnapshot.docs[0].id)
                .get()
                .then((querySnapshot2) => {
                  // console.log(querySnapshot.id, " => ", querySnapshot.data());
                  setEmail(querySnapshot2.data().email);
                  setName(querySnapshot2.data().name);
                  setPassword(querySnapshot2.data().password);
                  setPhone(querySnapshot2.data().phone);
                  setId(querySnapshot2.id);
                })
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                })
            );
      }
    );
  }
  function UpdateData(id) {
    if (password == passwordRepeat) {
      db.collection("users").doc(id).update({
        email,
        name,
        password,
        phone,
      });

      alert("Bilgileriniz başarı ile güncellendi.");
      return;
    } else
      alert(
        "Girdiğiniz şifreler eşleşmiyor! Lütfen girdiğiniz şifreleri kontrol ediniz."
      );
  }
  useEffect(() => {
    GetDataWithMail();
  }, []);

  return (
    <Container style={{ paddingTop: 40, marginBottom: 100, marginLeft: 400 }}>
      <h4>Profil Bilgileri</h4>
      <Row>
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
          <div className="butonContainer" onClick={() => UpdateData(id)}>
            <a
              style={{
                color: "white",
                lineHeight: 2,
                fontWeight: "bold",
              }}
            >
              Bilgilerimi Güncelle
            </a>
          </div>
        </Form>
      </Row>
    </Container>
  );
};

export default Profil;
