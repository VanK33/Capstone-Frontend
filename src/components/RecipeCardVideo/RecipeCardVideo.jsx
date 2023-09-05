import "./RecipeCardVideo.scss";
import { Button } from "@mui/material";
function RecipeCardVideo(props) {
  // console.log(props);
  const { youtube_link } = props.selectedRecipe;

  const extractVideoId = (url) => {
    const regex = /v=([^&]+)/;
    const match = url.match(regex);

    return match ? match[1] : null;
  };

  const url = extractVideoId(youtube_link);

  return (
    <div className="card-video">
      <h2 className="card-video__title"> Video Instruction </h2>
      <div className="card-video__details">
        <div className="card-video__frame-container">
          <iframe
            src={`https://www.youtube.com/embed/${url}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="card-video__frame"
          ></iframe>
        </div>

        <div className="card-video__button-container">
          <Button variant="outlined" onClick={props.closePublicModal}>
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCardVideo;
