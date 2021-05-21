import React, { Component, useState, useEffect } from "react";
import { Container, FormGroup, Input,Form,Label,Col } from "reactstrap";
import firebase from "firebase";
import firebaseConfig from "../constants/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Payment = () => {
  return (
    <Container
      style={{
        paddingTop: 60,
        position: "relative",
      }}
    ><Col>
        {/* <Form>
            <FormGroup>
            <Label>Kart Üzerindeki Ad Soyad</Label>
                  <Input
                    type="text"
                  />       <Label>Kart Üzerindeki Ad Soyad</Label>
                  <Input
                    type="text"
                  /> 
      <Label>Kart Üzerindeki Ad Soyad</Label>
                  <Input
                    type="text"
                  /> 
      <Label>Kart Üzerindeki Ad Soyad</Label>
                  <Input
                    type="text"
                  /> 


            </FormGroup>
        </Form> */}</Col>
    </Container>
  );
};

export default Payment;
