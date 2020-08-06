import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Dashboard.css";
import allCountries from "./listOfCountriesInTheWorld";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { API } from "../../config";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const BankDetails = (props) => {
  const [state, setFormState] = React.useState({
    errorMessage: "",
    account_name: "",
    Bank_Country: "Nigeria",
    bank_name: "",
    account_no: "",
    success: false,
    BankList: [],
    islocal: true,
    isloading: false,
  });
  const {
    errorMessage,
    account_name,
    Bank_Country,
    bank_name,
    account_no,
    success,
    BankList,
    islocal,
    isloading,
  }: any = state;
  const onchange = (e: any) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const handleChange = (e) => {
    setFormState({
      ...state,
      bank_name: e.target.value,
    });
  };
  const notify = (message: string, container = "A") => {
    toast(message, { containerId: container });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  const updateBankDetails = () => {
    setFormState({
      ...state,
      isloading: true,
    });
    const user: any = localStorage.getItem("userDetails");
    const user_id = JSON.parse(user);
    const id = user_id.user.id;
    var token = user_id.token;

    const data = {
      account_name,
      account_no,
      bank_name,
    };
    console.log(data);
    axios
      .put(`${API}/user/bank-details`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setFormState({
          ...state,
          isloading: false,
          errorMessage: "",
        });
        setTimeout(() => {
          notify("Update Successfull");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setFormState({
          ...state,
          isloading: false,
          errorMessage: "Failed to Update",
        });
        notify("Update Failed", "B");
      });
  };
  useEffect(() => {
    const loggedIn = localStorage.getItem("userDetails");
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    axios
      .all([
        axios.get(`${API}/banks`, {
          headers: { Authorization: `Token ${token}` },
        }),
        axios.get(`${API}/user/bank-details`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])
      .then(
        axios.spread((firstresponse, secondresponse) => {
          console.log(firstresponse);
          console.log(secondresponse);
          if (firstresponse?.status == 200 || secondresponse?.status == 200) {
            setFormState({
              ...state,
              account_no: secondresponse?.data?.data?.account_no,
              bank_name: secondresponse.data.data.bank_name,
              account_name: secondresponse.data.data.account_name,
              BankList: firstresponse.data.data,
            });
          }
        })
      )
      .catch((error) => {
        console.log(error.response);
        if (error && error.response && error.response.data) {
        }
        if (error && error.response == undefined) {
        }
      });
  }, []);
  console.log(BankList);
  return (
    <>
      <Row className="refwq1">
        <Col md={12}>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <h6 className="userprofile">Account Name</h6>
                  <Form.Control
                    type="text"
                    value={account_name}
                    className="userfield"
                    id="account_name"
                    onChange={onchange}
                    placeholder=""
                  />
                  <i
                    className="fa fa-envelope field-right-icon"
                    aria-hidden="true"
                  ></i>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <h6 className="userprofile">Bank Name</h6>
                  <Form.Control
                    as="select"
                    className="fmc"
                    onChange={handleChange}
                  >
                    <option>{bank_name ? bank_name : "Not Chosen..."}</option>
                    {BankList.length > 0 &&
                      BankList?.map((x) => (
                        <option value={x.name} key={x.name} id="country">
                          {x.name}
                        </option>
                      ))}
                    ))}
                  </Form.Control>
                  <i
                    className="fa fa-envelope field-right-icon"
                    aria-hidden="true"
                  ></i>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <h6 className="userprofile">Account Number</h6>
                  <Form.Control
                    type="text"
                    value={account_no}
                    className="userfield"
                    id="account_no"
                    onChange={onchange}
                    placeholder=""
                  />
                  <i
                    className="fa fa-envelope field-right-icon"
                    aria-hidden="true"
                  ></i>
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <Row className="sds">
            <div>
              <div className="updatebtn" onClick={updateBankDetails}>
                {isloading ? "Updating" : "Update"}
              </div>
            </div>
          </Row>
        </Col>
      </Row>
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"A"}
        toastClassName="bg-success text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
    </>
  );
};

export default BankDetails;
