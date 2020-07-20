import * as React from "react";
import "./testimonial.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css";
import testimg1 from "../../assets/temitope.jpg";
import avatar from '../../assets/avatar.svg'
import tony from '../../assets/testimonial-tony.jpeg'


const Testimonial = () => {
  return (
    <>
      <Row className="thirdrowtest">
        <Col md={12} className="thirdrow4a">
          <div>
            <div className="home5">Testimonials</div>
            <div className="greenground2"></div>
          </div>
          <div className="home6a">What our customers are saying</div>
          <div className="displayflex">
            <div className="customers">
              <div className="custext">
                <div className="dmrel">
                  <div className="dummybg">"</div>
                </div>
                The platform is ok and It is great to know that people like
                Pramopro still keep their promises in this modern day.
              </div>
              <div className="testimonialuser">
                <img src={tony} alt="" className="testimage" />
                <div className="testname">Tony Odutola</div>
              </div>
            </div>
            <div className="customers">
              <div className="custext">
                <div className="dmrel">
                  <div className="dummybg">"</div>
                </div>
                Pramopro is trustworthy and reliable. I am very happy I got my
                payback and I have also recommended Pramopro to my friends, I
                would keep trading with Pramopro.
              </div>
              <div className="testimonialuser">
                <img src={testimg1} alt="" className="testimage" />
                <div className="testname">Temitope Salami</div>
              </div>
            </div>
            <div className="customers">
              <div className="custext">
                <div className="dmrel">
                  <div className="dummybg">"</div>
                </div>
                The App is very good and i enjoyed using the platform. I believe
                the website is safe and has good security measures to protect
                against hacking.
              </div>
              <div className="testimonialuser">
                <img src={avatar} alt="" className="testimage" />
                <div className="testname">Patrick Ndupu</div>
              </div>
            </div>
          </div>
          {/* second row testimonial */}
          <div className="displayflex">
            <div className="customers">
              <div className="custext">
                <div className="dmrel">
                  <div className="dummybg">"</div>
                </div>
                Thank you very much, I recieved message alert with my bank
                account credited after investment duration, I appreciate your
                company for keeping up with the promise.
              </div>
              <div className="testimonialuser">
                <img src={avatar} alt="" className="testimage" />
                <div className="testname">Taiwo Adekunle Adedokun</div>
              </div>
            </div>
            <div className="customers">
              <div className="custext">
                <div className="dmrel">
                  <div className="dummybg">"</div>
                </div>
                I enjoyed using the platform except for the tax deductions.
              </div>
              <div className="testimonialuser">
                <img src={avatar} alt="" className="testimage" />
                <div className="testname">Anonymous Banker</div>
              </div>
            </div>
            <div className="customers">
              <div className="custext">
                <div className="dmrel">
                  <div className="dummybg">"</div>
                </div>
                I had a great experience and i also enjoyed using the platform.
                In addition the payback was right on time and as at when due.
              </div>
              <div className="testimonialuser">
                <img src={avatar} alt="" className="testimage" />
                <div className="testname">Toyin</div>
              </div>
            </div>
            <div className="customers">
              <div className="custext">
                <div className="dmrel">
                  <div className="dummybg">"</div>
                </div>
                I was payed and I appreciate the fact that there is a contact
                person to talk to. I would keep trading with Pramopro to ensure
                there is always energy commodities in the country.
              </div>
              <div className="testimonialuser">
                <img src={avatar} alt="" className="testimage" />
                <div className="testname">Saheed</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Testimonial;
