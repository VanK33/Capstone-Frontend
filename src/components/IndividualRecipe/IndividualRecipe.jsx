import { useState } from "react";

function IndividualRecipe({ recipe }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState();

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };
  const closeModal = (event) => {
    if (event.target.getAttribute("class") === "modal-overlay") {
      setIsModalOpen(false);
    }
  };
  return (
    <div>
      <div>
        <img src="" alt="recipe snapshot" />
        <div> {recipe.recipe_name} </div>
      </div>
      <div>
        <div>{recipe.likes}</div>
        <div>
          <img src="" alt="edit" />
          <img src="" alt="delete" />
        </div>
      </div>
    </div>
  );
}

export default IndividualRecipe;
