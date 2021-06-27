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
  var hr = d.getHours() - 2;
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
  const [price, setPrice] = useState(null);

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

  const InsertItemData = () => {
    db.collection(productType)
      .add({ category, title, image, description, price })
      .then(docRef => {
        setItems([]);
        getShowRooms();
        GetData();
        getSessions();
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
        querySnapshot.forEach(doc => {
          List.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            image: doc.data().image,
            category: doc.data().category,
            time: doc.data().time,
            price: doc.data().price
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

  function UpdateData(id) {
    console.log(id);
    db.collection(productType).doc(id).update({ category, title, image, description,price });
    setItems([]);
    getShowRooms();
    GetData();
    getSessions();
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
                        <br />
                        <a
                          style={{
                            color: 'black',
                            lineHeight: 2,
                            fontWeight: 'bold'
                          }}
                        >
                          Fiyat: {item.price} TL
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
                  />
                  <Label>Fiyat</Label>
                  <Input
                    onChange={text => setPrice(text.target.value)}
                    type='text'
                    placeholder='Film fiyatı giriniz'
                    value={price}
                  />{' '}
                  <br />
                  <div onClick={() => InsertItemData()} className='butonContainer-small'>
                    <a
                      style={{
                        color: 'white',
                        lineHeight: 2,
                        fontWeight: 'bold'
                      }}
                    >
                      Ekle
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
