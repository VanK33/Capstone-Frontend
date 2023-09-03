import { Button } from "@mui/material";
function UserProfile({ userDetails, currentUser }) {
  console.log("UserDetails:", userDetails);
  if (!userDetails || !currentUser) {
    return <div>Loading...</div>;
  }
  const postCount = userDetails.length;
  return (
    <div>
      {/* 这一层是分割照片和其他信息的*/}
      <img src="" alt="This will be profile" />
      <div>
        {/* 这一层是分割UseName, like button 和contribution信息的*/}
        <div>
          <p> UserName: {currentUser.contributor_name} </p>

          <Button> Saved Recipe </Button>
        </div>

        <div>
          <p> Contributions </p>
          <div> Likes: 17 </div>
          {/* Likes的数量目前是hardcode进来的, 将来需要更改*/}
          <p> Posts: {postCount} </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
