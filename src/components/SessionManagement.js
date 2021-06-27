import React, { Component, useState, useEffect } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Row } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import firebase from 'firebase';
import firebaseConfig from '../constants/firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var db = firebase.firestore();

function TimeFormatter(time) {
  var d = new Date(time);
  var hr = d.getHours();
  var min = d.getMinutes();
  if (min < 10) {
    min = '0' + min;
  }
  if (hr > 12) {
    hr -= 12;
  }
  return hr + ':' + min;
}

const SessionManagement = () => {
  const [time, setTime] = useState([]);
  const [items, setItems] = useState([]);
  const [id, setId] = useState(null);
  const [showrooms, setShowrooms] = useState([]);
  const [selectedShowroom, setSelectedShowroom] = useState(null);
  const [selectedFilm, setSelectedFilm] = useState([]);

  const { productType } = useParams();
  function clearInputValue() {
    setTime('');
  }

  useEffect(() => {
    GetData();
    getShowRooms();
  }, []);

  function GetDataWithId(id) {
    db.collection(productType)
      .doc(id)
      .get()
      .then(querySnapshot => {
        setSelectedFilm({ id: querySnapshot.id, title: querySnapshot.data().title });
      })
      .catch(error => {
       // console.log('Error getting documents: ', error);
      });
    setId(id);
  }

  const createEmptyPlan = () => {
    var Plan = [];
    for (var i = 0; i < 100; i++)
      Plan.push({ id: '0' });    
    return Plan;
  };

  function addSession() {
    firebase
      .database()
      .ref('showrooms/' + selectedShowroom + '/session')
      .push()
      .set({
        hour: time,
        productId: selectedFilm.id,
        plan: createEmptyPlan()
      })
      .then(() => {
        setItems([]);
        GetData();
        getShowRooms();
      })
      .catch(error => {
       // console.log(error);
      });
  }

  function GetData() {
    var List = [];
    db.collection(productType)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          List.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            image: doc.data().image,
            category: doc.data().category,
            time: doc.data().time
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
        .ref('showrooms')
        .once('value', data => {
          for (const key1 in data.toJSON()) {
            for (const key2 in data.toJSON()[key1].session) {
              if (data.toJSON()[key1].session[key2].productId == filmitem[key].id) {
                filmSessionHours.push({
                  session: data.toJSON()[key1].showroomName,
                  sessionId: key1,
                  hour: data.toJSON()[key1].session[key2].hour,
                  id: key2
                });
              }
            }
          }
        });
      filmitem[key].times = filmSessionHours;
      newList.push(filmitem[key]);
    }
    setItems(newList.reverse());
  }
  function getShowRooms() {
    var List = [];
    firebase
      .database()
      .ref('showrooms')
      .once('value', data => {
        for (const key in data.toJSON()) {
          List.push({ id: key, name: data.toJSON()[key].showroomName });
        }
        setShowrooms(List);
      });
  }

  async function deleteSession(sessionId, session) {
    await firebase
      .database()
      .ref('showrooms/' + sessionId + '/session/' + session)
      .remove();
    await setItems([]);
    await GetData();
    await getShowRooms();
  }

  return (
    <Container style={{ paddingTop: 40, marginBottom: 100 }}>
      <Container
        style={{
          paddingTop: 60,
          position: 'relative'
        }}
      >
        <Row>
          <Col md='7'>
            {items.map(item => (
              <>
                <Row>
                  <Col md='4'>
                    <center>
                      <img style={{ width: 150, height: 250 }} src={item.image} />
                      <br />
                      <a
                        style={{
                          color: 'black',
                          lineHeight: 2,
                          fontWeight: 'bold'
                        }}
                      >
                        {item.title}
                      </a>
                    </center>
                    <hr />
                    <div className='butonContainer'>
                      <a
                        onClick={() => GetDataWithId(item.id)}
                        style={{
                          color: 'white',
                          lineHeight: 2,
                          fontWeight: 'bold'
                        }}
                      >
                        Seç
                      </a>
                    </div>
                  </Col>
                  <Col md='4'>
                    <a
                      style={{
                        color: 'black',
                        lineHeight: 2
                      }}
                    >
                      <b style={{ color: 'red' }}>{item.title}</b>
                      <br />
                      Salon:<b> {item.showroom}</b>
                    </a>
                    <br />
                    <br />
                    <b>Açıklama</b>
                    <br />
                    <p>{item.description}</p>
                    <br />
                    <a
                      style={{
                        color: 'black',
                        lineHeight: 2,
                        fontWeight: 'bold'
                      }}
                    >
                      Seans Saatleri
                    </a>
                    <div className="butonContainer">
                    <br />
                    {item.times.length ? (
                      item.times.map(item2 => (
                        <div>
                          Salon Adı: <b>{item2.session}</b>
                          <br />
                          Saati: <b>{TimeFormatter(item2.hour)}</b>
                          <a
                            onClick={() => deleteSession(item2.sessionId, item2.id)}
                            style={{ marginLeft: 10, textDecoration: 'underline', color: 'red' }}
                          >
                            SİL
                          </a>
                        </div>
                      ))
                    ) : (
                      <a>Seans Bulunmuyor...</a>
                    )}</div>
                  </Col>
                </Row>
                <hr />
              </>
            ))}
          </Col>
          <Col md='5'>
            <Row>
              <Form style={{ alignItems: 'center', position: 'relative' }}>
                {selectedFilm.title}
                <FormGroup style={{ width: 450 }}>
                  <Label>Salon Seçiniz</Label>
                  <br />
                  <select onChange={e => setSelectedShowroom(e.target.value)}>
                    <option>Seçiniz...</option>
                    {showrooms.map(item => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </select>
                  <br />
                  <Label>Seans Saatleri</Label>
                  <Input
                    onChange={e => setTime(e.target.value)}
                    type='datetime-local'
                    placeholder='Seans tarihlerini giriniz'
                  />
                  <div onClick={() => addSession()} className='butonContainer-small'>
                    <a
                      style={{
                        color: 'white',
                        lineHeight: 2,
                        fontWeight: 'bold'
                      }}
                    >
                      Kaydet
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

export default SessionManagement;
