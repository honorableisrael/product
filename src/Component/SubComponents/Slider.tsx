import * as React from "react";
import "./shared.css";
import slide1 from "../../assets/slide1.png";
import rightarrow from "../../assets/rightarrow.png";
import leftarrow from "../../assets/leftarrow.png";
import { useEffect, useState } from "react";
import Axios from "axios";
import { API } from "../../config";
import { Link } from "react-router-dom";

const onclickLeft = () => {
  scrollLeft(document.getElementById("content"), -370, 700);
};

const onclickRight = () => {
  scrollLeft(document.getElementById("content"), 370, 700);
};
var math: any = Math;
function scrollLeft(element, change, duration) {
  let start = element.scrollLeft,
    currentTime = 0,
    increment = 20;
  const animateScroll = function () {
    currentTime += increment;
    var val = math.easeInOutQuad(currentTime, start, change, duration);
    element.scrollLeft = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
  console.log("running");
}
math.easeInOutQuad = function (
  currentTime,
  startValue,
  changeInValue,
  duration
) {
  currentTime /= duration / 2;
  if (currentTime < 1)
    return (changeInValue / 2) * currentTime * currentTime + startValue;
  currentTime--;
  return (
    (-changeInValue / 2) * (currentTime * (currentTime - 2) - 1) + startValue
  );
};

const Slider: React.FC = (props) => {
  const [state, setNewState]: any = useState({
    products: {},
    clientIsLoggedIn: false,
  });
  const { products, clientIsLoggedIn } = state;
  useEffect(() => {
    const loggedIn = localStorage.getItem("userDetails");
    const clientdata = loggedIn ? JSON.parse(loggedIn) : "";
    Axios.get(`${API}/api/v1/products`)
      .then((res) => {
        console.log(res);
        setNewState({
          ...state,
          products: res.data.products,
          clientIsLoggedIn: clientdata.user.username ? true : false,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const FormatAmount = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  console.log(clientIsLoggedIn);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const calculateReturnAmount = (price: number, rate: number): any => {
    const payBack = price + price * (rate / 100);
    console.log(payBack);
    return FormatAmount(payBack);
  };
  return (
    <>
      <div className="arrowflex">
        {products.length>0 && (
          <span className="leftarrowcontainer">
            <img
              src={leftarrow}
              onClick={onclickLeft}
              className="leftarrow"
              alt="leftarrow"
            />
          </span>
        )}
        <div className="center-changed" id="content">
          <div className="slidewrapper">
            {products &&
              products.length > 0 &&
              products.map((x, index) => (
                <div className="slide1wrap" key={index}>
                  <div className="finished1">
                    <div
                      className={
                        capitalizeFirstLetter(x.status) === "Finished"
                          ? "finished11"
                          : capitalizeFirstLetter(x.status) === "Loaded"
                          ? "Loaded"
                          : "Loading"
                      }
                    >
                      {console.log(x)}
                      <span
                        className={
                          capitalizeFirstLetter(x.status) === "Finished"
                            ? "redcircle"
                            : capitalizeFirstLetter(x.status) === "Loaded"
                            ? "greencircle"
                            : "yellowcircle"
                        }
                      ></span>{" "}
                      {capitalizeFirstLetter(x.status)}
                    </div>
                  </div>
                  <Link to="/products">
                    {" "}
                    <img src={x.imageUrl} alt="slide1" className="slide1" />
                  </Link>
                  <div className="slidetitle">
                    <div>{x.name}</div>
                    <div>
                      <span className="buyat">Buy at</span>
                      <span className="amount">₦{FormatAmount(x.price)}</span>
                      <div>
                        <span className="buyat">Sell at</span>
                        <span className="amount">
                          ₦{calculateReturnAmount(x.price, x.return)}
                        </span>
                      </div>
                      <div className="slider22">
                        <span className="rightarrw1">
                          <Link to="/products">View</Link>
                        </span>
                        <span className="rightarrw">&#8594;</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {/* <div className="slide1wrap makelarger">
              <div className="finished1">
                <div className="Loaded">
                  {" "}
                  <span className="greencircle"></span> Loaded
                </div>
              </div>
              <img src={slide1} alt="slide1" className="slide1" />
              <div className="slidetitle">
                <div>AGO-111</div>
                <div>
                  <span className="buyat">Buy at</span>
                  <span className="amount">N100,000</span>
                  <div>
                    <span className="buyat">Sell at</span>
                    <span className="amount">N800,000</span>
                  </div>
                  <div className="buyat textss">In 8 months</div>
                  <div className="slider22">
                    <span className="rightarrw1">View</span>
                    <span className="rightarrw">&#8594;</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="slide1wrap">
              <div className="finished1">
                <div className="Loading">
                  {" "}
                  <span className="yellowcircle"></span> Loading
                </div>
              </div>
              <img src={slide1} alt="slide1" className="slide1" />
              <div className="slidetitle">
                <div>AGO-111</div>
                <div>
                  <span className="buyat">Buy at</span>
                  <span className="amount">N100,000</span>
                  <div>
                    <span className="buyat">Sell at</span>
                    <span className="amount">N800,000</span>
                  </div>
                  <div className="buyat textss">In 8 months</div>
                  <div className="slider22">
                    <span className="rightarrw1">View</span>
                    <span className="rightarrw">&#8594;</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="slide1wrap">
              <div className="finished1">
                <div className="Loading">
                  {" "}
                  <span className="yellowcircle"></span> Loading
                </div>
              </div>
              <img src={slide1} alt="slide1" className="slide1" />
              <div className="slidetitle">
                <div>AGO-111</div>
                <div>
                  <span className="buyat">Buy at</span>
                  <span className="amount">N100,000</span>
                  <div>
                    <span className="buyat">Sell at</span>
                    <span className="amount">N800,000</span>
                  </div>
                  <div className="buyat textss">In 8 months</div>
                  <div className="slider22">
                    <span className="rightarrw1">View</span>
                    <span className="rightarrw">&#8594;</span>
                  </div>
                </div>
              </div>
            </div> 
            
            {products?.products?.map((x) => (
            //   <div className="slide1wrap">
            //     <div className="finished1">
            //       <div className="Loading">
            //         {" "}
            //         <span className="yellowcircle"></span> Loading
            //       </div>
            //     </div>
            //     <Link to={`/product/${x.id}`}>
            //       {" "}
            //       <img src={slide1} alt="slide1" className="slide1" />
            //     </Link>
            //     <div className="slidetitle">
            //       <div>AGO-111</div>
            //       <div>
            //         <span className="buyat">Buy at</span>
            //         <span className="amount">N100,000</span>
            //         <div>
            //           <span className="buyat">Sell at</span>
            //           <span className="amount">N800,000</span>
            //         </div>
            //         <div className="buyat textss">In 8 months</div>
            //         <div className="slider22">
            //           <span className="rightarrw1">View</span>
            //           <span className="rightarrw">&#8594;</span>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // ))}

            {/* <div className="slide1wrap">
              <div className="finished1">
                <div className="Loading">
                  {" "}
                  <span className="yellowcircle"></span> Loading
                </div>
              </div>
              <img src={slide1} alt="slide1" className="slide1" />
              <div className="slidetitle">
                <div>AGO-111</div>
                <div>
                  <span className="buyat">Buy at</span>
                  <span className="amount">N100,000</span>
                  <div>
                    <span className="buyat">Sell at</span>
                    <span className="amount">N800,000</span>
                  </div>
                  <div className="buyat textss">In 8 months</div>
                  <div className="slider22">
                    <span className="rightarrw1">View</span>
                    <span className="rightarrw">&#8594;</span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {products.length>0 && (
          <span className="leftarrowcontainer">
            <img
              src={rightarrow}
              onClick={onclickRight}
              className="leftarrow"
              alt="leftarrow"
            />
          </span>
        )}
      </div>
    </>
  );
};
export default Slider;
