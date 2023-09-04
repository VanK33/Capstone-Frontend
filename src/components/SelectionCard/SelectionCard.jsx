import { useEffect, useState } from "react";

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
  // const [recipeArray, setRecipeArray] = useState();
  const [origins, setOrigins] = useState([]);
  const [tastes, setTastes] = useState([]);
  const [meatType, setMeatType] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedTaste, setSelectedTaste] = useState(null);
  const [selectedMeatType, setSelectedMeatType] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedRecipe, setSelectedRecipe] = useState();

  // const openModal = (recipe) => {
  //   setSelectedRecipe(recipe);
  //   setIsModalOpen(true);
  // };
  // const closeModal = (event) => {
  //   if (event.target.getAttribute("class") === "modal-overlay") {
  //     setIsModalOpen(false);
  //   }
  // };

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${URL}:${PORT}/public`);
  //     setRecipeArray(response.data);
  //   } catch (error) {
  //     console.log("fetching data error: ", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

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
    <div>
      {isDataReady && (
        <>
          <div>
            <h3> Origin </h3>
            {origins.map((origin) => (
              <Button
                key={origin.id}
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
          <div>
            <h3> Taste </h3>
            {tastes.map((taste) => (
              <Button
                key={taste.id}
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
          <div>
            <h3> Meat-type </h3>
            {meatType.map((meat) => (
              <Button
                key={meat.id}
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
          <div>
            <h3> Ingredients </h3>
            {ingredients.map((ingredient) => (
              <Button
                key={ingredient.id}
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
          <div>
            <h3> Results </h3>
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
                  onClick={() => {
                    openPublicModal(recipe);
                  }}
                >
                  {recipe.recipe_name}
                </Button>
              ))}
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
