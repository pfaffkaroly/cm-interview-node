import React, { useEffect, useState } from 'react';
import ApiClient from '../services/ApiClient';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';


export default function Ranks() {

  const [toplistState, setToplistState] = useState([]);
  const [showResetState, setShowResetState] = useState(false);

  const refreshRanks = () => {
    const toplistDataPromise = ApiClient.getPokemonToplist();
    toplistDataPromise.then(data => setToplistState(data));
  }

  const handleShow = () => setShowResetState(true);

  const handleClose = (deleteFlag = false) => {
    setShowResetState(false);
    if (!!deleteFlag) {
      const toplistDataPromise = ApiClient.resetPokemonToplist()
      toplistDataPromise.then(() => refreshRanks());
    }
  }

  useEffect(() => refreshRanks(), []);

  return (
    <>
      <Container fluid="md" className="mt-5">
        <Row key="header" className="align-items-center">
          <Col xs={1} className="h5 text-center">Rank</Col>
          <Col xs={2} className="h5 text-center">Image</Col>
          <Col xs={8} className="h5">Name</Col>
          <Col xs={1} className="h5 text-center">Votes</Col>
        </Row>
        {toplistState.map((pokemon, index) => (
          <Row key={index} className="align-items-center">
            <Col xs={1} className="text-center">{index + 1}.</Col>
            <Col xs={2} className="text-center"><img src={pokemon.sprite} alt={pokemon.name} style={{ height: '64px' }}/></Col>
            <Col xs={8} className="text-capitalize fw-bold">{pokemon.name}</Col>
            <Col xs={1} className="text-center">{pokemon.votes}</Col>
          </Row>
        ))}
        <Row xs={1} key="footer" className="mt-5 mb-5">
          <Col className="text-end">
            <Button variant="danger" onClick={handleShow}>Reset votes</Button>
          </Col>
        </Row>
      </Container>

      <Modal show={showResetState} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body><Alert variant="danger">Are you sure to reset the ranking? You cannot undo this operation.</Alert></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose(false)}>
            I'm not sure
          </Button>
          <Button variant="danger" onClick={() => handleClose(true)}>
            Bring it on!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}
