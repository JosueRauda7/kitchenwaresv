import React from "react";
import "./Slider.css";

import Slider1 from "../../assets/slider1.png";
import Slider2 from "../../assets/slider2.png";

const Slider = (props) => {
  return (
    <div className='Slider'>
      <div className='SliderContainer'>
        <div className='Slide'>
          <div className='Image'>
            <img src={Slider1} />
          </div>
        </div>
        <div className='Slide'>
          <div className='Image'>
            <img src={Slider2} />
          </div>
        </div>
        <div className='Slide'>
          <div className='Image'>
            <img src={Slider1} />
          </div>
        </div>
        <div className='Slide'>
          <div className='Image'>
            <img src={Slider2} />
          </div>
        </div>
      </div>
      <div className='ControlSlider'>
        <input type='radio' name='slide' />
        <input type='radio' name='slide' />
        <input type='radio' name='slide' />
        <input type='radio' name='slide' />
      </div>
    </div>
  );
};

export default Slider;
