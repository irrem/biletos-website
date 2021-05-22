import React, { Component, useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  InputGroup,
  DropdownItem,
  DropdownMenu,
  InputGroupButtonDropdown,
  Button,
  DropdownToggle,
  InputGroupAddon
} from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import firebase from 'firebase';
import firebaseConfig from '../constants/firebase';

function TimeFormatter(time) {
  var d = new Date(time);
  var hr = d.getHours()-2;
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
const ProductManagement = () => {
  const [description, setDescription] = useState(null);
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState(null);
  const [time, setTime] = useState([]);
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);
  const [id, setId] = useState(null);
  const [showrooms, setShowrooms] = useState([]);
  const [selectedShowroom, setSelectedShowroom] = useState(null);

  const { productType } = useParams();
  console.log(productType);
  function clearInputValue() {
    setDescription('');
    setCategory('');
    setTitle('');
    setImage('');
    setTime('');
  }

  // function InsertMethod() {
  //   firebase
  //     .database()
  //     .ref("theatres")
  //     .push({
  //       category,
  //       description,
  //       image,
  //       time,
  //       title,
  //     })
  //     .then(() => {
  //       console.log("Inserted.");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   clearInputValue();
  // }

  function GetDataWithId(id) {
    db.collection(productType)
      .doc(id)
      .get()
      .then(querySnapshot => {
        // console.log(querySnapshot.id, " => ", querySnapshot.data());
        setTitle(querySnapshot.data().title);
        setDescription(querySnapshot.data().description);
        setImage(querySnapshot.data().image);
        setCategory(querySnapshot.data().category);
        setTime(querySnapshot.data().times);
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
      });
    setId(id);
  }

  const createEmptyPlan = () => {
    var Plan = [];
    for (var i = 0; i < 100; i++) {
      Plan.push({ id: '0' });
    }
    return Plan;
  };

  const InsertItemData = () => {
    db.collection(productType)
      .add({ category, title, image, description })
      .then(docRef => {
        firebase
          .database()
          .ref('showrooms/' + selectedShowroom + '/session')
          .push()
          .set({
            hour: time,
            productId: docRef.id,
            plan: createEmptyPlan()
          })
          .then(() => {
            setItems([]);

            getShowRooms();
            GetData();
            getSessions();
            console.log('Inserted.');
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  };

  function GetData() {
    var List = [];
    db.collection(productType)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot);
        querySnapshot.forEach(doc => {
          List.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            image: doc.data().image,
            category: doc.data().category,
            time: doc.data().time
          });
          console.log('srlam doc');
          console.log(doc);
        });
        console.log('---------');
        console.log(List);
        getSessions(List);
      });
  }

  async function getSessions(filmitem) {
    console.log(filmitem);
    console.log('bura gitdi');
    var newList = [];
    for (const key in filmitem) {
      await firebase
        .database()
        .ref('showrooms')
        .once('value', data => {
          for (const key1 in data.toJSON()) {
            for (const key2 in data.toJSON()[key1].session) {
              const sessionData = data.toJSON()[key1].session[key2];
              if (sessionData.productId == filmitem[key].id) {
                filmitem[key].time = sessionData.hour;
                newList.push(filmitem[key]);
                console.log('selam');
              }
            }
          }
        });
    }
    setItems(newList.reverse());
    console.log('bura geldi');
  }

  function UpdateData(id) {
    console.log(id);
    db.collection(productType).doc(id).update({ category, title, image, description, time });
    return;
  }

  function DeleteData(id) {
    db.collection(productType)
      .doc(id)
      .delete()
      .then(() => {
        setItems([]);

        getShowRooms();
        GetData();
        getSessions();
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
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

  useEffect(() => {
    getShowRooms();
    GetData();
    getSessions();
  }, []);

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
            {items.length ? (
              items.map((item, index) => (
                <div key={index}>
                  <Row>
                    {index}
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
                          lineHeight: 2,
                          fontWeight: 'bold'
                        }}
                      >
                        {item.title}
                      </a>
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
                      <br />
                      <div className='butonContainer-small'>
                        <a
                          style={{
                            color: 'white',
                            lineHeight: 2,
                            fontWeight: 'bold'
                          }}
                        >
                          {TimeFormatter(item.time)}
                        </a>
                      </div>
                    </Col>
                  </Row>
                  <hr />
                </div>
              ))
            ) : (
              <h2>Yükleniyor</h2>
            )}
          </Col>
          <Col md='5'>
            <Row>
              <Form style={{ alignItems: 'center', position: 'relative' }}>
                <FormGroup style={{ width: 450 }}>
                  <Label>Gösteri Kategorisi</Label>
                  <Input
                    onChange={text => setCategory(text.target.value)}
                    type='text'
                    placeholder='Kategori giriniz'
                    value={category}
                  />
                  <Label>Başlık</Label>
                  <Input
                    onChange={text => setTitle(text.target.value)}
                    type='text'
                    placeholder='İçeriğe uygun bir başlık giriniz'
                    value={title}
                  />
                  <Label>Açıklama</Label>
                  <Input
                    onChange={text => setDescription(text.target.value)}
                    type='text'
                    placeholder='İçerik açıklaması giriniz'
                    value={description}
                  />
                  <Label>Afiş Görseli</Label>
                  <Input
                    onChange={text => setImage(text.target.value)}
                    type='text'
                    placeholder='Afiş görsel adresini giriniz'
                    value={image}
                  />{' '}
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
                  <br />
                  <div onClick={() => InsertItemData()} className='butonContainer-small'>
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
                  <div className='butonContainer-small'>
                    <a
                      style={{
                        color: 'white',
                        lineHeight: 2,
                        fontWeight: 'bold'
                      }}
                      onClick={() => UpdateData(id)}
                    >
                      Güncelle
                    </a>
                  </div>
                  <div onClick={() => DeleteData(id)} className='butonContainer-small'>
                    <a
                      style={{
                        color: 'white',
                        lineHeight: 2,
                        fontWeight: 'bold'
                      }}
                    >
                      Sil
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

export default ProductManagement;
