import "./Modal.scss";
// import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecipeCardDetail from "./RecipeCardDetail/RecipeCardDetail";
import RecipeCardVideo from "./RecipeCardVideo/RecipeCardVideo";

function Modal(props) {
  console.log(props);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="modal-overlay" onClick={props.closeModal}>
      <div className="modal">
        <Slider {...settings}>
          <RecipeCardDetail selectedRecipe={props.selectedRecipe} />
          <RecipeCardVideo selectedRecipe={props.selectedRecipe} />
        </Slider>
      </div>
    </div>
  );
}

export default Modal;
