import React from "react";
import Slider1 from "../../assets/slider1.png";
import Slider2 from "../../assets/slider2.png";
import "./LandingPage.css";

const LandingPage = (props) => {
  return (
    <div>
      <div className='Slider'>
        <div className='SliderContainer'>
          <img src={Slider1} />
          <img src={Slider2} />
          <img src={Slider1} />
          <img src={Slider2} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
