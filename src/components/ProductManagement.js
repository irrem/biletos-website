import React, { Component, useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row
} from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import firebase from 'firebase';
import firebaseConfig from '../constants/firebase';

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
        });
        console.log(List);
        setItems(List);
      });
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
        console.log('Document successfully deleted!');
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
                        onClick={() => setId(item.id)}
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
                        {item.times}
                      </a>
                    </div>
                  </Col>
                </Row>
                <hr />
              </>
            ))}
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
                  <div className='butonContainer-small'>
                    <a
                      style={{
                        color: 'white',
                        lineHeight: 2,
                        fontWeight: 'bold'
                      }}
                      onClick={() => InsertItemData()}
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
                  <div className='butonContainer-small'>
                    <a
                      style={{
                        color: 'white',
                        lineHeight: 2,
                        fontWeight: 'bold'
                      }}
                      onClick={() => DeleteData(id)}
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
