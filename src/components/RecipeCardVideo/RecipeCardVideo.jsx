function RecipeCardVideo(props) {
  console.log(props);
  const { youtube_link } = props.selectedRecipe;

  const extractVideoId = (url) => {
    const regex = /v=([^&]+)/;
    const match = url.match(regex);

    return match ? match[1] : null;
  };

  const url = extractVideoId(youtube_link);

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${url}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default RecipeCardVideo;
