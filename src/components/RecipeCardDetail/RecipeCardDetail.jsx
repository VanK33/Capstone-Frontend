import "./RecipeCardDetail.scss";

function RecipeCardDetail({ selectedRecipe }) {
  // console.log(selectedRecipe.ingredients);
  return (
    <div className="card-detail">
      <h1 className="card-detail__title">
        {selectedRecipe.recipe_name} Details{" "}
      </h1>

      <div>
        <div>
          <div>
            <h3 className="card-detail__sub-title"> Procedures </h3>
            <ul>
              {selectedRecipe.procedures.map((procedure) => (
                <li>{procedure}</li>
              ))}
            </ul>
          </div>
          <div>
            <div>
              <h3> Ingredients </h3>
              <ul>
                {selectedRecipe.ingredients.map((ingredient) => (
                  <li>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <a href={selectedRecipe.secondary_link}>Find Out More</a>
      </div>
    </div>
  );
}

export default RecipeCardDetail;
