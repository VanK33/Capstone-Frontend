import "./RecipeImageDetail.scss";
import { recipes } from "../../assets/otions/options";
import { useState } from "react";

function RecipeImageDetail({ selectedRecipe }) {
  const matchedImage = recipes[selectedRecipe.recipe_name];
  const [rotate, setRotate] = useState(false);

  const handleImageLoad = (e) => {
    const width = e.target.naturalWidth;
    const height = e.target.naturalHeight;

    if (height > width) {
      setRotate(true);
    }
  };

  if (!matchedImage) {
    return null;
  }

  return (
    <div className="recipe-detail">
      <div className="recipe-detail__image-container">
        <img
          src={matchedImage}
          alt={selectedRecipe.recipe_name}
          onLoad={handleImageLoad}
          className={
            rotate ? "recipe-detail__rotate-image" : "recipe-detail__image"
          }
        />
      </div>
      <h2 className="recipe-detail__title">{selectedRecipe.recipe_name}</h2>
    </div>
  );
}

export default RecipeImageDetail;
