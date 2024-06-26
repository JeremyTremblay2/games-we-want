import React, { Component } from "react"
import Slider from "react-slick"
import PropTypes from "prop-types"

import "./index.css"

const CenterSlider = ({ children = null }) => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  }
  return (
    <div className="slider-container">
      <Slider {...settings}>{children}</Slider>
    </div>
  )
}

export default CenterSlider

CenterSlider.propTypes = {
  children: PropTypes.node.isRequired,
}
