import Header from "../../components/Header/Header";
import SelectionCard from "../../components/SelectionCard/SelectionCard";
import "./PublicPage.scss";
import websiteLogo2 from "../../assets/logo/websitelogo-2-nbg.png";

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
    <div className="public-page">
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
        <div className="public-page__heading">
          <img src={websiteLogo2} alt="log" className="public-page__logo" />
          <h1 className="public-page__header">
            {" "}
            Welcome! Please Make Your Desired Selections{" "}
          </h1>
        </div>

        <SelectionCard
          recipeArray={recipeArray}
          closePublicModal={closePublicModal}
          openPublicModal={openPublicModal}
          selectedPublicRecipe={selectedPublicRecipe}
          isPublicModalOpen={isPublicModalOpen}
        />
      </div>
    </div>
  );
}

export default PublicPage;
