import { Button } from "@mui/material";
import { useState } from "react";
import IndividualRecipe from "../IndividualRecipe/IndividualRecipe";
import { DeleteModal, EditModal } from "../Modal/Modal";
import axios from "axios";

const URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_PORT;

function UserRecipes({ userDetails, currentUser, fetchUserDetails }) {
  // console.log("看看currentUser包含什么了", currentUser);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState();

  const openDeleteModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsDeleteModalOpen(true);
  };
  const openEditModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsEditModalOpen(true);
  };
  const closeModal = () => {
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
  };

  const deleteButtonCloseModal = async (recipeId) => {
    try {
      await axios.delete(`${URL}:${PORT}/${currentUser.id}/${recipeId}`);
      // console.log("this suppose to be the deleting command");
      await fetchUserDetails(currentUser.id);
      setIsDeleteModalOpen(false);
      setIsEditModalOpen(false);
    } catch (error) {
      console.log("this error comes from UserRecipes.jsx", error);
    }
  };
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
          <li key={recipe.id}>
            <IndividualRecipe
              recipe={recipe}
              openDeleteModal={openDeleteModal}
              openEditModal={openEditModal}
            />
          </li>
        ))}
      </ul>

      {isDeleteModalOpen && (
        <DeleteModal
          closeModal={closeModal}
          deleteButtonCloseModal={deleteButtonCloseModal}
          selectedRecipe={selectedRecipe}
          messageTitle={`Delete ${selectedRecipe.recipe_name} Recipe?`}
          messageBody={`Please confirm that you'd like to delete ${selectedRecipe.recipe_name} recipe? You won't be able to undo this action.`}
        />
      )}

      {isEditModalOpen && (
        <EditModal closeModal={closeModal} selectedRecipe={selectedRecipe} />
      )}
    </div>
  );
}

export default UserRecipes;
