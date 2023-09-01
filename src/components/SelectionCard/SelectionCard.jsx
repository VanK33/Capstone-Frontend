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

  return (
    <div>
      {isDataReady && (
        <>
          <div>
            <h3> Origin </h3>
            {origins.map((origin) => (
              <Button key={origin}> {origin} </Button>
            ))}
          </div>
          <div>
            <h3> Taste </h3>
            {tastes.map((taste) => (
              <Button key={taste}> {taste} </Button>
            ))}
          </div>
          <div>
            <h3> Meat-type </h3>
            {meatType.map((meat) => (
              <Button key={meat}> {meat} </Button>
            ))}
          </div>
          <div>
            <h3> Ingredients </h3>
            {ingredients.map((ingredient) => (
              <Button key={ingredient}> {ingredient} </Button>
            ))}
          </div>
          <div>
            <h3> Results </h3>
            {/* Render search results */}
          </div>
        </>
      )}
    </div>
  );
}

export default SelectionCard;
