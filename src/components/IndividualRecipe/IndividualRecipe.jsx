function IndividualRecipe({ recipe }) {
  console.log("individualRecipe", recipe);
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
