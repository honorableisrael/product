import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../SubComponents/Navbar";
import "./PrivacyPolicy.css";
import GetMobileApp from "../Home/GetMobileApp";
import Footer from "../Home/Footer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";

interface IAppProps {}

const PrivacyPolicy: React.FunctionComponent<IAppProps> = (props: any) => {
  React.useEffect(() => {
    window.scrollTo(-0, -0);
  }, []);
  const [state, setFormState] = React.useState({
    errorMessage: "",
    fullname: "",
    message: "",
    howcanwehelpyou: "",
    email: "",
    phone: "",
    password: "",
    isloading: false,
  });
  const {
    phone,
    email,
    errorMessage,
    isloading,
    fullname,
    message,
    howcanwehelpyou,
  } = state;
  const onchange = (e) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="jcenter graybg">
          <Col md={10} className="nopaddin">
            <div className="policyh text-center">Privacy Policy</div>
          </Col>
        </Row>
        <Row className="jcenter">
          <Col md={10} className="nopaddin1">
            <Row className="wrapper123">
              <Col md={4} className="leftwrapper">
                <div className="firsttext">ON THIS PAGE</div>
                <div className="firsttext1">Privacy Policy</div>
                <div className="firsttext1">
                  Personal identification information
                </div>
                <div className="firsttext1">
                  Non-personal identification information
                </div>
                <div className="firsttext1">Web browser cookies</div>
                <div className="firsttext1">
                  How Information Collected is Used
                </div>
                <div className="firsttext1">
                  How Pramopro Protects Your Information
                </div>
                <div className="firsttext1">Electronic Newsletters</div>
                <div className="firsttext1">Disclosures Required by Law</div>
                <div className="firsttext1">Third party websites</div>
                <div className="firsttext1">Problem Signing In</div>
                <div className="firsttext1">Contacting us</div>
                <div className="firsttext1">Your Acceptance of These Terms</div>
              </Col>
              <Col md={8}>
                <div className="sectext">Privacy Policy </div>
                <div className="seccontent">
                  The Privacy Policy governs the manner in which Pramopro
                  collects, uses, maintains and discloses information collected
                  from users (each, a “User”) on the domain
                  https://www.pramopro.com website (“Site”). This privacy policy
                  applies to the Site and all products and services offered by
                  Pramopro.
                </div>
                <div className="sectext">
                  Personal identification information{" "}
                </div>
                <div className="seccontent">
                  We may collect personal identification information from Users
                  in a variety of ways, including, but not limited to, when
                  Users visit our site, register on the site, place an order,
                  fill out a form, and in connection with other activities,
                  services, features or resources we make available on our Site.
                  As deemed appropriate, Users may be asked for; name, email
                  address, mailing address, phone number, account number. Users
                  may, however, visit our Site anonymously. We will collect
                  personal identification information from Users only if they
                  voluntarily submit such information to us. Users can always
                  refuse to supply personally identification information, except
                  that it may prevent them from engaging in certain Site related
                  activities.
                </div>
                <div className="sectext">
                  Non-personal identification information{" "}
                </div>
                <div className="seccontent">
                  We may collect non-personal identification information about
                  Users whenever they interact with our Site. Non-personal
                  identification information may include the browser name, the
                  type of computer and technical information about the Users
                  means of connection to our Site, such as the operating system
                  and other similar information.
                </div>
                <div className="sectext">Web browser cookies</div>
                <div className="seccontent">
                  Our Site may use “cookies” to enhance User experience. User’s
                  web browser places cookies on their hard drive for
                  record-keeping purposes and sometimes to track information
                  about them. User may choose to set their web browser to refuse
                  cookies, or to alert you when cookies are being sent. If they
                  do so, note that some parts of he Site may not function
                  properly.
                </div>
                <div className="sectext">Web browser cookies</div>
                <div className="seccontent">
                  Our Site may use “cookies” to enhance User experience. User’s
                  web browser places cookies on their hard drive for
                  record-keeping purposes and sometimes to track information
                  about them. User may choose to set their web browser to refuse
                  cookies, or to alert you when cookies are being sent. If they
                  do so, note that some parts of he Site may not function
                  properly.
                </div>
                <div className="sectext">
                  How Information Collected is Used{" "}
                </div>
                <div className="speccontent">
                  Pramopro may collect and use Users personal information for
                  the following purposes:
                </div>
                <ul className="lists1">
                  <li>
                    To run and operate our Site. We may need your information to
                    display content on the Site correctly.
                  </li>
                  <li>
                    To improve customer service. Information you provide helps
                    us respond to your customer service requests and support
                    needs more efficiently.
                  </li>
                  <li>
                    To improve customer service. We may use the information
                    Users provide about themselves when placing an order only to
                    provide service to that order. We do not share this
                    information with outside parties except to the extent
                    necessary to provide the service.
                  </li>
                  <li>
                    To improve customer service. We may use the information
                    Users provide about themselves when placing an order only to
                    provide service to that order. We do not share this
                    information with outside parties except to the extent
                    necessary to provide the service.
                  </li>
                  <li>
                    To send periodic emails. We may use the email address to
                    send User information and updates pertaining to their order.
                    It may also be used to respond to their inquiries,
                    questions, and/or other requests.
                  </li>
                </ul>
                <div className="sectext">
                  How Pramopro Protects Your Information{" "}
                </div>
                <div className="seccontent">
                  We adopt appropriate data collection, storage and processing
                  practices and security measures to protect against
                  unauthorized access, alteration, disclosure or destruction of
                  your personal information, username, password, transaction
                  information and data stored on our Site.
                </div>
                <div className="sectext">Electronic Newsletters </div>
                <div className="seccontent">
                  If Users decide to opt-in to our mailing list, they will
                  receive emails that may include company news, updates, related
                  product or service information, etc. By using any of our
                  services or products, you are also automatically signed up on
                  our mailing list. We may use third party service providers to
                  help us operate our business and the Site or administer
                  activities on our behalf, such as sending out newsletters or
                  surveys. We may share your information with these third
                  parties for those limited purposes provided that you have
                  given us your permission.
                </div>
                <div className="sectext">Disclosures Required by Law </div>
                <div className="seccontent">
                  We may disclose Personally Identifiable Information if
                  required to do so by law or in the good faith belief that such
                  action is necessary to (a) conform with the requirements of
                  the law or comply with legal process served on us, or (b) act
                  in urgent circumstances to protect the personal safety of
                  users of our Service or members of the public. To the extent
                  practicable and legally permitted, we will attempt to advise
                  you prior to any such disclosure, so that you may seek a
                  protective order or other relief limiting such disclosure.
                </div>
                <div className="sectext">Third party websites </div>
                <div className="seccontent">
                  Users may find advertising or other content on our Site that
                  link to the sites and services of our partners, suppliers,
                  advertisers, sponsors, licensors and other third parties. We
                  do not control the content or links that appear on these sites
                  and are not responsible for the practices employed by websites
                  linked to or from our Site. In addition, these sites or
                  services, including their content and links, may be constantly
                  changing. These sites and services may have their own privacy
                  policies and customer service policies. Browsing and
                  interaction on any other website, including websites which
                  have a link to our Site, is subject to that website’s own
                  terms and policies.
                </div>
                <div className="sectext">Problem Signing In </div>
                <div className="seccontent">
                  Our sign-in process is designed to help protect your privacy.
                  If you have trouble signing in to our Website, please ensure
                  that you are using your registered e-mail address and/or
                  correct password. If you are using your registered e-mail
                  address and correct password, and you continue to have trouble
                  signing in to our site, please e-mail us immediately at
                  crm@pramopro.com
                </div>
                <div className="sectext">Contacting us</div>
                <div className="seccontent">
                  If you have any questions about this Privacy Policy, the
                  practices of this site, or your dealings with this site,
                  please contact us.
                </div>
                <div className="sectext">Your Acceptance of These Terms</div>
                <div className="seccontent">
                  By using this Site, you signify your acceptance of this
                  policy. If you do not agree to this policy, please do not use
                  our Site. Your continued use of the Site following the posting
                  of changes to this policy will be deemed your acceptance of
                  those changes.
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <GetMobileApp />
        <Footer />
      </Container>
    </>
  );
};

export default PrivacyPolicy;
