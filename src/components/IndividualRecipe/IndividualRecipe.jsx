function IndividualRecipe({ recipe, openDeleteModal, openEditModal }) {
  return (
    <div>
      <div>
        <img src="" alt="recipe snapshot" />
        <div> {recipe.recipe_name} </div>
      </div>
      <div>
        <div>{recipe.likes}</div>
        <div>
          <img src="" alt="edit" onClick={() => openEditModal(recipe)} />
          <img src="" alt="delete" onClick={() => openDeleteModal(recipe)} />
        </div>
      </div>
    </div>
  );
}

export default IndividualRecipe;
