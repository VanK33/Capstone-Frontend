import Header from "../../components/Header/Header";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserRecipes from "../../components/UserRecipes/UserRecipes";

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
        <div>
          <div> Welcome Back, {currentUser.contributor_name} </div>
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
          />
        </div>
      </div>
    )
  );
}

export default UserPage;
