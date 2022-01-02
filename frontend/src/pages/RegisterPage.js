import React, { Component } from 'react';
import { withRouter } from "react-router-dom"; 
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";


class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surnames: "",
            email: "",
            password: "",
            passwordR: "",
            redirect: false,
            validated: false,
            input: {},
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
    let input = this.state.input;
    input[e.target.name] = e.target.value; 

		this.setState({
			[e.target.name] : e.target.value
		});
    }

    componentDidMount() {
        if(localStorage.getItem('token')) {
            this.setState({
                redirect: true
            });
        }
    }

    handleSubmit = (form) => {
        //form.preventDefault();
    
        if(this.validate()){
            console.log(this.state);
      
            let input = {};
            input["name"] = "";
            input["surnames"] = "";
            input["email"] = "";
            input["password"] = "";
            input["passwordR"] = "";
            this.setState({input:input});
      
            this.registerUser();
            //alert('Demo Form is submited');
        }

        //if (form.checkValidity() === false) {
        //  this.setValidated(true);
        //} else {
        //  this.registerUser();
        //}
    }

    validate(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;
  
      if (!input["name"]) {
        isValid = false;
        errors["name"] = "Sisplau introdueix el teu nom.";
      }

      if (!input["surnames"]) {
        isValid = false;
        errors["surnames"] = "Sisplau introdueix els teus cognoms.";
      }
  
      if (!input["email"]) {
        isValid = false;
        errors["email"] = "Sisplau introdueix el teu correu electrònic.";
      }
  
      if (typeof input["email"] !== "undefined") {
          
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        //var pattern = new RegExp("^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+");
        if (!pattern.test(input["email"])) {
          isValid = false;
          errors["email"] = "Sisplau introdueix un correu electrònic vàlid.";
        }
      }
  
      if (!input["password"]) {
        isValid = false;
        errors["password"] = "Sisplau introdueix la contrasenya.";
      }

      // if (typeof input["password"] !== "undefined") {
          
      //   var correctPass = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~?.,_-]).{6,}$");
      //   if (!correctPass.test(input["password"])) {
      //     isValid = false;
      //     errors["password"] = "La contrasenya ha de contenir almenys \nuna majúscula, una minúscula, un nombre i un símbol.";
      //   }
      // }
  
      // if (!input["passwordR"]) {
      //   isValid = false;
      //   errors["passwordR"] = "Sisplau repeteix la contrasenya.";
      // }
  
      if (typeof input["password"] !== "undefined" && typeof input["passwordR"] !== "undefined") {
          
        if (input["password"] !== input["passwordR"]) {
          isValid = false;
          errors["passwordR"] = "Les contresenyes no coincideixen.";
        }
      } 
  
      this.setState({
        errors: errors
      });
  
      return isValid;
    }

    async registerUser() {

      console.log(this.state);
      
        try {
            const response = await Axios({
                method: 'POST',
                url: `https://smart-president.herokuapp.com/api/user/register/`,
                data: {
                    name: this.state.name,
                    password: this.state.password,
                    username: this.state.surnames
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if(response.status === 200) {
                this.props.history.push('/');
            } else {
                alert('Something has gone wrong. Please contact admin or refresh and try again.')
            }
        } catch (e) {
            alert(e.message);
            return;
        }
      
    }

    setValidated = (value) => {
        this.setState({validated: value});
    }

    

    render() {

        return (
          <Container  className="registerBg">
              <Row className="full-height align-items-center" style={{display: 'flex', justifyContent: 'center'}}>
                  <Col xs={12} sm={8} md={6} lg={4}>
                      <Card className="register-card">
                        <Card.Header className="text-center">Registre</Card.Header>
                        <Card.Body>
                            <Form ref="registerForm" validated={this.state.validated}>
                              <Form.Label>Nom</Form.Label>
                              <Form.Control 
                                  type="text" 
                                  name="name" 
                                  placeholder="Introdueix el nom" 
                                  value={this.state.name} 
                                  onChange={(e) => this.handleChange(e)}
                                  required
                                  >
                                </Form.Control>
                              <div className="text-danger">{this.state.errors.name}</div>  
                              <Form.Label>Cognoms</Form.Label>
                              <Form.Control 
                                  type="text" 
                                  name="surnames" 
                                  placeholder="Introdueix els cognoms" 
                                  value={this.state.surnames} 
                                  onChange={(e) => this.handleChange(e)}
                                  required
                                  >
                                </Form.Control>
                              <div className="text-danger">{this.state.errors.surnames}</div>  
                              <Form.Label>Correu Electrònic</Form.Label>
                              <Form.Control 
                                  type="text" 
                                  name="email" 
                                  placeholder="Introdueix el correu electrònic" 
                                  value={this.state.email} 
                                  onChange={(e) => this.handleChange(e)}
                                  required
                                  >
                                </Form.Control>  
                              <div className="text-danger">{this.state.errors.email}</div>   
                              <Form.Label>Contrasenya</Form.Label>
                              <Form.Control 
                                  type="password" 
                                  name="password" 
                                  placeholder="Introdueix la contrasenya" 
                                  value={this.state.password} 
                                  onChange={(e) => this.handleChange(e)}
                                  required
                                  >                          
                              </Form.Control>
                              <div className="text-danger">{this.state.errors.password}</div> 
                              <Form.Label>Repeteix la Contrasenya</Form.Label>
                              <Form.Control 
                                  type="password" 
                                  name="passwordR" 
                                  placeholder="Repeteix la contrasenya" 
                                  value={this.state.passwordR} 
                                  onChange={(e) => this.handleChange(e)}
                                  required
                                  >                          
                              </Form.Control>
                              <div className="text-danger">{this.state.errors.passwordR}</div> 
                          </Form>
                        </Card.Body>
                        <Card.Footer>
                              <Button block variant="outline-primary" onClick={()=>{this.handleSubmit(this.refs.registerForm)}}>Finalitza Registre</Button>
                          </Card.Footer>
                      </Card>
                  </Col>
              </Row>
          </Container> 
        );
    }
}

export default withRouter(RegisterPage);