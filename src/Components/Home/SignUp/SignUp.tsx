import * as React from 'react';
import Navbar from '../HomeComponents/navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Footer from '../HomeComponents/footer';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import './signup.css';
import SignupImage from '../../../assets/1.png';
import fb from '../../../assets/fbsignup.png';
import google from '../../../assets/google.png';
import linkedin from '../../../assets/linked.png';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { API } from '../../../config';

interface State {
  firstname:string,
  lastname:string,
  email:string,
  password:string,
  confirmPassword:string,
  whereDidYouLearnAboutUs:string,
  errorMessage:string,
  successMsg:boolean
}
const SignUp:React.FunctionComponent = () => {
  const [state,setFormState] = React.useState<State>({firstname:'',lastname:'',email:'',password:'',confirmPassword:'',whereDidYouLearnAboutUs:"",errorMessage:"",successMsg:false})
  const {firstname,lastname,email,password,confirmPassword,whereDidYouLearnAboutUs,errorMessage,successMsg} = state
  const sendFormData=(e)=>{
    e.preventDefault()
    const data = { 
      first_name:firstname,
      last_name:lastname,
      email,
      info:whereDidYouLearnAboutUs,
      password,
      password2:confirmPassword,
    }
    console.log(data)
    axios.post<any, AxiosResponse<any>>(`${API}/accounts/signup/`,data)
    .then(response=>{
      console.log(response)
      setFormState({
        ...state,
        successMsg:true
      })
    })
    .catch(error=>{
      console.log(error.response)
      setFormState({
        ...state,
        errorMessage:"Signup failed"
      })
    })
  }
  // const validateAll=()=>{

  // }
 const changeActionOnFormData =(e:any)=>{
     setFormState({...state,
      [e.target.name]:e.target.value,
      errorMessage:'',
      successMsg:false
    })
  }
return (
        <>
           <Navbar/>
              <Container fluid={true}>
                <Row className="kli">
                  <Col md={5} className="mo">
                    <img src={SignupImage} className="signupimg img-fluid" alt="SignupImage" />
                  </Col>
                  <Col md={5}>
                    <div className="signwa">Sign up</div>
                    <div className="signwa1">To Get Clarity</div>
                  {
                    successMsg &&
                    <Alert key={1} variant="success">
                       SignUp Successful
                    </Alert>
                  }
                  {
                    errorMessage &&
                    <Alert key={2} variant="danger">
                      {errorMessage}
                    </Alert>
                  }
                  <Form onSubmit={sendFormData}>
                    <Row>
                      <Col>
                        <Form.Group controlId="formBasicCheckbox">
                          <Form.Control 
                            className="field1" 
                            value={firstname}
                            onChange={changeActionOnFormData}
                            name="firstname"
                            placeholder="First Name" 
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="formBasicCheckbox">
                          <Form.Control 
                          className="field1"
                          name="lastname"
                          value={lastname}
                          onChange={changeActionOnFormData}
                          placeholder="Last Name"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        className="field1" 
                        value={email} 
                        name = "email"
                        onChange={changeActionOnFormData}
                        placeholder="Email Address" 
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Control 
                        type="password"
                        className="field1" 
                        value={password}
                        name="password"
                        onChange={changeActionOnFormData}
                        placeholder="Password"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Control 
                        type="password"
                        className="field1" 
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={changeActionOnFormData}
                        placeholder="Confirm Password" 
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail1">
                      <Form.Control 
                        className="field1" 
                        onChange={changeActionOnFormData}
                        value={whereDidYouLearnAboutUs} 
                        name="whereDidYouLearnAboutUs"
                        placeholder="Where did you hear about us?"
                      />
                    </Form.Group>
                      <Button variant="primary" className="subbtn" type="submit">
                       Sign Up
                      </Button>
                      <div className="alreadyhave">Already have an account?<Link to="/signin"><span className="logn"> Login</span></Link></div>
                      <h6 className="text-divider">
                        <span className="divider-text">or connect using</span>
                        <div className="centeredline"></div>
                      </h6>
                      <div className="socialwrapper">
                        <div className="socialIcons1"><img src={fb} alt="fb"/></div>
                        <div className="socialIcons2"><img src={google} alt="fb"/></div>
                        <div className="socialIcons3"><img src={linkedin} alt="fb"/></div>
                      </div>
                  </Form>
                </Col>
              </Row>
            <Footer/>
          </Container>
        </>
    );
  };

export default SignUp;