import { useEffect, useState } from "react";
import "./SelectionCard.scss";
import { Button } from "@mui/material";
import Modal from "../Modal/Modal";

const apparenceCount = 1;

function SelectionCard({
  recipeArray,
  closePublicModal,
  openPublicModal,
  selectedPublicRecipe,
  isPublicModalOpen,
}) {
  const [origins, setOrigins] = useState([]);
  const [tastes, setTastes] = useState([]);
  const [meatType, setMeatType] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedTaste, setSelectedTaste] = useState(null);
  const [selectedMeatType, setSelectedMeatType] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    if (recipeArray && recipeArray.length > 0) {
      const origins = Array.from(
        new Set(recipeArray.flatMap((recipe) => recipe.origins))
      );
      origins.sort((a, b) => {
        const order = ["EU", "NA", "SA", "Asia"];
        const indexA = order.indexOf(a);
        const indexB = order.indexOf(b);

        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        } else if (indexA !== -1) {
          return -1;
        } else if (indexB !== -1) {
          return 1;
        }

        return a.localeCompare(b);
      });
      setOrigins(origins);

      const tastes = Array.from(
        new Set(recipeArray.flatMap((recipe) => recipe.tastes))
      );
      setTastes(tastes);

      const meatType = Array.from(
        new Set(recipeArray.flatMap((recipe) => recipe.meat))
      );
      setMeatType(meatType);

      const ingredientCounts = {};
      recipeArray.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          ingredientCounts[ingredient] =
            (ingredientCounts[ingredient] || 0) + 1;
        });
      });
      const ingredients = Object.keys(ingredientCounts).filter(
        (ingredient) => ingredientCounts[ingredient] > apparenceCount
      );
      setIngredients(ingredients);

      setIsDataReady(true);
    }
  }, [recipeArray]);

  return (
    <div className="selection-card">
      {isDataReady && (
        <>
          {/* Orgin Section */}
          <div className="selection-card__section">
            <h3 className="selection-card__title"> Origin </h3>
            <div className="selection-card__buttons">
              {origins.map((origin) => (
                <Button
                  key={origin.id}
                  className="selection-card__button"
                  onClick={() => {
                    if (selectedOrigin === origin) {
                      setSelectedOrigin(null);
                    } else {
                      setSelectedOrigin(origin);
                    }
                  }}
                  variant={selectedOrigin === origin ? "contained" : "outlined"}
                >
                  {origin}
                </Button>
              ))}
            </div>
          </div>
          {/* Taste Section */}
          <div className="selection-card__section">
            <h3 className="selection-card__title"> Taste </h3>
            <div className="selection-card__buttons">
              {tastes.map((taste) => (
                <Button
                  key={taste.id}
                  className="selection-card__button"
                  onClick={() => {
                    if (selectedTaste === taste) {
                      setSelectedTaste(null);
                    } else {
                      setSelectedTaste(taste);
                    }
                  }}
                  variant={selectedTaste === taste ? "contained" : "outlined"}
                >
                  {taste}
                </Button>
              ))}
            </div>
          </div>
          {/* Meat-type Section */}
          <div className="selection-card__section">
            <h3 className="selection-card__title"> Meat-type </h3>
            <div className="selection-card__buttons">
              {meatType.map((meat) => (
                <Button
                  key={meat.id}
                  className="selection-card__button"
                  onClick={() => {
                    if (selectedMeatType === meat) {
                      setSelectedMeatType(null);
                    } else {
                      setSelectedMeatType(meat);
                    }
                  }}
                  variant={selectedMeatType === meat ? "contained" : "outlined"}
                >
                  {meat}
                </Button>
              ))}
            </div>
          </div>
          {/* Ingredients Section */}
          <div className="selection-card__section">
            <h3 className="selection-card__title"> Ingredients </h3>
            <div className="selection-card__buttons">
              {ingredients.map((ingredient) => (
                <Button
                  key={ingredient.id}
                  className="selection-card__button"
                  onClick={() => {
                    if (selectedIngredients.includes(ingredient)) {
                      setSelectedIngredients((prev) =>
                        prev.filter((item) => item !== ingredient)
                      );
                    } else {
                      setSelectedIngredients((prev) => [...prev, ingredient]);
                    }
                  }}
                  variant={
                    selectedIngredients.includes(ingredient)
                      ? "contained"
                      : "outlined"
                  }
                >
                  {" "}
                  {ingredient}{" "}
                </Button>
              ))}
            </div>
          </div>
          {/* Result Section */}
          <div className="selection-card__section">
            <h3 className="selection-card__result-title"> Results </h3>
            <div className="selection-card__buttons">
              {recipeArray
                .filter(
                  (recipe) =>
                    (!selectedOrigin ||
                      recipe.origins.includes(selectedOrigin)) &&
                    (!selectedTaste || recipe.tastes.includes(selectedTaste)) &&
                    (!selectedMeatType ||
                      recipe.meat.includes(selectedMeatType)) &&
                    (selectedIngredients.length === 0 ||
                      selectedIngredients.every((ingredient) =>
                        recipe.ingredients.includes(ingredient)
                      ))
                )
                .map((recipe) => (
                  <Button
                    key={recipe.id}
                    className="selection-card__button"
                    variant="outlined"
                    onClick={() => {
                      openPublicModal(recipe);
                    }}
                  >
                    {recipe.recipe_name}
                  </Button>
                ))}
            </div>
          </div>
        </>
      )}

      {isPublicModalOpen && (
        <Modal
          closePublicModal={closePublicModal}
          selectedPublicRecipe={selectedPublicRecipe}
        />
      )}
    </div>
  );
}

export default SelectionCard;
