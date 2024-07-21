import React, { useEffect, useState } from 'react';
import ApiClient from '../services/ApiClient';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';


export default function Voting() {
  
  const [pokemonState, setPokemonState] = useState([]);
  const [modalState, setModalState] = useState({ show: false, title: '', body: '' })
  const [toastState, setToastState] = useState({ show: false, title: '', body: '' })

  const refreshPokemons = () => {
    const pokemonDataPromise = ApiClient.getPokemonsRandom();
    pokemonDataPromise.then(data => setPokemonState(data));
  }

  useEffect(() => refreshPokemons, []);

  const playAudio = (name) => {
    document.getElementById(`${name}-audio`).play()
  }

  const upvotePokemon = (pokemon) => {
    const pokemonVotePromise = ApiClient.upvotePokemon(pokemon.id);
    pokemonVotePromise.then(() => {
      const name = pokemon.name.toLowerCase().replace(/(?:^|\s)[a-z]/g, (firstChar) => {
        return firstChar.toUpperCase();
      });
      setToastState({ show: true, title: 'Successful upvote', body: `Thank you for your vote on ${name}` });
      refreshPokemons();
    });
  }

  return (
    <>
      <Container fluid="md" className="mt-5">
        <ToastContainer  position="middle-center" style={{ zIndex: 1 }}>
          <Toast autohide show={toastState.show} delay={3000} onClose={() => setToastState({ show: false, title: '', body: '' })} bg="success">
            <Toast.Header closeButton={false}>
              <strong className="me-auto">{toastState.title}</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{toastState.body}</Toast.Body>
          </Toast>
        </ToastContainer>
        <Row xs={1} md={2} className="g-4">
          {pokemonState.map((pokemon, index) => (
            <Col key={index}>
              <Card data-testid="pokemon-card" style={{ height: '34rem' }}>
                <Card.Img data-testid="pokemon-image" variant="top" src={pokemon.sprite} alt={pokemon.name} style={{ width: '256px',  height: '256px', alignSelf: 'center'}} />
                <Card.Body>
                  <Card.Title data-testid="pokemon-name" className="h4 text-capitalize text-center mt-2 mb-5">{pokemon.name}</Card.Title>
                  <audio data-testid="pokemon-cries" id={`${pokemon.name}-audio`} preload="auto" className="w-100">
                    <source src={pokemon.cries} type="audio/ogg"/>
                    Your browser does not support the audio element.
                  </audio>
                  <Row>
                    <Col xs={3}>Height:</Col>
                    <Col xs={9} className="text-end fw-bold">{pokemon.height}</Col>
                  </Row>
                  <Row>
                    <Col xs={3}>Weight:</Col>
                    <Col xs={9} className="text-end fw-bold">{pokemon.weight}</Col>
                  </Row>
                  <Row>
                    <Col xs={3}>Experience:</Col>
                    <Col xs={9} className="text-end fw-bold">{pokemon.experience}</Col>
                  </Row>
                  <Row>
                    <Col xs={3}>Abilities:</Col>
                    <Col xs={9} className="text-end fw-bold">
                      {pokemon.abilities.map((a, i) => (
                        <span key={`ability$${i}`}>
                          <span>{(i > 0) ? ', ' : ''}</span>
                          <a href="#" onClick={() => setModalState({show: true, title: a.ability.name, body: a.ability.effect}) }>{
                            a.ability.name
                          }</a>
                        </span>
                      ))}
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col xs={6}><Button variant="dark" onClick={() => playAudio(pokemon.name)}>Make some noise</Button></Col>
                    <Col xs={6} className="text-end"><Button variant="primary" onClick={() => upvotePokemon(pokemon)}>Upvote</Button></Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Modal size="lg" centered show={modalState.show} fullscreen={false} onHide={() => setModalState({ show: false, title: '', body: '' })}>
        <Modal.Header closeButton>
          <Modal.Title>{modalState.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalState.body}</Modal.Body>
      </Modal>
    </>
  );
}
