import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col,Button } from "reactstrap";
import firebase from "firebase";
import firebaseConfig from "../constants/firebase";
const BiletAl = () => {
  const [chair, setChair] = useState([]);
  const [color, setColor] = useState(null);
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    var i = 0;
    var chairList = [];
    for (i; i < 108; i++) {
      chairList.push({
        id: i,
      });
    }
    setChair(chairList);
    setColor("black");

  }, []);
  
  

  return (
    <Container style={{ paddingTop: 40 }}>
      <Row>
        
        <Col md="5">
        <Container>
      <h4> Seans Seçiniz</h4>

      <div className="saloon">
        <h4> Koltuk Seçiniz</h4>
      {chair.map((i) => (
        <>
          <div className="chair-small" >
         
        </div>
        </>
      ))}
      </div>
      </Container>
          </Col>
          <Col md="3">
          </Col>
      </Row>
    
    </Container>
  );
};

export default BiletAl;
