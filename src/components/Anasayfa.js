import React, { Component, useState, useEffect, Button } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import firebase from "firebase";
import firebaseConfig from "../constants/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

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
    getAllThings();
  }, []);

  function getAllThings() {
    firebase
      .database()
      .ref("films")
      .on("value", (data) => {
        const films = data.toJSON();
        var List = [];
        for (const key in films) {
          var HourList = [];
          for (const key2 in films[key].times) {
            HourList.push(films[key].times[key2]);
          }
          List.push({
            id: key,
            title: films[key].title,
            image: films[key].image,
            description: films[key].description,
            times: HourList,
          });
        }
        console.log(List);
        setItems(List);
      });
  };
  
  function getFilm(filmId) {
    saveFilm(filmId);
  };

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
                    <hr />
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
                    {item.times.map((item) => (
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
                    ))}
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
