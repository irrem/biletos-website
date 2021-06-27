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
          <Col >
            <div className="butonContainer-left">
              <a style={{ color: "white", lineHeight: 2, fontWeight: "bold" }} href="/usermanagement">
                {" "}
                Kişileri Düzenle{" "}
              </a>
            </div>
            <div className="butonContainer-left">
              <a style={{ color: "white", lineHeight: 2, fontWeight: "bold" }} href="productmanagement/theatre">
                {" "}
                Tiyatro Yönetimi{" "}
              </a>
            </div>
            <div className="butonContainer-left">
              <a style={{ color: "white", lineHeight: 2, fontWeight: "bold" }} href="productmanagement/films">
                {" "}
                Sinema Yönetimi
              </a>
            </div>
            <div className="butonContainer-left">
              <a style={{ color: "white", lineHeight: 2, fontWeight: "bold" }} href="productmanagement/talkshow">
                TalkShow Yönetimi
              </a>
            </div>
           
          </Col><Col> <div className="butonContainer-left">
              <a style={{ color: "white", lineHeight: 2, fontWeight: "bold" }} href="sessionmanagement/films">
                Sinema Seans Yönetimi
              </a>
            </div><div className="butonContainer-left">
              <a style={{ color: "white", lineHeight: 2, fontWeight: "bold" }} href="sessionmanagement/theatres">
                Tiyatro Seans Yönetimi
              </a>
            </div><div className="butonContainer-left">
              <a style={{ color: "white", lineHeight: 2, fontWeight: "bold" }} href="sessionmanagement/talkshow">
                TalkShow Seans Yönetimi
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Admin;
