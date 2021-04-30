import { Button } from 'bootstrap';
import React, { Component, useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import firebase from 'firebase';
import firebaseConfig from '../constants/firebase';

const AnaSayfa = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref('films')
      .on('value', data => {
        const films = data.toJSON();
        var List = [];
        for (const key in films) {
          var HourList = [];
          for (const key2 in films[key].times) {
            HourList.push(films[key].times[key2]);
          }
          List.push({
            title: films[key].title,
            image: films[key].image,
            description: films[key].description,
            times: HourList
          });
        }
        setItems(List);
      });
  }, []);

  return (
    <Container style={{ paddingTop: 40 }}>
      {items.map(item => (
        <>
          <Row>
            <Col md='3'>
              <center>
                <img src={item.image} />
                <br />
                <a style={{ color: 'black', lineHeight: 2, fontWeight: 'bold' }}>{item.title}</a>
              </center>
              <hr />
              <div className='butonContainer'>
                <a style={{ color: 'white', lineHeight: 2, fontWeight: 'bold' }}> Bilet Al</a>
              </div>
            </Col>
            <Col md='6'>
              <a style={{ color: 'black', lineHeight: 2, fontWeight: 'bold' }}>{item.title}</a>
              <br />
              <p>{item.description}</p>
              <br />
              <a style={{ color: 'black', lineHeight: 2, fontWeight: 'bold' }}>Seans Saatleri</a>
              <br />
              {item.times.map(item => (
                <div className='butonContainer-small'>
                  <a style={{ color: 'white', lineHeight: 2, fontWeight: 'bold' }}>{item.hour}</a>
                </div>
              ))}
            </Col>
          </Row>
          <hr />
        </>
      ))}
      <hr />
    </Container>
  );
};

export default AnaSayfa;
