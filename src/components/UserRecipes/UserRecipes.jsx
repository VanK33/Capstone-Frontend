import { Button } from "@mui/material";
import IndividualRecipe from "../IndividualRecipe/IndividualRecipe";

function UserRecipes({ userDetails }) {
  return (
    <div>
      <div>
        <h2> Your Contribution </h2>
        <Button> Post New </Button>
      </div>

      <div>
        <div>
          <div>Snap Shot</div>
          <div> Name </div>
        </div>
        <div>
          <div>Likes</div>
          <div>Action</div>
        </div>
      </div>

      <ul>
        {userDetails.map((recipe) => (
          <li>
            <IndividualRecipe recipe={recipe} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserRecipes;
