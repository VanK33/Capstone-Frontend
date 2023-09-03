import Header from "../../components/Header/Header";
import SelectionCard from "../../components/SelectionCard/SelectionCard";

function PublicPage({ token, currentUser, handleRandomRecipe }) {
  return (
    <div>
      <Header
        token={token}
        currentUser={currentUser}
        handleRandomRecipe={handleRandomRecipe}
      />
      <div>
        <img src="" alt="log" />
        <h1> This is the title </h1>
      </div>

      <SelectionCard />
    </div>
  );
}

export default PublicPage;
