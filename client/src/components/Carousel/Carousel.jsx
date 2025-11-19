import React from "react";
import "./carousel.css";

function Carousel() {
  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://sr-website.shiprocket.in/wp-content/uploads/2018/06/17th-April.jpg"
            className="d-block w-100 carousel-img"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://t4.ftcdn.net/jpg/03/92/21/09/360_F_392210928_JgmPZsGuKSye5FqOoCyjSGRTF7fJIgOS.jpg"
            className="d-block w-100 carousel-img"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://marketplace.canva.com/EAFwKv5Me74/1/0/1600w/canva-e-commerce-website-in-blue-pastel-red-teal-chic-photocentric-style-TFuC4TVR8fY.jpg"
            className="d-block w-100 carousel-img"
            alt="..."
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
