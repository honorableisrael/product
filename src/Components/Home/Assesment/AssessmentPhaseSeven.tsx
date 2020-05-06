import * as React from 'react';
import '../Home/Home.css';
import './assessment.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../HomeComponents/footer';
import Navbar from '../HomeComponents/navbar';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { AssessmentFirstSection } from './AssessmentComponents/AssessmentFirstSection';
import { Link } from 'react-router-dom';
import '../Forms/recruitmentform.css';
import axios from 'axios';
import { API } from '../../../config';
import { ToastContainer, toast } from 'react-toastify';
 




// team
interface State {
    question1:string,
    question2:string,
    question3:string,
    question4:string,
    question5:string,
    question6:string,
    question7:string,
    question8:string,
    question9:string,
    question10:string,
    question11:string,
    question12:string,
    question13:string,
    question14:string,
    question15:string,
    question16:string,
    token:string
}

 const AssessmentSeventhPhase =(props:any)=> {
    const [ value, setValue ] = React.useState<number>(0);
    const [ state,setCheckboxValue ]:any = React.useState<State>({question1:'1',question2:'1',question3:'1',question4:'1',question5:'1',question6:'1',question7:'1',question8:'1',question9:'1',question10:'1',question11:'1',question12:'1',question13:'1',question14:'1',question15:'1',question16:'1',token:''});
    const {question1,question2,question3,question4,question5,question6,question7,question8,question9,question10,question11,question12,question13,question14,question15,question16,token} = state

   //cdm
    React.useEffect(():any=>{
        window.scrollTo(-0,-0)
        const availableToken = sessionStorage.getItem('userToken')
        const token = availableToken?JSON.parse(availableToken):props.history.push('/signin')
        setCheckboxValue({...state,token})
    },[])

    //update form feild
    const onchange = (e:any)=>{
        setCheckboxValue({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    
    //subform
    const submitForm =(e:any)=>{
        e.preventDefault()
        const data = {
            q70:question1,
            q71:question2,
            q72:question3,
            q73:question4,
            q74:question5,
            q75:question6,
            q76:question7,
            q77:question8,
            q78:question9,
            q79:question10,
            q80:question11,
            q81:question12,
            q82:question13,
            q83:question14,
            q84:question15,
            q85:question16,
        }
        console.log(data)
        axios.post(`${API}/workfunction`,data, { headers: { 'Authorization': `Token ${token}` } })
        .then( response => {
            console.log(response)
            if( response.status=== 200 ){
                props.history.push('/dashboardresult')
            }
        })
        .catch(error=>{
            console.log(error.response)
            if(error && error.response && error.response.data)
            notify(error.response.data[0].message)
        })
    }

    const notify = (message:string) => toast(message,{containerId: 'B'});
    return (
    <div>
        <Navbar/>
        <Container fluid={true}>
            <Row className="firstrowcf cftcontent">
               <AssessmentFirstSection progressBar={90} phase="Phase 7" nextPhase="Finish" time={13}/>
               <Col md={11}>
                <Row className="firstrowcf2 cftcontent">
                    <Col md={12}>
                        <div className="firstquestion">
                        1. I find it easy leading project team or managing businesses 
                        </div>
                        <div className="rsliderclassPol1">
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={0} name="question1" />
                                <span className="checkmark1" >A</span>
                                I strongly agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={1} onChange={onchange} name="question1" />
                                <span className="checkmark1">B</span>
                                I agree
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={2} name="question1" />
                                <span className="checkmark1" >C</span>
                                I somewhat agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={3} onChange={onchange} name="question1" />
                                <span className="checkmark1">D</span>
                                I am undecided
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={4} name="question1" />
                                <span className="checkmark1" >E</span>
                                I don't really agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={5} onChange={onchange} name="question1" />
                                <span className="checkmark1">F</span>
                                I disagree
                            </label> 
                            <label className="checkcontainer1">
                                <input type="radio" value={6} onChange={onchange} name="question1" />
                                <span className="checkmark1">G</span>
                                I strongly disagree
                            </label>    
                         </div>
                    </Col>
                </Row>
                <Row className="firstrowcf2 cftcontent">
                    <Col md={12}>
                        <div className="firstquestion">
                        2. I very much want to be involved in all aspects of a business
                        </div>
                        <div className="rsliderclassPol1">
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={0} name="question2" />
                                <span className="checkmark1" >A</span>
                                I strongly agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={1} onChange={onchange} name="question2" />
                                <span className="checkmark1">B</span>
                                I agree
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={2} name="question2" />
                                <span className="checkmark1" >C</span>
                                I somewhat agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={3} onChange={onchange} name="question2" />
                                <span className="checkmark1">D</span>
                                I am undecided
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={4} name="question2" />
                                <span className="checkmark1" >E</span>
                                I don't really agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={5} onChange={onchange} name="question2" />
                                <span className="checkmark1">F</span>
                                I disagree
                            </label> 
                            <label className="checkcontainer1">
                                <input type="radio" value={6} onChange={onchange} name="question2" />
                                <span className="checkmark1">G</span>
                                I strongly disagree
                            </label>    
                         </div>
                      </Col>
                </Row>
                <Row className="firstrowcf2 cftcontent">
                    <Col md={12}>
                        <div className="firstquestion">
                        3. It’s not easy for me to get people’s buy in on an idea/ concept 
                        </div>
                        <div className="rsliderclassPol1">
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={0} name="question3" />
                                <span className="checkmark1" >A</span>
                                I strongly agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={1} onChange={onchange} name="question3" />
                                <span className="checkmark1">B</span>
                               I agree
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={2} name="question3" />
                                <span className="checkmark1" >C</span>
                                I somewhat agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={3} onChange={onchange} name="question3" />
                                <span className="checkmark1">D</span>
                                I am undecided
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={4} name="question3" />
                                <span className="checkmark1" >E</span>
                                I don't really agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={5} onChange={onchange} name="question3" />
                                <span className="checkmark1">F</span>
                                I disagree
                            </label> 
                            <label className="checkcontainer1">
                                <input type="radio" value={6} onChange={onchange} name="question3" />
                                <span className="checkmark1">G</span>
                                I strongly disagree
                            </label>    
                         </div>
                    </Col>
                </Row>
                <Row className="firstrowcf2 cftcontent">
                    <Col md={12}>
                        <div className="firstquestion">
                        4. I wouldn’t really do everything in my power in getting someone to see my point of view 
                        </div>
                        <div className="rsliderclassPol1">
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={0} name="question4" />
                                <span className="checkmark1" >A</span>
                                I strongly agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={1} onChange={onchange} name="question4" />
                                <span className="checkmark1">B</span>
                                I agree
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={2} name="question4" />
                                <span className="checkmark1" >C</span>
                                I somewhat agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={3} onChange={onchange} name="question4" />
                                <span className="checkmark1">D</span>
                               I am undecided
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={4} name="question4" />
                                <span className="checkmark1" >E</span>
                                I dont really agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={5} onChange={onchange} name="question4" />
                                <span className="checkmark1">F</span>
                                I disagree
                            </label> 
                            <label className="checkcontainer1">
                                <input type="radio" value={6} onChange={onchange} name="question4" />
                                <span className="checkmark1">G</span>
                                I strongly disagree
                            </label>    
                         </div>
                    </Col>
                </Row>
                <Row className="firstrowcf2 cftcontent">
                    <Col md={12}>
                        <div className="firstquestion">
                        5. Working on different projects from time to time gives me zest instead of routine
                        </div>
                        <div className="rsliderclassPol1">
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={0} name="question5" />
                                <span className="checkmark1" >A</span>
                                I strongly agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={1} onChange={onchange} name="question5" />
                                <span className="checkmark1">B</span>
                                I agree
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={2} name="question5" />
                                <span className="checkmark1" >C</span>
                                I somewhat agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={3} onChange={onchange} name="question5" />
                                <span className="checkmark1">D</span>
                               I am undecided
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={4} name="question5" />
                                <span className="checkmark1" >E</span>
                                I dont really agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={5} onChange={onchange} name="question5" />
                                <span className="checkmark1">F</span>
                                I disagree
                            </label> 
                            <label className="checkcontainer1">
                                <input type="radio" value={6} onChange={onchange} name="question5" />
                                <span className="checkmark1">G</span>
                                I strongly disagree
                            </label>    
                         </div>
                    </Col>
                </Row>
                <Row className="firstrowcf2 cftcontent">
                    <Col md={12}>
                        <div className="firstquestion">
                        6. I love a job that gives me the opportunity to disrupt things
                        </div>
                        <div className="rsliderclassPol1">
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={0} name="question6" />
                                <span className="checkmark1" >A</span>
                                I strongly agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={1} onChange={onchange} name="question6" />
                                <span className="checkmark1">B</span>
                                I agree
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={2} name="question6" />
                                <span className="checkmark1" >C</span>
                                I somewhat agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={3} onChange={onchange} name="question6" />
                                <span className="checkmark1">D</span>
                               I am undecided
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={4} name="question6" />
                                <span className="checkmark1" >E</span>
                                I dont really agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={5} onChange={onchange} name="question6" />
                                <span className="checkmark1">F</span>
                                I disagree
                            </label> 
                            <label className="checkcontainer1">
                                <input type="radio" value={6} onChange={onchange} name="question6" />
                                <span className="checkmark1">G</span>
                                I strongly disagree
                            </label>    
                         </div>
                    </Col>
                </Row>
                <Row className="firstrowcf2 cftcontent">
                    <Col md={12}>
                        <div className="firstquestion">
                        7. Work would suck if I’m to manage a day to day routine
                        </div>
                        <div className="rsliderclassPol1">
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={0} name="question7" />
                                <span className="checkmark1" >A</span>
                                I strongly agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={1} onChange={onchange} name="question7" />
                                <span className="checkmark1">B</span>
                                I agree
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={2} name="question7" />
                                <span className="checkmark1" >C</span>
                                I somewhat agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={3} onChange={onchange} name="question7" />
                                <span className="checkmark1">D</span>
                               I am undecided
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={4} name="question7" />
                                <span className="checkmark1" >E</span>
                                I dont really agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={5} onChange={onchange} name="question7" />
                                <span className="checkmark1">F</span>
                                I disagree
                            </label> 
                            <label className="checkcontainer1">
                                <input type="radio" value={6} onChange={onchange} name="question7" />
                                <span className="checkmark1">G</span>
                                I strongly disagree
                            </label>    
                         </div>
                    </Col>
                </Row>
                <Row className="firstrowcf2 cftcontent">
                    <Col md={12}>
                        <div className="firstquestion">
                        8. Managing teams can be such headaches I’ll rather not be at the centre
                        </div>
                        <div className="rsliderclassPol1">
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={0} name="question8" />
                                <span className="checkmark1" >A</span>
                                I strongly agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={1} onChange={onchange} name="question8" />
                                <span className="checkmark1">B</span>
                                I agree
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={2} name="question8" />
                                <span className="checkmark1" >C</span>
                                I somewhat agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={3} onChange={onchange} name="question8" />
                                <span className="checkmark1">D</span>
                               I am undecided
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={4} name="question8" />
                                <span className="checkmark1" >E</span>
                                I dont really agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={5} onChange={onchange} name="question8" />
                                <span className="checkmark1">F</span>
                                I disagree
                            </label> 
                            <label className="checkcontainer1">
                                <input type="radio" value={6} onChange={onchange} name="question8" />
                                <span className="checkmark1">G</span>
                                I strongly disagree
                            </label>    
                         </div>
                    </Col>
                </Row>
                <Row className="firstrowcf2 cftcontent">
                    <Col md={12}>
                        <div className="firstquestion">
                        9. Promoting a collaborative culture in the workplace is more of what you’re about.
                        </div>
                        <div className="rsliderclassPol1">
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={0} name="question9" />
                                <span className="checkmark1" >A</span>
                                I strongly agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={1} onChange={onchange} name="question9" />
                                <span className="checkmark1">B</span>
                                I agree
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={2} name="question9" />
                                <span className="checkmark1" >C</span>
                                I somewhat agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={3} onChange={onchange} name="question9" />
                                <span className="checkmark1">D</span>
                               I am undecided
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={4} name="question9" />
                                <span className="checkmark1" >E</span>
                                I dont really agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={5} onChange={onchange} name="question9" />
                                <span className="checkmark1">F</span>
                                I disagree
                            </label> 
                            <label className="checkcontainer1">
                                <input type="radio" value={6} onChange={onchange} name="question9" />
                                <span className="checkmark1">G</span>
                                I strongly disagree
                            </label>    
                         </div>
                    </Col>
                </Row>
                <Row className="firstrowcf2 cftcontent">
                    <Col md={12}>
                        <div className="firstquestion">
                        10. Developing colleagues and employees potential increasing work productivity
                        </div>
                        <div className="rsliderclassPol1">
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={0} name="question10" />
                                <span className="checkmark1" >A</span>
                                I strongly agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={1} onChange={onchange} name="question10" />
                                <span className="checkmark1">B</span>
                                I agree
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={2} name="question10" />
                                <span className="checkmark1" >C</span>
                                I somewhat agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={3} onChange={onchange} name="question10" />
                                <span className="checkmark1">D</span>
                               I am undecided
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={4} name="question10" />
                                <span className="checkmark1" >E</span>
                                I dont really agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={5} onChange={onchange} name="question10" />
                                <span className="checkmark1">F</span>
                                I disagree
                            </label> 
                            <label className="checkcontainer1">
                                <input type="radio" value={6} onChange={onchange} name="question10" />
                                <span className="checkmark1">G</span>
                                I strongly disagree
                            </label>    
                         </div>
                    </Col>
                </Row>
                <Row className="firstrowcf2 cftcontent">
                    <Col md={12}>
                        <div className="firstquestion">
                        11. You prefer solving business issues by "running the numbers."
                        </div>
                        <div className="rsliderclassPol1">
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={0} name="question11" />
                                <span className="checkmark1" >A</span>
                                I strongly agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={1} onChange={onchange} name="question11" />
                                <span className="checkmark1">B</span>
                                I agree
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={2} name="question11" />
                                <span className="checkmark1" >C</span>
                                I somewhat agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={3} onChange={onchange} name="question11" />
                                <span className="checkmark1">D</span>
                               I am undecided
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={4} name="question11" />
                                <span className="checkmark1" >E</span>
                                I dont really agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={5} onChange={onchange} name="question11" />
                                <span className="checkmark1">F</span>
                                I disagree
                            </label> 
                            <label className="checkcontainer1">
                                <input type="radio" value={6} onChange={onchange} name="question11" />
                                <span className="checkmark1">G</span>
                                I strongly disagree
                            </label>    
                         </div>
                    </Col>
                </Row>
                <Row className="firstrowcf2 cftcontent">
                    <Col md={12}>
                        <div className="firstquestion">
                        12. You work best understanding the trajectory of an organization based financial analysis
                        </div>
                        <div className="rsliderclassPol1">
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={0} name="question12" />
                                <span className="checkmark1" >A</span>
                                I strongly agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={1} onChange={onchange} name="question12" />
                                <span className="checkmark1">B</span>
                                I agree
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={2} name="question12" />
                                <span className="checkmark1" >C</span>
                                I somewhat agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={3} onChange={onchange} name="question12" />
                                <span className="checkmark1">D</span>
                               I am undecided
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={4} name="question12" />
                                <span className="checkmark1" >E</span>
                                I dont really agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={5} onChange={onchange} name="question12" />
                                <span className="checkmark1">F</span>
                                I disagree
                            </label> 
                            <label className="checkcontainer1">
                                <input type="radio" value={6} onChange={onchange} name="question12" />
                                <span className="checkmark1">G</span>
                                I strongly disagree
                            </label>    
                         </div>
                    </Col>
                </Row>
                <Row className="firstrowcf2 cftcontent">
                    <Col md={12}>
                        <div className="firstquestion">
                        13. You prefer to be involved in research and strategic thinking in an organization
                        </div>
                        <div className="rsliderclassPol1">
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={0} name="question13" />
                                <span className="checkmark1" >A</span>
                                I strongly agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={1} onChange={onchange} name="question13" />
                                <span className="checkmark1">B</span>
                                I agree
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={2} name="question13" />
                                <span className="checkmark1" >C</span>
                                I somewhat agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={3} onChange={onchange} name="question13" />
                                <span className="checkmark1">D</span>
                               I am undecided
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={4} name="question13" />
                                <span className="checkmark1" >E</span>
                                I dont really agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={5} onChange={onchange} name="question13" />
                                <span className="checkmark1">F</span>
                                I disagree
                            </label> 
                            <label className="checkcontainer1">
                                <input type="radio" value={6} onChange={onchange} name="question13" />
                                <span className="checkmark1">G</span>
                                I strongly disagree
                            </label>    
                         </div>
                    </Col>
                </Row>
                <Row className="firstrowcf2 cftcontent">
                    <Col md={12}>
                        <div className="firstquestion">
                        14. You are fascinated by studying industry trends and making projections
                        </div>
                        <div className="rsliderclassPol1">
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={0} name="question14" />
                                <span className="checkmark1" >A</span>
                                I strongly agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={1} onChange={onchange} name="question14" />
                                <span className="checkmark1">B</span>
                                I agree
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={2} name="question14" />
                                <span className="checkmark1" >C</span>
                                I somewhat agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={3} onChange={onchange} name="question14" />
                                <span className="checkmark1">D</span>
                               I am undecided
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={4} name="question14" />
                                <span className="checkmark1" >E</span>
                                I dont really agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={5} onChange={onchange} name="question14" />
                                <span className="checkmark1">F</span>
                                I disagree
                            </label> 
                            <label className="checkcontainer1">
                                <input type="radio" value={6} onChange={onchange} name="question14" />
                                <span className="checkmark1">G</span>
                                I strongly disagree
                            </label>    
                         </div>
                    </Col>
                </Row>
                <Row className="firstrowcf2 cftcontent">
                    <Col md={12}>
                        <div className="firstquestion">
                        15. You enjoy ensuring customers’ needs are satisfied
                        </div>
                        <div className="rsliderclassPol1">
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={0} name="question15" />
                                <span className="checkmark1" >A</span>
                                I strongly agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={1} onChange={onchange} name="question15" />
                                <span className="checkmark1">B</span>
                                I agree
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={2} name="question15" />
                                <span className="checkmark1" >C</span>
                                I somewhat agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={3} onChange={onchange} name="question15" />
                                <span className="checkmark1">D</span>
                               I am undecided
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={4} name="question15" />
                                <span className="checkmark1" >E</span>
                                I dont really agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={5} onChange={onchange} name="question15" />
                                <span className="checkmark1">F</span>
                                I disagree
                            </label> 
                            <label className="checkcontainer1">
                                <input type="radio" value={6} onChange={onchange} name="question15" />
                                <span className="checkmark1">G</span>
                                I strongly disagree
                            </label>    
                         </div>
                    </Col>
                </Row>
                <Row className="firstrowcf2 cftcontent">
                    <Col md={12}>
                        <div className="firstquestion">
                        16. Providing information about products and services, take orders, respond to customer complaints,
                        and processing return never wears you out.
                        </div>
                        <div className="rsliderclassPol1">
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={0} name="question16" />
                                <span className="checkmark1" >A</span>
                                I strongly agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={1} onChange={onchange} name="question16" />
                                <span className="checkmark1">B</span>
                                I agree
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={2} name="question16" />
                                <span className="checkmark1" >C</span>
                                I somewhat agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={3} onChange={onchange} name="question16" />
                                <span className="checkmark1">D</span>
                               I am undecided
                            </label>
                            <label className="checkcontainer1">
                                <input type="radio" onChange={onchange} value={4} name="question16" />
                                <span className="checkmark1" >E</span>
                                I dont really agree
                            </label>  
                            <label className="checkcontainer1">
                                <input type="radio" value={5} onChange={onchange} name="question16" />
                                <span className="checkmark1">F</span>
                                I disagree
                            </label> 
                            <label className="checkcontainer1">
                                <input type="radio" value={6} onChange={onchange} name="question16" />
                                <span className="checkmark1">G</span>
                                I strongly disagree
                            </label>    
                         </div>
                    </Col>
                </Row>
                <Row className="firstrowcf2 cftcontent">    
                    <ToastContainer enableMultiContainer containerId={'B'} toastClassName="bg-danger text-white" hideProgressBar={true} position={toast.POSITION.TOP_CENTER} />
                    <div className="nxtbtnarea">
                        <button className="nxtbtn" onClick={submitForm}>
                            Next
                        </button>
                    </div>
                </Row>
               </Col>
            </Row>
        <Footer/>
        </Container>
    </div>
  )
}

export default AssessmentSeventhPhase;