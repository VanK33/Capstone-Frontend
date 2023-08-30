import { useEffect, useState } from "react";

function SelectionCard(props) {
  const [recipeArray, setRecipeArray] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("mockinglink");
      console.log(response.data);
      setRecipeArray(response.data);
    } catch (error) {
      console.log("fetching data error: ", error);
    }
  };
  return (
    <div>
      <div>
        <h3> Origin </h3>
      </div>
      <div>
        <h3> Taste </h3>
      </div>
      <div>
        <h3> Meat-type </h3>
      </div>
      <div>
        <h3> Ingredients </h3>
      </div>
      <div>
        <h3> Results </h3>
      </div>
    </div>
  );
}

export default SelectionCard;
