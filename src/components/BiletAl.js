import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import jwt from 'jsonwebtoken';
import firebase from 'firebase';
import firebaseConfig from '../constants/firebase';
const BiletAl = props => {
  const [chair, setChair] = useState([]);
  const [className, setClassname] = useState(null);
  const [title, setTitle] = useState(null);

  const [items, setItems] = useState([]);
  const [selectedSessionPlan, setSelectedSessionPlan] = useState([]);
  const [selectedChair, setSelectedChair] = useState([]);

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
  }

  function buyTicket(data) {
    if (selectedChair.length < 1) return alert('Önce seans seçiniz');
    if (!localStorage.getItem('user-session')) return alert('Önce giriş yapmalısınız');
    jwt.sign(JSON.stringify(selectedChair), 'biletos-password', function (err, data) {
      localStorage.setItem('payment-session', data);
      window.location.href = '/payment';
    });
  }

  return (
    <Container style={{ paddingTop: 40 }}>
      <Row>
        <Col>
          <>
            <Row>
              <Col md='3'>
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
                  <hr />
                  <a
                    style={{
                      color: 'black',
                      lineHeight: 2,
                      fontWeight: 'bold'
                    }}
                  >
                    Fiyat: {items?.product?.price} TL
                  </a>
                </center>
                <hr />
                <a onClick={() => buyTicket(items)} className='butonContainer'>
                  Bilet Al
                </a>
              </Col>
              <Col md='6'>
                <Container>
                  <h5> Öncelikle Seans Seçiniz</h5>
                  <br />
                  <br />
                  <h6> Seans Salonundan Koltuk Seçiniz</h6>
                  <div
                    className='saloon'
                    style={{ width: '100%', height: '100%', wordWrap: 'break-word' }}
                  >
                    {selectedSessionPlan?.plan?.map((item, index) => (
                      <a
                        onClick={() =>
                          item.id != 0
                            ? alert('Bu koltuk ' + item.id + ' tarafından alınmış')
                            : setSelectedChair({
                                showroomId: selectedSessionPlan?.showroomId,
                                sessionId: selectedSessionPlan?.sessionId,
                                chairId: index,
                                title: items?.product?.title,
                                price: items?.product?.price
                              })
                        }
                        style={{
                          backgroundColor:
                            item.id != 0
                              ? 'gray'
                              : selectedChair.chairId == index
                              ? 'lightgreen'
                              : 'lightgray',
                          marginLeft: 5,

                          lineHeight: 3,
                          padding: 9.42,
                          fontSize: 0,
                          cursor: 'pointer'
                        }}
                      >
                        o
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
                    Seçilen Koltuk No: <b>{selectedChair.chairId}</b>
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
                    <div style={{ height: 100 }} className='butonContainer-left'>
                      <a
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 15
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
