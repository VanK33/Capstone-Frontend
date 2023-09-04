import { Button } from "@mui/material";
import IndividualRecipe from "../IndividualRecipe/IndividualRecipe";
import { DeleteModal, EditModal, PostModal } from "../Modal/Modal";

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
}) {
  // console.log("看看currentUser包含什么了", currentUser);

  return (
    <div>
      <div>
        <h2> Your Contribution </h2>
        <Button onClick={openPostModal}> Post New </Button>
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
              openPostModal={openPostModal}
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
    </div>
  );
}

export default UserRecipes;
