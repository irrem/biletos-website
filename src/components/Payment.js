import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Input, Label } from "reactstrap";
import firebase from "firebase";
import firebaseConfig from "../constants/firebase";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var user = firebase.auth().currentUser;
var db = firebase.firestore();

const Payment = () => {
  const [cvc, setCvc] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [cardName, setCardName] = useState(null);
  const [cardDeadline, setCardDeadline] = useState(null);

  return (
    <Container style={{ paddingTop: 30, marginBottom: 100, paddingLeft: 100 }}>
      <h4>Kart Bilgileri</h4>
      <br />
      <Row
        style={{
          width: 1000,
          backgroundColor: "#eee9e9",
          padding: 30,
          borderRadius: 10
        }}
      >
        <Col xs="5">
          <Form style={{ alignItems: "center", position: "relative" }}>
            {" "}
            <FormGroup>
              <br />
              <Label>Kart Numarası</Label>
              <Input
                onChange={(text) => setCardNumber(text.target.value)}
                type="text"
                placeholder="____-____-____-____"
                value={cardNumber}
              />
              <br />
              <Label>Kart Üzerindeki İsim Soyisim</Label>
              <Input
                type="text"
                onChange={(text) => setCardName(text.target.value)}
                value={cardName}
                name="cardName"
              />
              <br />
              <Label>Son Kullanma Tarihi (Ay/Yıl) </Label>
              <Input
                type="text"
                onChange={(text) => setCardDeadline(text.target.value)}
                value={cardDeadline}
                placeholder="__/__"
              />
              <br />
              <Label> CVC </Label>
              <Input
                type="number"
                onChange={(text) => setCvc(text.target.value)}
                value={cvc}
              />
            </FormGroup>
          </Form>
        </Col>

        <Col
          xs="5"
          style={{ paddingTop: 50, marginBottom: 100, marginLeft: 100 }}
        >
          <Label> Sipariş Özeti </Label>
          <br />
          <Label> Film Adı </Label>
          <br />
          <Label> Salon </Label>
          <br />
          <Label> Koltuk No </Label>
          <br />
          <Label> Toplam </Label>
          <br />
          <br />
          <br />
          <div className="butonContainer">
            <a
              style={{
                color: "white",
                lineHeight: 2,
                fontWeight: "bold",
              }}
            >
              Ödeme Yap
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
