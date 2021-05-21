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
  const [category, setCategory] = useState(null);
  const [id, setId] = useState(null);
  const [time, setTime] = useState([]);
  const [description, setDescription] = useState(null);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  let { filmId } = useParams();

  var db = firebase.firestore();

  useEffect(() => {
    GetDataWithId(filmId);
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

  function GetDataWithId() {
    db.collection("films")
      .doc(filmId)
      .get()
      .then((querySnapshot) => {
        // console.log(querySnapshot.id, " => ", querySnapshot.data());
        setTitle(querySnapshot.data().title);
        setDescription(querySnapshot.data().description);
        setImage(querySnapshot.data().image);
        setCategory(querySnapshot.data().category);
        setTime(querySnapshot.data().times);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    setId(id);
  }

  const getChair = () => {
    db.collection("chair")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
      });
  };

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
                <div className="butonContainer" onClick={()=>window.location.href="payment"}>Bilet Al</div>
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
                <div className="butonContainer-small">
                  <a
                    style={{
                      color: "white",
                      lineHeight: 2,
                      fontWeight: "bold",
                    }}
                  >
                    {time}
                  </a>
                </div>
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
