import Header from "../../components/Header/Header";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserRecipes from "../../components/UserRecipes/UserRecipes";
import "./UserPage.scss";

function UserPage({
  token,
  currentUser,
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
  // console.log("currentUser", currentUser);

  return (
    userDetails && (
      <div>
        <Header
          token={token}
          currentUser={currentUser}
          userDetails={userDetails}
          closeModal={closeModal}
          openPostModal={openPostModal}
          PostButtonCloseModal={PostButtonCloseModal}
          isPostModalOpen={isPostModalOpen}
          tryLuckButton={false}
        />
        <div className="user-page">
          <h2> Welcome Back 🥂 {currentUser.contributor_name} </h2>
          <UserProfile userDetails={userDetails} currentUser={currentUser} />
          <UserRecipes
            userDetails={userDetails}
            isDeleteModalOpen={isDeleteModalOpen}
            isEditModalOpen={isEditModalOpen}
            isPostModalOpen={isPostModalOpen}
            selectedRecipe={selectedRecipe}
            openDeleteModal={openDeleteModal}
            openEditModal={openEditModal}
            openPostModal={openPostModal}
            closeModal={closeModal}
            deleteButtonCloseModal={deleteButtonCloseModal}
            editButtonCloseModal={editButtonCloseModal}
            PostButtonCloseModal={PostButtonCloseModal}
            closePublicModal={closePublicModal}
            openPublicModal={openPublicModal}
            selectedPublicRecipe={selectedPublicRecipe}
            isPublicModalOpen={isPublicModalOpen}
          />
        </div>
      </div>
    )
  );
}

export default UserPage;
