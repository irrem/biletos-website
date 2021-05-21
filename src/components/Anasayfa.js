import React, { Component, useState, useEffect, Button } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import firebase from "firebase";
import firebaseConfig from "../constants/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var db = firebase.firestore();

const AnaSayfa = ({ saveFilm }) => {
  const [items, setItems] = useState([]);
  const [type, setType] = useState(null);

  useEffect(() => {
    var user = firebase.auth().currentUser;

    if (user) {
      console.log(user);
    } else {
      console.log("no log");
    }
    GetData();
  }, []);

  function GetData() {
    var List = [];
    db.collection("films")
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          List.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            image: doc.data().image,
            category: doc.data().category,
            time: doc.data().time,
          });
        });
        console.log(List);
        setItems(List);
      });
  }
  function getFilm(filmId) {
    saveFilm(filmId);
  }

  return (
    <Container>
      <Container style={{ paddingTop: 40 }}>
        <Row>
          <Col md="9">
            {items.map((item) => (
              <>
                <Row>
                  <Col md="4">
                    <center>
                      <img
                        style={{ width: 200, height: 300 }}
                        src={item.image}
                      />
                      <br />
                      <a
                        style={{
                          color: "black",
                          lineHeight: 2,
                          fontWeight: "bold",
                        }}
                      >
                        {item.title}
                      </a>
                    </center>
                    <hr />{" "}
                    <div className="butonContainer">
                      <Link
                        to={`biletal/${item.id}`}
                        style={{
                          color: "white",
                          lineHeight: 2,
                          fontWeight: "bold",
                        }}
                      >
                        Bilet Al
                      </Link>
                    </div>
                  </Col>
                  <Col md="8">
                    <a
                      style={{
                        color: "black",
                        lineHeight: 2,
                        fontWeight: "bold",
                      }}
                    >
                      {item.title}
                    </a>
                    <br />
                    <p>{item.description}</p>
                    <br />
                    <a
                      style={{
                        color: "black",
                        lineHeight: 2,
                        fontWeight: "bold",
                      }}
                    >
                      Seans Saatleri
                    </a>
                    <br />

                    <div className="butonContainer-small">
                      <a
                        style={{
                          color: "white",
                          lineHeight: 2,
                          fontWeight: "bold",
                        }}
                      >
                        {item.hour}
                      </a>
                    </div>
                  </Col>
                </Row>
                <hr />
              </>
            ))}
          </Col>

          <Col md="3">
            <Col>
              <div className="butonContainer-left">
                <a
                  style={{ color: "white", lineHeight: 2, fontWeight: "bold" }}
                  onClick={() => setType("films")}
                >
                  Sinema
                </a>
              </div>
              <div className="butonContainer-left">
                <a
                  style={{ color: "white", lineHeight: 2, fontWeight: "bold" }}
                  onClick={() => setType("theatre")}
                >
                  Tiyatro
                </a>
              </div>
              <div className="butonContainer-left">
                <a
                  style={{ color: "white", lineHeight: 2, fontWeight: "bold" }}
                  onClick={() => setType("talkshow")}
                >
                  TalkShow
                </a>
              </div>
            </Col>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <div className="footer">
              <a style={{ color: "white", lineHeight: 2, fontWeight: "bold" }}>
                İletişim
              </a>
              <a style={{ color: "white", lineHeight: 2, fontWeight: "bold" }}>
                Hakkımızda
              </a>
              <a style={{ color: "white", lineHeight: 2, fontWeight: "bold" }}>
                Salonlar
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AnaSayfa;
