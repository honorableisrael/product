import * as React from "react";
import "./shared.css";
import slide1 from "../../assets/slide1.png";
import rightarrow from "../../assets/rightarrow.png";
import leftarrow from "../../assets/leftarrow.png";
import { useEffect, useState } from "react";
import Axios from "axios";
import { API } from "../../config";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const SliderMobile: React.FC = (props) => {
  const [state, setNewState]: any = useState({
    products: [],
    clientIsLoggedIn: false,
  });
  const { products, clientIsLoggedIn } = state;
  useEffect(() => {
    const loggedIn = localStorage.getItem("userDetails");
    const clientdata = loggedIn ? JSON.parse(loggedIn) : "";
    Axios.get(`${API}/products`)
      .then((res) => {
        console.log(res);
        setNewState({
          ...state,
          products: res.data.data,
          clientIsLoggedIn: clientdata ? true : false,
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
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay={true}
        autoPlaySpeed={7000}
        centerMode={false}
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={true}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 3,
            paritialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 710,
              min: 0,
            },
            items: 1,
            paritialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 710,
            },
            items: 2,
            paritialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        className="center-changed"
      >
        {/* <div className="center-changed" id="content">
            <div className="slidewrapper"> */}
        {products.length > 0 &&
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
                <div className="prddss1">
                  <Link to="/products">{x.name}</Link>
                </div>
                <div>
                  <span className="buyat">Buy at</span>
                  <span className="amount">₦{FormatAmount(x.price)}</span>
                  <div>
                    <span className="buyat">Sell at</span>
                    <span className="amount">
                      ₦{calculateReturnAmount(x.price, x.return)}
                    </span>
                    <div className="amm1 littf">
                      After {x.cycle} {x.cycle == 1 ? "month" : "months"}{" "}
                    </div>
                  </div>
                  <div className="slider22">
                    <span className="rightarrw1">
                      <Link to="/products">View</Link>
                    </span>
                    <span className="rightarrw">
                      <Link to="/products">&#8594;</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {/* </div>
          </div> */}
      </Carousel>
    </>
  );
};
export default SliderMobile;
