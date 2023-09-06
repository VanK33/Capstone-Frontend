import { Button } from "@mui/material";
import IndividualRecipe from "../IndividualRecipe/IndividualRecipe";
import { DeleteModal, EditModal, PostModal } from "../Modal/Modal";
import "./UserRecipes.scss";
import Modal from "../Modal/Modal";

function UserRecipes({
  userDetails,
  isDeleteModalOpen,
  isEditModalOpen,
  isPostModalOpen,
  openDeleteModal,
  openEditModal,
  openPostModal,
  closeModal,
  selectedRecipe,
  deleteButtonCloseModal,
  editButtonCloseModal,
  PostButtonCloseModal,
  closePublicModal,
  openPublicModal,
  selectedPublicRecipe,
  isPublicModalOpen,
}) {
  // console.log("看看currentUser包含什么了", currentUser);

  return (
    <div className="user-recipes">
      <div className="user-recipes__first-section">
        <h2 className="user-recipes__title"> Your Contribution </h2>
        <Button
          onClick={openPostModal}
          variant="contained"
          className="user-recipes__button"
        >
          {" "}
          Post New{" "}
        </Button>
      </div>

      <div className="user-recipes__subheadings">
        <div className="user-recipes__subheading-couple">
          <div className="user-recipes__individual-subheading">Snap Shot</div>
          <div className="user-recipes__individual-subheading"> Name </div>
        </div>
        <div className="user-recipes__subheading-couple">
          <div className="user-recipes__individual-subheading">Likes</div>
          <div className="user-recipes__individual-subheading">Action</div>
        </div>
      </div>

      <ul className="user-recipes__recipe-list">
        {userDetails.map((recipe) => (
          <li key={recipe.id}>
            <IndividualRecipe
              recipe={recipe}
              openDeleteModal={openDeleteModal}
              openEditModal={openEditModal}
              openPostModal={openPostModal}
              openPublicModal={openPublicModal}
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
        <EditModal
          closeModal={closeModal}
          selectedRecipe={selectedRecipe}
          editButtonCloseModal={editButtonCloseModal}
        />
      )}

      {isPostModalOpen && (
        <PostModal
          closeModal={closeModal}
          PostButtonCloseModal={PostButtonCloseModal}
        />
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

export default UserRecipes;
