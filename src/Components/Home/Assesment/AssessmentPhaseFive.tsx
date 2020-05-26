import * as React from "react";
import "../Home/Home.css";
import "./assessment.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../HomeComponents/footer";
import Navbar from "../HomeComponents/navbar";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { AssessmentFirstSection } from "./AssessmentComponents/AssessmentFirstSection";
import { Link } from "react-router-dom";
import "../Forms/recruitmentform.css";
import axios from "axios";
import { API } from "../../../config";
import { ToastContainer, toast } from "react-toastify";

// team
const AssessmentFifthPhase = (props: any) => {
  const [value, setValue] = React.useState<number>(0);
  const [state, setCheckboxValue]: any = React.useState({
    question1: "1",
    question2: "1",
    question3: "1",
    question4: "1",
    question5: "1",
    question6: "1",
    question7: "1",
    question8: "1",
    question9: "1",
    question10: "1",
    question11: "1",
    question12: "1",
    question13: "1",
    question14: "1",
    question15: "1",
    question16: "1",
    question17: "1",
    question18: "1",
    token: "",
  });
  const {
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
    question11,
    question12,
    question13,
    question14,
    question15,
    question16,
    question17,
    question18,
    token,
  } = state;

  //cdm
  React.useEffect((): any => {
    window.scrollTo(-0, -0);
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    setCheckboxValue({ ...state, token });
  }, []);

  //update form feild
  const onchange = (e: any) => {
    setCheckboxValue({
      ...state,
      [e.target.name]: e.target.value.toString(),
    });
  };

  //subform
  const submitForm = (e: any) => {
    e.preventDefault();
    const data = {
      q44: question1,
      q45: question2,
      q46: question3,
      q47: question4,
      q48: question5,
      q49: question6,
      q50: question7,
      q51: question8,
      q52: question9,
      q53: question10,
      q54: question11,
      q55: question12,
      q56: question13,
      q57: question14,
      q58: question15,
      q59: question16,
      q60: question17,
      q61: question18,
    };
    console.log(data);
    axios
      .post(`${API}/careermotivator`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        console.log(response);
        handleSuccess(response);
      })
      .catch((error) => {
        console.log(error.response);
        handleErrors(error);
      });
  };
  const handleSuccess = (response: any) => {
    if (response.status === 200) {
      props.history.push("/assessmentphasefivecomplete");
    }
  };
  const handleErrors = (error: any) => {
    if (error && error.response && error.response.data) {
      notify(error.response.data[0].message);
    }
    if (error && error.response == undefined) {
      notify("Failed to process! try again later");
    }
  };
  const notify = (message: string) => toast(message, { containerId: "B" });
  return (
    <div>
      <Navbar />
      <Container fluid={true}>
        <Row className="firstrowcf cftcontent">
          <AssessmentFirstSection
            progressBar={60}
            phase="Phase 5"
            nextPhase="Phase 6"
            time={13}
          />
          <Col md={11}>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  a. You would rather have someone else make all the strategic
                  decisions and tell you what to do
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={0}
                      name="question1"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question1"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question1"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question1"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question1"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question1"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={6}
                      onChange={onchange}
                      name="question1"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  b. You’ve realized over time that you achieve more results
                  when accountable to someone than alone
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={0}
                      name="question2"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question2"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question2"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question2"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question2"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question2"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={6}
                      onChange={onchange}
                      name="question2"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  c. To you being part of a team is more important than working
                  alone
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question3"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question3"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question3"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question3"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question3"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question3"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question3"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  d. A work environment with cooperative colleagues can keep you
                  at a terrible job longer
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question4"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question4"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question4"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question4"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question4"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question4"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question4"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  e. You would take a job with lower pay if it gave you the
                  opportunity to fulfill purpose, because life is more than a
                  pay check.
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question5"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question5"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question5"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question5"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question5"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question5"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question5"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  f. You always seek opportunities to meet needs in your
                  society, because if one of us can make it all of us can make
                  it.
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question6"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question6"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question6"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question6"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question6"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question6"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question6"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  g. To be honest you are energized when have you real control
                  over people and resources other than that working is a waste
                  of time.
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question7"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question7"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question7"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question7"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question7"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question7"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question7"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  h. You find yourself pushing your point of views subtly or
                  forcefully till the person accepts it.
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question8"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question8"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question8"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question8"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question8"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question8"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question8"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  i. Pursuing a vision or ambition on an empty bank account is
                  too risky, a steady job is better for you
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question9"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question9"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question9"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question9"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question9"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question9"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question9"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  j. You would choose a job with secure working conditions and
                  income than a growing a business with little initial income
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question10"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question10"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question10"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question10"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question10"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question10"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question10"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  k. Respect and prestige isn’t very important to you in life
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={1}
                      name="question11"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={2}
                      onChange={onchange}
                      name="question11"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={3}
                      name="question11"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={4}
                      onChange={onchange}
                      name="question11"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={5}
                      name="question11"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={6}
                      onChange={onchange}
                      name="question11"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={7}
                      onChange={onchange}
                      name="question11"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  l. You shy away from public recognition
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={1}
                      name="question12"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={2}
                      onChange={onchange}
                      name="question12"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={3}
                      name="question12"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={4}
                      onChange={onchange}
                      name="question12"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={5}
                      name="question12"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={6}
                      onChange={onchange}
                      name="question12"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={7}
                      onChange={onchange}
                      name="question12"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  m. If your employer recognizes the value of your work you will
                  stand by them
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question13"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question13"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question13"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question13"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question13"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question13"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question13"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  n. Positive feedback energizes you
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question14"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question14"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question14"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question14"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question14"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question14"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question14"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  o. You are keen on being referred to as a thought leader in
                  your career
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question15"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question15"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question15"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question15"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question15"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question15"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question15"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  p. Being a master of one trade is better being master of many
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question16"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question16"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question16"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question16"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question16"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question16"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question16"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  q. In making money, if you have just enough to meet your
                  essential needs you are just satisfied
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={0}
                      name="question17"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question17"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question17"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question17"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question17"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question17"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={6}
                      onChange={onchange}
                      name="question17"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  r. Success on a project for you isn’t necessarily tied to how
                  much financial return you make
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={0}
                      name="question18"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question18"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question18"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question18"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question18"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question18"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={6}
                      onChange={onchange}
                      name="question18"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <ToastContainer
              enableMultiContainer
              containerId={"B"}
              toastClassName="bg-danger text-white"
              hideProgressBar={true}
              position={toast.POSITION.TOP_CENTER}
            />
            <div className="nxtbtnarea">
              <button className="nxtbtn" onClick={submitForm}>
                Next
              </button>
            </div>
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
};
export default AssessmentFifthPhase;
