import React from 'react';
import { Container, Row, Col } from 'reactstrap';
const UyeOl = () => {
  return (
    <Container style={{ paddingTop: 40 }}>
      <Row>
        <Col md='3'>
          <center>
            <img src='https://img01.imgsinemalar.com/images/afis_buyuk/g/good-morning-veronica-1614678038.jpg' />
            <br />
            <a style={{ color: 'black', lineHeight: 2, fontWeight: 'bold' }}>Film Başlık</a>
          </center>
          <hr />
          <p>
            Bir intihara tanık olduktan sonra buna neden olanları bulmak isteyen alçakgönüllü bir
            polis memuru, reddedilmiş iki suç dosyasını araştırmaya karar verir. Bu araştırması onu
            korkunç bir sır saklayan bir çifte yönlendirir.
          </p>
        </Col>
        <Col md='6'>6 Parça</Col>
        <Col md='3'>3 Parça</Col>
      </Row>
    </Container>
  );
};

export default UyeOl;
