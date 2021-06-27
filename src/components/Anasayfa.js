import React, { Component, useState, useEffect } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Row } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import firebase from "firebase";
import firebaseConfig from "../constants/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var db = firebase.firestore();

function TimeFormatter(time) {
  var d = new Date(time);
  var hr = d.getHours();
  var min = d.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  if (hr > 12) {
    hr -= 12;
  }
  return hr + ":" + min;
}

const SessionManagement = () => {
  const [time, setTime] = useState([]);
  const [items, setItems] = useState([]);
  const [id, setId] = useState(null);
  const [showrooms, setShowrooms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState([]);
  const [productType, setproductType] = useState("films");

  useEffect(() => {
    GetData(productType);
    getShowRooms();
  }, []);

  function GetDataWithId(id) {
    db.collection(productType)
      .doc(id)
      .get()
      .then((querySnapshot) => {
        setSelectedFilm({
          id: querySnapshot.id,
          title: querySnapshot.data().title,
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    setId(id);
  }

  function GetData(type) {
    var List = [];
    db.collection(type)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          List.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            image: doc.data().image,
            category: doc.data().category,
            time: doc.data().time,
            price: doc.data().price,
          });
        });
        getSessions(List);
      });
  }
  async function getSessions(filmitem) {
    var newList = [];
    for (const key in filmitem) {
      var filmSessionHours = [];
      await firebase
        .database()
        .ref("showrooms")
        .once("value", (data) => {
          for (const key1 in data.toJSON()) {
            for (const key2 in data.toJSON()[key1].session) {
              if (
                data.toJSON()[key1].session[key2].productId == filmitem[key].id
              ) {
                filmSessionHours.push({
                  session: data.toJSON()[key1].showroomName,
                  sessionId: key1,
                  hour: data.toJSON()[key1].session[key2].hour,
                  id: key2,
                });
              }
            }
          }
        });
      filmitem[key].times = filmSessionHours;
      newList.push(filmitem[key]);
    }
    setItems(newList.reverse());
    console.log(newList);
  }
  function getShowRooms() {
    var List = [];
    firebase
      .database()
      .ref("showrooms")
      .once("value", (data) => {
        for (const key in data.toJSON()) {
          List.push({ id: key, name: data.toJSON()[key].showroomName });
        }
        console.log(List);
      });
  }

  function changeProductType(type) {
    setproductType(type);
    setItems([]);
    GetData(type);
    getShowRooms();
  }

  return (
    <Container style={{ paddingTop: 40, marginBottom: 100 , marginLeft:70}}>
      <Container
        style={{
          paddingTop: 60,
          position: "relative",
        }}
      >
        <Row>
          <Col md="8">
            {items.length ? (
              items.map((item) => (
                <>
                  <Row>
                    <Col md="5">
                      <center>
                        <img
                          style={{ width: 150, height: 250 }}
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
                      <div className="butonContainer" style={{ width: 140 }}>
                        <a
                          href={"biletal/" + productType + "/" + item.id + ""}
                          style={{
                            color: "white",
                            lineHeight: 2,
                            fontWeight: "bold",
                          }}
                        >
                          Bilet Al
                        </a>
                      </div>
                    </Col>
                    <Col md="5" style={{marginLeft:40}}>
                      <a
                        style={{
                          color: "black",
                          lineHeight: 2,
                        }}
                      ></a>
                      <a
                        style={{
                          color: "black",
                          lineHeight: 2,
                          fontWeight: "bold",
                        }}
                      >
                        Seans Saatleri
                      </a>
                      {item.times.length ? (
                        item.times.map((item2) => (
                          <div className="sessionBox">
                            Salon Adı: <b>{item2.session}</b>
                            <br />
                            Saati: <b>{TimeFormatter(item2.hour)}</b>
                            </div>
                        ))
                      ) : (
                        <a>Seans Bulunmuyor...</a>
                      )}
                      <br /><br/>
                      <a>
                        <b>Fiyat:</b> {item.price} TL
                      </a>
                      <br />
                      <hr />
                      <b>Açıklama</b>
                      <br />
                      <p>{item.description}</p>
                      <br />
                    </Col>
                  </Row>
                  <hr />
                </>
              ))
            ) : (
              <h2>Yükleniyor</h2>
            )}
          </Col>
          <Col md="4">
            <Col>
              <div className="butonContainer-left">
                <a
                  style={{ color: "white", lineHeight: 2, fontWeight: "bold" }}
                  onClick={() => changeProductType("films")}
                >
                  Sinema
                </a>
              </div>
              <div
                className="butonContainer-left"
                onClick={() => changeProductType("theatres")}
              >
                <a
                  style={{ color: "white", lineHeight: 2, fontWeight: "bold" }}
                >
                  Tiyatro
                </a>
              </div>
              <div className="butonContainer-left">
                <a
                  style={{ color: "white", lineHeight: 2, fontWeight: "bold" }}
                  onClick={() => changeProductType("talkshow")}
                >
                  TalkShow
                </a>
              </div>
            </Col>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default SessionManagement;
