import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../SubComponents/Navbar";
import "./FAQS.css";
import GetMobileApp from "../Home/GetMobileApp";
import Footer from "../Home/Footer";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";

interface IAppProps {}

const FAQs: React.FunctionComponent<IAppProps> = (props: any) => {
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
  const [openState, setState]: any = React.useState({
    firstIsOpen: false,
    secondIsOpen: false,
    o3: false,
    o4: false,
    o5: false,
    o6: false,
    o7: false,
    o8: false,
    o9: false,
    o10: false,
    o11: false,
    o12: false,
    o13: false,
    o14: false,
    o15: false,
    o16: false,
    o17: false,
    o18: false,
  });
  const {
    firstIsOpen,
    secondIsOpen,
    o3,
    o4,
    o5,
    o6,
    o7,
    o8,
    o9,
    o10,
    o11,
    o12,
    o13,
    o14,
    o15,
    o16,
    o17,
    o18,
  } = openState;
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
  useEffect(() => {
    window.scrollTo(-0, -0);
  }, []);
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="jcenter graybg">
          <Col md={10} className="nopaddin">
            <div className="policyh text-center">Questions? Look here.</div>
          </Col>
        </Row>
        <Row className="jcenter">
          <Col md={10} className="nopaddin1">
            <Row className="wrapper123">
              <Col md={4} className="leftwrapper">
                <div className="faqside"> Getting Started</div>
              </Col>
              <Col md={8}>
                <Accordion defaultActiveKey="">
                  <Card>
                    <Accordion.Toggle
                      onClick={() =>
                        setState({
                          firstIsOpen: firstIsOpen ? false : true,
                        })
                      }
                      as={Card.Header}
                      eventKey="0"
                    >
                      <div className="faq-side-header">
                        {" "}
                        <div>
                          <span className="sideplus">
                            {!firstIsOpen ? "+" : "-"}
                          </span>
                          Who owns Pramopro?
                        </div>
                        <i
                          className="fa fa-chevron-down"
                          style={{ fontSize: 10 }}
                        ></i>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <p className="faq-answers">
                          Pramopro Limited, owners of Pramopro (the Product) is
                          a legal entity registered with the Corporate Affairs
                          Commission of the Federal Republic of Nigeria with{" "}
                          <span className="specailtext">RC 1596426</span>
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  {/* second question */}
                  <Card>
                    <Accordion.Toggle
                      onClick={() =>
                        setState({
                          secondIsOpen: secondIsOpen ? false : true,
                        })
                      }
                      as={Card.Header}
                      eventKey="1"
                    >
                      <div className="faq-side-header">
                        {" "}
                        <div>
                          <span className="sideplus">
                            {!secondIsOpen ? "+" : "-"}
                          </span>
                          What is Pramopro?
                        </div>
                        <i
                          className="fa fa-chevron-down"
                          style={{ fontSize: 10 }}
                        ></i>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <div className="faq-answers">
                          Pramopro is Nigeria&#39;s premiere digital energy
                          commodity trading platform that enables every and
                          anyone trade energy commodities from the comfort of
                          home.
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  {/* third question */}
                  <Card>
                    <Accordion.Toggle
                      onClick={() =>
                        setState({
                          o3: o3 ? false : true,
                        })
                      }
                      as={Card.Header}
                      eventKey="3"
                    >
                      <div className="faq-side-header">
                        {" "}
                        <div>
                          <span className="sideplus"> {!o3 ? "+" : "-"}</span>
                          How Does Pramopro Work?
                        </div>
                        <i
                          className="fa fa-chevron-down"
                          style={{ fontSize: 10 }}
                        ></i>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                      <Card.Body>
                        <p className="faq-answers">
                          {" "}
                          Once you have created your personalised account on our
                          platform by registering on our service, you can view
                          full details of available Products. Once you have
                          chosen the product you want to purchase, you can use
                          the profit simulator to know exactly how much you will
                          make when you eventually complete the trade for the
                          specified period of time.{" "}
                        </p>
                        <p className="faq-answers">
                          {" "}
                          You can decide to make the purchase order for yourself
                          or someone else. In the event that you choose
                          “Others”, then you will need to provide details of the
                          person you want to purchase the products for. In the
                          event that the purchase if for you, just choose
                          “Self”, then click “Order”. Once you finally place
                          your order, you would need to make payment for the
                          order via your bank’s online/mobile platform to the
                          account details provided. While making payment, please
                          specify the 5 digit code provided, so we can easily
                          identify the transaction.{" "}
                        </p>
                        <p className="faq-answers">
                          {" "}
                          Once payment has been confirmed, your purchase will be
                          manually allocated and you will receive a purchase
                          allocation in your email box. Once the trading cycle
                          is complete, you will receive your purchase amount and
                          your profit.
                        </p>

                        <p className="faq-answers">
                          If you wish to roll over your trade, you can do so via
                          your personalised dashboard on our platform.
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  {/* fourth question */}
                  <Card>
                    <Accordion.Toggle
                      onClick={() =>
                        setState({
                          o4: o4 ? false : true,
                        })
                      }
                      as={Card.Header}
                      eventKey="4"
                    >
                      <div className="faq-side-header">
                        {" "}
                        <div>
                          <span className="sideplus">{!o4 ? "+" : "-"}</span>How
                          do I join Pramopro?
                        </div>
                        <i
                          className="fa fa-chevron-down"
                          style={{ fontSize: 10 }}
                        ></i>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="4">
                      <Card.Body>
                        <p className="faq-answers">
                          Joining Pramopro is as easy as clicking the
                          &quot;Register&quot; button on the top-right corner of
                          our website. You can choose to fill the form or sign
                          in with your existing Gmail account using Google&#39;s
                          secure authentication.
                        </p>
                        <div className="faq-answers">
                          If you choose to fill the form with your email address
                          as your username, you will receive a verification code
                          in your mailbox, which you will be required to provide
                          to authenticate your account.
                        </div>
                        <div className="faq-answers">
                          Once your account is authenticated, you will have
                          access to your personalised dashboard from which you
                          can fully access product features and purchase
                          available products.
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle
                      onClick={() =>
                        setState({
                          o5: o5 ? false : true,
                        })
                      }
                      as={Card.Header}
                      eventKey="5"
                    >
                      <div className="faq-side-header">
                        {" "}
                        <div>
                          <span className="sideplus">{!o4 ? "+" : "-"}</span>{" "}
                          How do I become an Energy Commodities Trader?
                        </div>
                        <i
                          className="fa fa-chevron-down"
                          style={{ fontSize: 10 }}
                        ></i>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="5">
                      <Card.Body>
                        <p className="faq-answers">
                          {" "}
                          Once you have created your personalised account on our
                          platform by registering on our service, you can view
                          full details of available Products. Once you have
                          chosen the product you want to purchase, you can use
                          the profit simulator to know exactly how much you will
                          make when you eventually complete the trade for the
                          specified period of time.
                        </p>
                        <p className="faq-answers">
                          {" "}
                          You can decide to make the purchase order for yourself
                          or someone else. In the event that you choose
                          “Others”, then you will need to provide details of the
                          person you want to purchase the products for.
                        </p>
                        <p className="faq-answers">
                          {" "}
                          In the event that the purchase if for you, just choose
                          “Self”, then click “Order”. Once you finally place
                          your order, you would need to make payment for the
                          order via your bank’s online/mobile platform to the
                          account details provided. While making payment, please
                          specify the 5 digit code provided, so we can easily
                          identify the transaction.
                        </p>
                        <p className="faq-answers">
                          {" "}
                          Once payment has been confirmed, your purchase will be
                          manually allocated and you will receive a purchase
                          allocation in your email box. Once the trading cycle
                          is complete, you will receive your purchase amount and
                          your profit.
                        </p>
                        <p className="faq-answers">
                          If you wish to roll over your trade, you can do so via
                          your personalised dashboard on our platform.
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle
                      onClick={() =>
                        setState({
                          o6: o6 ? false : true,
                        })
                      }
                      as={Card.Header}
                      eventKey="6"
                    >
                      <div className="faq-side-header">
                        {" "}
                        <div>
                          <span className="sideplus">{!o6 ? "+" : "-"}</span>
                          What does it mean for a product to be "Loading",
                          "Loaded" or "Finished"?
                        </div>
                        <i
                          className="fa fa-chevron-down"
                          style={{ fontSize: 10 }}
                        ></i>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="6">
                      <Card.Body>
                        <p className="faq-answers">
                          In the Oil and Gas parlance, a product is coming soon
                          once it is ‘Loading’.{" "}
                        </p>
                        <p className="faq-answers">
                          A product which is available for purchase is ‘Loaded’.{" "}
                        </p>
                        <p className="faq-answers">
                          Once all units of a product have been purchased, it is
                          no longer available for purchase and is ‘Finished’.{" "}
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Col>
            </Row>
          </Col>
          <Col md={10} className="nopaddin1">
            <Row className="wrapper123">
              <Col md={4} className="leftwrapper">
                <div className="faqside"> Our Products</div>
              </Col>
              <Col md={8}>
                <Accordion defaultActiveKey="">
                  <Card>
                    <Accordion.Toggle
                      onClick={() =>
                        setState({
                          o7: o7 ? false : true,
                        })
                      }
                      as={Card.Header}
                      eventKey="10"
                    >
                      <div className="faq-side-header">
                        {" "}
                        <div>
                          <span className="sideplus">{!o7 ? "+" : "-"}</span>How
                          do I pay for a product?
                        </div>
                        <i
                          className="fa fa-chevron-down"
                          style={{ fontSize: 10 }}
                        ></i>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="10">
                      <Card.Body>
                        <p className="faq-answers">
                          {" "}
                          Click on the Product you want to purchase
                        </p>
                        <p className="faq-answers">
                          {" "}
                          Specify how much you want to spend (you will see a
                          brief simulation of what your total payment and the
                          Profit will be like) Click “Order”
                        </p>
                        <p className="faq-answers"> Click "Buy"</p>
                        <p className="faq-answers">
                          Once you finally place your order, you would need to
                          make payment for the order via your bank’s
                          online/mobile platform to the account details
                          provided. While making payment, please specify the 5
                          digit code provided, so we can easily identify the
                          transaction.
                        </p>
                        <p className="faq-answers">
                          Once payment has been confirmed, your purchase will be
                          manually allocated and you will receive a purchase
                          allocation in your email box.
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  {/* second question */}
                  <Card>
                    <Accordion.Toggle
                      onClick={() =>
                        setState({
                          o8: o8 ? false : true,
                        })
                      }
                      as={Card.Header}
                      eventKey="11"
                    >
                      <div className="faq-side-header">
                        {" "}
                        <div>
                          <span className="sideplus">{!o8 ? "+" : "-"}</span>
                          What happens after I pay for a product?
                        </div>
                        <i
                          className="fa fa-chevron-down"
                          style={{ fontSize: 10 }}
                        ></i>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="11">
                      <Card.Body>
                        <p className="faq-answers">
                          Once you have paid for a product, you will receive an
                          email showing exactly what you have purchased, the
                          trading cycle and how much profit you will be paid
                          once trading is done and also when payment will be
                          made back to you
                        </p>
                        <p className="faq-answers">
                          You will also see this information on your dashboard,
                          where you can actually download the receipt and use it
                          as proof of purchase to be tendered wherever you want.
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle
                      onClick={() =>
                        setState({
                          o9: o9 ? false : true,
                        })
                      }
                      as={Card.Header}
                      eventKey="19"
                    >
                      <div className="faq-side-header">
                        <div>
                          <span className="sideplus">{!o9 ? "+" : "-"}</span>How
                          can you give such high returns?
                        </div>
                        <i
                          className="fa fa-chevron-down"
                          style={{ fontSize: 10 }}
                        ></i>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="19">
                      <Card.Body>
                        <p className="faq-answers">
                          The way trading in the Energy (Oil and Gas) sector has
                          been setup , enables traders to trade multiple times
                          within the selected cycle period. For us , we trade in
                          30-day cycles , this is what guarantees the high
                          returns we offer.{" "}
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle
                      onClick={() =>
                        setState({
                          o10: o10 ? false : true,
                        })
                      }
                      as={Card.Header}
                      eventKey="13"
                    >
                      <div className="faq-side-header">
                        {" "}
                        <div>
                          <span className="sideplus">{!o10 ? "+" : "-"}</span>
                          How do I get my returns (Return After Trade)?
                        </div>
                        <i
                          className="fa fa-chevron-down"
                          style={{ fontSize: 10 }}
                        ></i>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="13">
                      <Card.Body>
                        <p className="faq-answers">
                          The Return After Trade will be sent within 72hours
                          after your trading cycle ends. It will be sent to your
                          bank account which you have provided in your
                          personalised profile. These details should be up to
                          date so your money can be paid there securely.
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle
                      as={Card.Header}
                      onClick={() =>
                        setState({
                          o12: o12 ? false : true,
                        })
                      }
                      eventKey="15"
                    >
                      <div className="faq-side-header">
                        {" "}
                        <div>
                          <span className="sideplus">{!o12 ? "+" : "-"}</span>
                          What determines how much products I can buy?
                        </div>
                        <i
                          className="fa fa-chevron-down"
                          style={{ fontSize: 10 }}
                        ></i>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="15">
                      <Card.Body>
                        <p className="faq-answers">
                          The minimum amount of a product you can purchase is
                          determined by the product you are purchasing, while
                          the maximum amount of a product you can purchase is
                          subject to how much you actually have.
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle
                      onClick={() =>
                        setState({
                          o13: o13 ? false : true,
                        })
                      }
                      as={Card.Header}
                      eventKey="16"
                    >
                      <div className="faq-side-header">
                        {" "}
                        <div>
                          <span className="sideplus">{!o13 ? "+" : "-"}</span>{" "}
                          Can I pull out funds after purchasing a product?
                        </div>
                        <i
                          className="fa fa-chevron-down"
                          style={{ fontSize: 10 }}
                        ></i>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="16">
                      <Card.Body>
                        <p className="faq-answers">
                          You can pull out your funds only within the month that
                          you made the purchase. You will only receive the
                          amount you have paid and nothing more.
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle
                      onClick={() =>
                        setState({
                          o14: o14 ? false : true,
                        })
                      }
                      as={Card.Header}
                      eventKey="17"
                    >
                      <div className="faq-side-header">
                        {" "}
                        <div>
                          <span className="sideplus">{!o14 ? "+" : "-"}</span>
                          Are my funds insured?
                        </div>
                        <i
                          className="fa fa-chevron-down"
                          style={{ fontSize: 10 }}
                        ></i>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="17">
                      <Card.Body>
                        <p className="faq-answers">
                          Most parts of the Energy commodities trading sector
                          (Oil and Gas) is deregulated and insurance is one of
                          the most important aspects of the sector. We and our
                          partners have taken time to make the trading process
                          as risk free as possible, which in turn makes sure
                          funds put in are assured to come out unhurt even if
                          something goes wrong.
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle
                      onClick={() =>
                        setState({
                          o15: o15 ? false : true,
                        })
                      }
                      as={Card.Header}
                      eventKey="18"
                    >
                      <div className="faq-side-header">
                        {" "}
                        <div>
                          <span className="sideplus">{!o15 ? "+" : "-"}</span>
                          Are there other channels to access Pramopro?
                        </div>
                        <i
                          className="fa fa-chevron-down"
                          style={{ fontSize: 10 }}
                        ></i>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="18">
                      <Card.Body>
                        <p className="faq-answers">
                          We have a Mobile Application on the Android Play Store
                          which can be downloaded{" "}
                          <a
                            href="https://play.google.com/store/apps/details?id=com.pramopro.app"
                            className="androidstorelink"
                            target="blank"
                          >
                            here
                          </a>
                        </p>
                        <p className="faq-answers">
                          The Mobile Application will soon be available on the
                          Apple AppStore.
                        </p>
                        <p className="faq-answers">
                          This mobile application will enable you easily
                          purchase products and also send you notifications on
                          available products you can purchase.
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
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

export default FAQs;
