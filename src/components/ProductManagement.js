import React, { Component, useState, useEffect } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row
} from "reactstrap";
import firebase from "firebase";
import firebaseConfig from "../constants/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var db = firebase.firestore();

const UserManagement = () => {
  const hourList = { hour: "10:30", hour: "17:30" };
  const [description, setDescription] = useState(null);
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState(null);
  const [time, setTime] = useState(null);
  const [image, setImage] = useState(null);

  function clearInputValue() {
    setDescription("");
    setCategory("");
    setTitle("");
    setImage("");
    setTime("");
  }

  function InsertMethod() {
    firebase
      .database()
      .ref("theatres")
      .push({
        category,
        description,
        image,
        time: hourList,
        title,
      })
      .then(() => {
        console.log("Inserted.");
      })
      .catch((error) => {
        console.log(error);
      });
      clearInputValue();
  }

  useEffect(() => {});

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
          <Col md="6"></Col>
          <Col md="5">
            <Row>
              <Form style={{ alignItems: "center", position: "relative" }}>
                <FormGroup style={{ width: 450 }}>
                  <Label>Gösteri Kategorisi</Label>
                  <Input
                    onChange={(text) => setCategory(text.target.value)}
                    type="text"
                    placeholder="Tiyatro kategorisi giriniz"
                    value={category}
                  />
                  <Label>Başlık</Label>
                  <Input
                    onChange={(text) => setTitle(text.target.value)}
                    type="text"
                    placeholder="İçeriğe uygun bir başlık giriniz"
                    value={title}
                  />
                  <Label>Açıklama</Label>
                  <Input
                    onChange={(text) => setDescription(text.target.value)}
                    type="text"
                    placeholder="İçerik açıklaması giriniz"
                    value={description}
                  />
                  <Label>Afiş Görseli</Label>
                  <Input
                    onChange={(text) => setImage(text.target.value)}
                    type="text"
                    placeholder="Afiş görsel adresini giriniz"
                    value={image}
                  />{" "}
                  <Label>Seans Saatleri</Label>
                  <Input
                    onChange={(text) => setTime(text.target.value)}
                    type="text"
                    placeholder="Seans tarihlerini giriniz"
                    value={time}
                  />
                  <div className="butonContainer-small">
                    <a
                      style={{
                        color: "white",
                        lineHeight: 2,
                        fontWeight: "bold",
                      }}
                      onClick={() => InsertMethod()}
                    >
                      Kaydet
                    </a>
                  </div>
                  <div className="butonContainer-small">
                    <a
                      style={{
                        color: "white",
                        lineHeight: 2,
                        fontWeight: "bold",
                      }}
                      //onClick={() => UpdateData(id)}
                    >
                      Güncelle
                    </a>
                  </div>
                  <div className="butonContainer-small">
                    <a
                      style={{
                        color: "white",
                        lineHeight: 2,
                        fontWeight: "bold",
                      }}
                      // onClick={() => DeleteData(id)}
                    >
                      Sil
                    </a>
                  </div>
                </FormGroup>
              </Form>
            </Row>
          </Col>
        </Row>        
      </Container>
    </Container>
  );
};

export default UserManagement;
