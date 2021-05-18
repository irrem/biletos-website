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

const Admin = () => {
  /*
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
*/
  const GetData = () => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
      });
  };

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
            md="4"
            style={{ marginLeft: 80, paddingTop: 60, position: "relative" }}
          ></Col>
          <Col md="3">
            <Table>
              <Row>
                <Col></Col>
              </Row>
            </Table>
          </Col>
          <Col md="4">
            <div className="butonContainer-left">
              <a style={{ color: "white", lineHeight: 2, fontWeight: "bold" }} href="/usermanagement">
                {" "}
                Kişileri Düzenle{" "}
              </a>
            </div>
            <div className="butonContainer-left">
              <a style={{ color: "white", lineHeight: 2, fontWeight: "bold" }} href="productmanagement/theatre">
                {" "}
                Tiyatroları Düzenle{" "}
              </a>
            </div>
            <div className="butonContainer-left">
              <a style={{ color: "white", lineHeight: 2, fontWeight: "bold" }} href="productmanagement/films">
                {" "}
                Sinemaları Düzenle
              </a>
            </div>
            <div className="butonContainer-left">
              <a style={{ color: "white", lineHeight: 2, fontWeight: "bold" }} href="productmanagement/talkshow">
                {" "}
                TalkShow Düzenle
              </a>
            </div>
            <div className="butonContainer-left">
              <a style={{ color: "white", lineHeight: 2, fontWeight: "bold" }} href="productmanagement/theatre">
                {" "}
                Salonları Düzenle
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Admin;
