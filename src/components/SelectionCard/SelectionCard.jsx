import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_PORT;
const apparenceCount = 1;

function SelectionCard(props) {
  const [recipeArray, setRecipeArray] = useState();
  const [origins, setOrigins] = useState([]);
  const [tastes, setTastes] = useState([]);
  const [meatType, setMeatType] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedTaste, setSelectedTaste] = useState(null);
  const [selectedMeatType, setSelectedMeatType] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}:${PORT}/public`);
      setRecipeArray(response.data);
    } catch (error) {
      console.log("fetching data error: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const filterRecipes = () => {
    let filteredRecipes = [...recipeArray];

    if (selectedOrigin) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.origins.includes(selectedOrigin)
      );
    }

    if (selectedTaste) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.tastes.includes(selectedTaste)
      );
    }

    if (selectedMeatType) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.meat.includes(selectedMeatType)
      );
    }

    if (selectedIngredients.length > 0) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        selectedIngredients.every((ingredient) =>
          recipe.ingredients.includes(ingredient)
        )
      );
    }

    return filterRecipes;
  };

  return (
    <div>
      {isDataReady && (
        <>
          <div>
            <h3> Origin </h3>
            {origins.map((origin) => (
              <Button
                key={origin}
                onClick={() => setSelectedOrigin(origin)}
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
                key={taste}
                onClick={() => setSelectedTaste(taste)}
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
                key={meat}
                onClick={() => setSelectedMeatType(meat)}
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
                key={ingredient}
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
            {filterRecipes().map((recipe, index) => (
              <div key={index}>
                <h4>{recipe.title}</h4>
                <p>Origin: {recipe.origin}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SelectionCard;
