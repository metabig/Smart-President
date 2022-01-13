import React, { useState, useEffect} from 'react';
import { Container, Alert, Row, FormLabel, FormControl } from 'react-bootstrap';
import {
    useParams
} from "react-router-dom";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Popup from '../components/Popup';
import Form from "react-bootstrap/Form";


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
      desc: ''
  })

    const handleInputChange = (event) => {

      setDatos({
          //...datos,
          [event.target.name] : event.target.value
      })
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
            .then(res => res.ok ? setVoted(true) : setShow(true))
    }

    // async registerUser() {

    //   console.log(this.state);
      
    //     try {
    //         const response = await Axios({
    //             method: 'POST',
    //             url: `https://smart-president.herokuapp.com/api/user/register/`,
    //             data: {
    //                 name: this.state.name,
    //                 password: this.state.password,
    //                 username: this.state.surnames
    //             },
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             withCredentials: true
    //         });
    //         if(response.status === 200) {
    //             this.props.history.push('/');
    //         } else {
    //             alert('Something has gone wrong. Please contact admin or refresh and try again.')
    //         }
    //     } catch (e) {
    //         alert(e.message);
    //         return;
    //     }
      
    // }

    return building ?
        <Container>
            <br /><br />
            <h1>{building.name}</h1>
            {contracts ?
                contracts.map(c => {
                    return (<Card style={{ width: '18rem' }} key={c._id}>
                        <Card.Body>
                            <Card.Title>{c.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{c.created_at}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Vots: {c.votes.length}</Card.Subtitle>
                            <Card.Text> 
                                Contracte referent a la reparació de l'ascensor [Annex 1.5.1]  
                            </Card.Text> 
                            {/* TODO Get descripcion propuesta */}
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
            <Row style={{flex: '1', flexDirection: 'row', alignItems:'center', justifyContent: 'center', marginTop: '5%'}}>
                <Button style={{width: '200px'}} onClick={() => togglePopup()} block >Crea Proposta</Button>
            </Row>

            {isOpen && <Popup
              content={<>
                <Form>
                  <FormLabel style={{fontSize:'25px'}}>Títol de la proposta</FormLabel>
                  <FormControl
                    type="text" 
                    name="titol" 
                    value={datos.title}
                    onChange={handleInputChange}
                    >
                    
                  </FormControl>
                  
                  <FormLabel style={{fontSize:'25px', paddingTop: '30px'}}>Descripció de la proposta</FormLabel>
                  <FormControl 
                    type="textarea"  //TODO textarea
                    componentClass="textarea"
                    name="name" 
                    value={datos.desc}
                    onChange={handleInputChange}
                    >
                    
                  </FormControl>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{paddingTop: '30px'}}>
                    <Form.Check type="checkbox" label="Confirmació" />
                  </Form.Group>
                </Form>
                <Row style={{flex: '1', flexDirection: 'row', alignItems:'center', justifyContent: 'center', marginTop: '5%'}}>
                  <Button >Crea </Button>
                </Row>
              </>}
              handleClose={togglePopup}
            />}
        </Container>
        : <p>Loading...</p>;
}
