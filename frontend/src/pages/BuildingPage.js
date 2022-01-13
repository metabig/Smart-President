import React, { useState, useEffect} from 'react';
import { Container, Alert, Row, FormLabel, FormControl } from 'react-bootstrap';
import {
    useParams
} from "react-router-dom";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Popup from '../components/Popup';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";


export default function BuildingPage() {
    let { id } = useParams();
    const [building, setBuilding] = useState(null);
    const [contracts, setContracts] = useState(null);
    const [show, setShow] = useState(false);
    const [voted, setVoted] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    };

    const [datos, setDatos] = useState({
      title: '',
      desc: '',
      cost: ''
    })

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [cost, setCost] = useState(0);


    const handleInputTitle = (event) => {
      console.log(event.target.value)
      setTitle(event.target.value)
    }
    const handleInputDesc = (event) => {
      console.log(event.target.value)
      setDesc(event.target.value)
    }
    const handleInputCost = (event) => {
      console.log(event.target.value)
      setCost(event.target.value)
    }

    const setDefaults = () => {
      window.location.reload();
    }

    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
    });
    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch('https://smart-president.herokuapp.com/api/buildings', { headers: myHeaders })
            .then(response => response.json())
            .then(buildings => {
                setBuilding(buildings.filter(building => building._id === id)[0])
                return buildings.filter(building => building._id === id)[0].contracts
            })
            .then(contracts => {
                fetch('https://smart-president.herokuapp.com/api/buildings/contracts', { headers: myHeaders })
                    .then((res) => res.json())
                    .then(allcontracts => setContracts(allcontracts.filter(c => contracts.includes(c._id))))
            })


        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    const handleVote = (contractId) => {
        console.log("Enters")
        fetch(`https://smart-president.herokuapp.com/api/buildings/vote/${contractId}`, { method: "POST", headers: myHeaders })
            .then(res => {res.ok ? setVoted(true) : setShow(true)})
    }

    const postContract = () => {
      console.log({
        title: title,
        description: desc,
        cost: cost
      })
      fetch(`https://smart-president.herokuapp.com/api/buildings/${id}/create_contract`, { method: "POST", headers: myHeaders, body: JSON.stringify({
        name: title,
        description: desc,
        cost: parseInt(cost)
        })
      })
         .then(res => setDefaults())
  }


    return building ?
        <div className="buildingBg container-fluid full-height">
            <h1 className="h2-2">{building.name}</h1>
            <Row style={{flex: '1', flexDirection: 'row', alignItems:'center', justifyContent: 'left', marginTop: '10px', paddingLeft: '600px'}}>
              <Col xs={10} sm={6} md={4} lg={2}>
                <br /><br />

                {contracts ?
                    contracts.map(c => {
                        return (<Card style={{ width: '18rem'}} key={c._id}>
                            <Card.Body>
                                <Card.Title>{c.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{c.created_at}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Vots: {c.votes.length} Cost estimat: {c.cost}€</Card.Subtitle>
                                <Card.Text> 
                                    {c.description} 
                                </Card.Text> 
                                <Card.Link onClick={() => handleVote(c._id)}>Vota a Favor</Card.Link>
                            </Card.Body>
                        </Card>)
                    })
                    :
                    <p>Loading contracts...</p>
                }
                {show &&
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Ja has votat a favor d'aquest contracte</Alert.Heading>
                </Alert>}
                {voted &&
                <Alert variant="success" onClose={() => setVoted(false)} dismissible>
                    <Alert.Heading>Acabes de votar a favor</Alert.Heading>
                </Alert>}
              </Col>
            </Row>
            <Row style={{flex: '1', flexDirection: 'row', alignItems:'center', justifyContent: 'center', marginTop: '5%'}}>
                <Button style={{width: '200px', borderWidth: 1, borderColor: '#000',}} onClick={() => togglePopup()} block >Crea Proposta</Button>
            </Row>

            {isOpen && <Popup
              content={<>
                <Form>
                  <FormLabel style={{fontSize:'25px'}}>Títol de la proposta</FormLabel>
                  <FormControl
                    type="text" 
                    name="title" 
                    value={title}
                    onChange={handleInputTitle}
                    >
                    
                  </FormControl>
                  
                  <FormLabel style={{fontSize:'25px', paddingTop: '30px'}}>Descripció de la proposta</FormLabel>
                  <FormControl
                    as="textarea"
                    name="desc" 
                    value={desc}
                    onChange={handleInputDesc}
                    >
                    
                  </FormControl>
                  <FormLabel style={{fontSize:'25px', paddingTop: '30px'}}>Cost estimat</FormLabel>
                  <FormControl
                    type='text'
                    name="cost" 
                    value={cost}
                    onChange={handleInputCost}
                    >
                    
                  </FormControl>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{paddingTop: '30px'}}>
                    <Form.Check type="checkbox" label="Confirmació" />
                  </Form.Group>
                </Form>
                <Row style={{flex: '1', flexDirection: 'row', alignItems:'center', justifyContent: 'center', marginTop: '5%'}}>
                  <Button onClick={() => postContract()}>Crea </Button>
                </Row>
              </>}
              handleClose={togglePopup}
            />}
        </div>
        : <p>Loading...</p>;
}
