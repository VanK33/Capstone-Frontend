import Header from "../../components/Header/Header";
import SelectionCard from "../../components/SelectionCard/SelectionCard";

function PublicPage() {
  return (
    <div>
      <Header />
      <div>
        <img> this is the logo </img>
        <h1> This is the title </h1>
      </div>

      <SelectionCard />
    </div>
  );
}

export default PublicPage;
