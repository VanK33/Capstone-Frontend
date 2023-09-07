import "./IndividualRecipe.scss";
import deleteIcon from "../../assets/logo/delete-icon.svg";
import editIcon from "../../assets/logo/edit-icon.svg";
import { recipes } from "../../assets/otions/options";
function IndividualRecipe({
  recipe,
  openDeleteModal,
  openEditModal,
  openPublicModal,
}) {
  const imageUrl = recipes[recipe.recipe_name];
  return (
    <div className="individual-recipe">
      <div
        className="individual-recipe__couple"
        onClick={() => openPublicModal(recipe)}
      >
        <div className="image">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="recipe snapshot"
              className="individual-recipe__image"
            />
          ) : (
            <div className="individual-recipe__image-placeholder">
              IMAGE PLACEHOLDER
            </div>
          )}
        </div>
        <div className="individual-recipe__item"> {recipe.recipe_name} </div>
      </div>
      <div className="individual-recipe__couple--fix">
        <div className="individual-recipe__item">{recipe.likes}</div>
        <div className="individual-recipe__sub-couple">
          <img
            src={editIcon}
            alt="edit"
            className="individual-recipe__icon"
            onClick={() => openEditModal(recipe)}
          />
          <img
            src={deleteIcon}
            alt="delete"
            className="individual-recipe__icon"
            onClick={() => openDeleteModal(recipe)}
          />
        </div>
      </div>
    </div>
  );
}

export default IndividualRecipe;
