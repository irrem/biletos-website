import { Button } from 'bootstrap';
import React, { Component, useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import firebase from 'firebase';
import firebaseConfig from '../constants/firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AnaSayfa = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    var user = firebase.auth().currentUser;

    if (user) {
      console.log(user);
    } else {
      console.log('no log');
    }

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
      <Row>
        <Col md='9'>
          {items.map(item => (
            <>
              <Row>
                <Col md='4'>
                  <center>
                    <img style={{ width: 200, height: 300 }} src={item.image} />
                    <br />
                    <a style={{ color: 'black', lineHeight: 2, fontWeight: 'bold' }}>
                      {item.title}
                    </a>
                  </center>
                  <hr />
                  <div className='butonContainer'>
                    <a style={{ color: 'white', lineHeight: 2, fontWeight: 'bold' }}> Bilet Al</a>
                  </div>
                </Col>
                <Col md='8'>
                  <a style={{ color: 'black', lineHeight: 2, fontWeight: 'bold' }}>{item.title}</a>
                  <br />
                  <p>{item.description}</p>
                  <br />
                  <a style={{ color: 'black', lineHeight: 2, fontWeight: 'bold' }}>
                    Seans Saatleri
                  </a>
                  <br />
                  {item.times.map(item => (
                    <div className='butonContainer-small'>
                      <a style={{ color: 'white', lineHeight: 2, fontWeight: 'bold' }}>
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

        <Col md='3'>
          <Col>
            <div className='butonContainer-left'>
              <a style={{ color: 'white', lineHeight: 2, fontWeight: 'bold' }}> Sinema </a>
            </div>
            <div className='butonContainer-left'>
              <a style={{ color: 'white', lineHeight: 2, fontWeight: 'bold' }}> Tiyatro </a>
            </div>
            <div className='butonContainer-left'>
              <a style={{ color: 'white', lineHeight: 2, fontWeight: 'bold' }}> TalkShow</a>
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default AnaSayfa;
