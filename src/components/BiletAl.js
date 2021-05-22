import React, { Component, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import firebase from 'firebase';
import firebaseConfig from '../constants/firebase';
const BiletAl = props => {
  const [chair, setChair] = useState([]);
  const [className, setClassname] = useState(null);
  const [title, setTitle] = useState(null);

  const [items, setItems] = useState([]);
  const [image, setImage] = useState(null);
  const [times, setTime] = useState([]);
  const [description, setDescription] = useState(null);
  const [selectedSessionPlan, setSelectedSessionPlan] = useState([]);
  const [selectedChair, setSelectedChair] = useState(null);

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
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  var db = firebase.firestore();
  const { productType, productId } = useParams();
  useEffect(() => {
    GetData();
  }, []);

  function GetData() {
    var List = [];
    db.collection(productType)
      .doc(productId)
      .get()
      .then(querySnapshot => {
        var filmSessionHours = [];
        firebase
          .database()
          .ref('showrooms')
          .once('value', data => {
            for (const key1 in data.toJSON()) {
              for (const key2 in data.toJSON()[key1].session) {
                if (data.toJSON()[key1].session[key2].productId == productId) {
                  filmSessionHours.push({
                    session: data.toJSON()[key1].showroomName,
                    sessionId: key1,
                    plan: data.toJSON()[key1].session[key2].plan,
                    hour: data.toJSON()[key1].session[key2].hour,
                    id: key2
                  });
                }
              }
            }
            setItems({ product: querySnapshot.data(), hours: filmSessionHours });
          });
      });
  }

  function changeSessionPlan(data) {
    var planArray = [];
    for (const key in data.plan) {
      planArray.push(data.plan[key]);
    }
    data.plan = planArray;
    setSelectedSessionPlan(data);
    console.log(data);
  }


  function buyTicket(params) {
    
  }

  return (
    <Container style={{ paddingTop: 40 }}>
      <Row>
        <Col>
          <>
            <Row>
              <Col md='4'>
                <center>
                  <img style={{ width: 200, height: 300 }} src={items?.product?.image} />
                  <br />
                  <a
                    style={{
                      color: 'black',
                      lineHeight: 2,
                      fontWeight: 'bold'
                    }}
                  >
                    {items?.product?.title}
                  </a>
                </center>
                <hr />
                <div className='butonContainer'>Bilet Al</div>
              </Col>
              <Col md='5'>
                <Container>
                  <a
                    style={{
                      color: 'black',
                      lineHeight: 2,
                      fontWeight: 'bold'
                    }}
                  >
                    Seans Seçiniz
                  </a>
                  <br />
                  <div
                    className='saloon'
                    style={{ width: '100%', height: '100%', wordWrap: 'break-word' }}
                  >
                    <h4> Koltuk Seçiniz</h4>
                    {selectedSessionPlan?.plan?.map((item, index) => (
                      <a
                        onClick={() => setSelectedChair(index)}
                        style={{
                          backgroundColor: selectedChair == index ? 'lightgreen' : 'gray',
                          marginLeft: 5,
                          lineHeight: 3,
                          padding: 5,
                          fontSize: 15
                        }}
                      >
                        O
                      </a>
                    ))}
                  </div>
                </Container>
              </Col>
              <Col md='3'>
                <a
                  style={{
                    color: 'black',
                    lineHeight: 2,
                    fontWeight: 'bold'
                  }}
                >
                  {items?.product?.title}
                </a>
                <br />
                <p>{items?.product?.description}</p>
                <br />
                {selectedChair != null ? (
                  <a>
                    Seçilen Koltuk No: <b>{selectedChair}</b>
                  </a>
                ) : null}
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
                <br />
                {items?.hours?.length ? (
                  items?.hours?.map(item2 => (
                    <div style={{ height: 200 }} className='butonContainer-small'>
                      <a
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 10
                        }}
                        onClick={() =>
                          changeSessionPlan({
                            plan: item2.plan,
                            showroomId: item2.sessionId,
                            sessionId: item2.id
                          })
                        }
                      >
                        <a>
                          Salon Adı: <b>{item2.session}</b>
                          <br />
                          Saati: <b>{TimeFormatter(item2.hour)}</b>
                        </a>
                      </a>
                    </div>
                  ))
                ) : (
                  <a>Seans Bulunmuyor...</a>
                )}
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
