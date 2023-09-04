import Header from "../../components/Header/Header";
import SelectionCard from "../../components/SelectionCard/SelectionCard";

function PublicPage({
  token,
  currentUser,
  handleRandomRecipe,
  closeModal,
  openPostModal,
  PostButtonCloseModal,
  isPostModalOpen,
  recipeArray,
  closePublicModal,
  openPublicModal,
  selectedPublicRecipe,
  isPublicModalOpen,
}) {
  return (
    <div>
      <Header
        token={token}
        currentUser={currentUser}
        tryLuckButton={true}
        handleRandomRecipe={handleRandomRecipe}
        closeModal={closeModal}
        openPostModal={openPostModal}
        PostButtonCloseModal={PostButtonCloseModal}
        isPostModalOpen={isPostModalOpen}
      />
      <div>
        <img src="" alt="log" />
        <h1> This is the title </h1>
      </div>

      <SelectionCard
        recipeArray={recipeArray}
        closePublicModal={closePublicModal}
        openPublicModal={openPublicModal}
        selectedPublicRecipe={selectedPublicRecipe}
        isPublicModalOpen={isPublicModalOpen}
      />
    </div>
  );
}

export default PublicPage;
