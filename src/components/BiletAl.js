import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import firebase from "firebase";
import firebaseConfig from "../constants/firebase";
const BiletAl = (props) => {
  const [chair, setChair] = useState([]);
  const [className, setClassname] = useState(null);
  const [title, setTitle] = useState(null);
  const [image, setImage] = useState(null);
  const [times, setTime] = useState([]);
  const [description, setDescription] = useState(null);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  let { filmId } = useParams();
 
  useEffect(() => {
    getFilm(filmId);
    var id = 0;
    var chairList = [];
    for (id; id < 108; id++) {
      chairList.push({
        id,
      });
    }
    setChair(chairList);
    console.log(chair);
    setClassname("chair-small-y"); // burada classname için props gönderiliyor ki div içeriği değişsin.
  }, []);

  function getFilm(filmId) {
    var hourList = [];

    const dbRef = firebase.database().ref();

    dbRef
      .child("films")
      .child(filmId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          for (const key in snapshot.val().times) {
            hourList.push(snapshot.val().times[key]);
          }
          setTitle(snapshot.val().title);
          setImage(snapshot.val().image);
          setDescription(snapshot.val().description);
          console.log(hourList);
          setTime(hourList);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function getChair(filmId) {
    var hourList = [];

    const dbRef = firebase.database().ref();

    dbRef
      .child("films")
      .child(filmId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          for (const key in snapshot.val().times) {
            hourList.push(snapshot.val().times[key]);
          }
          setTitle(snapshot.val().title);
          setImage(snapshot.val().image);
          setDescription(snapshot.val().description);
          console.log(hourList);
          setTime(hourList);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }


  return (
    <Container style={{ paddingTop: 40 }}>
      <Row>
        <Col>
          <>
            <Row>
              <Col md="4">
                <center>
                  <img style={{ width: 200, height: 300 }} src={image} />
                  <br />
                  <a
                    style={{
                      color: "black",
                      lineHeight: 2,
                      fontWeight: "bold",
                    }}
                  >
                    {title}
                  </a>
                </center>
                <hr />
                <div className="butonContainer">Bilet Al</div>
              </Col>
              <Col md="5">
                <Container>
                  <a
                    style={{
                      color: "black",
                      lineHeight: 2,
                      fontWeight: "bold",
                    }}
                  >
                    Seans Seçiniz
                  </a>
                  <br />
                  <div className="saloon">
                    <h4> Koltuk Seçiniz</h4>
                    {chair.map((i) => (
                      <>
                        <div className={className}></div>
                      </>
                    ))}
                  </div>
                </Container>
              </Col>
              <Col md="3">
                <a
                  style={{
                    color: "black",
                    lineHeight: 2,
                    fontWeight: "bold",
                  }}
                >
                  {title}
                </a>
                <br />
                <p>{description}</p>
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
                {times.map((item) => (
                  <>
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
                  </>
                ))}
                <br />
              </Col>
            </Row>
            <hr />
          </>
        </Col>
      </Row>
    </Container>
  );
};

export default BiletAl;
