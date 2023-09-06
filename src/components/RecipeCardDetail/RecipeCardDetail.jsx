import "./RecipeCardDetail.scss";
import { Button } from "@mui/material";

function RecipeCardDetail({ selectedRecipe, closePublicModal }) {
  // console.log(selectedRecipe.ingredients);
  return (
    <div className="card-detail">
      <h1 className="card-detail__title">
        {selectedRecipe.recipe_name} Details{" "}
      </h1>

      <div className="card-detail__body">
        <div className="card-detail__detail-information">
          <div className="card-detail__detail">
            <h3 className="card-detail__sub-title"> Procedures </h3>
            <ol>
              {selectedRecipe.procedures.map((procedure) => (
                <li>{procedure}</li>
              ))}
            </ol>
          </div>
          <div className="card-detail__detail card-detail__detail--boarder">
            <h3> Ingredients </h3>
            <ul className="card-detail__ingredients">
              {selectedRecipe.ingredients.map((ingredient) => (
                <li className="card-detail__ingredients-item">{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card-detail__buttons">
          <a href={selectedRecipe.secondary_link}>
            <Button variant="contained">Find Out More</Button>
          </a>

          <Button variant="outlined" onClick={closePublicModal}>
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCardDetail;
