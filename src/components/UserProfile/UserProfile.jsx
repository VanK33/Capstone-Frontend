import { Button } from "@mui/material";
import "./UserProfile.scss";
import tempoProfilePicture from "../../assets/logo/profile-picture-example.jpg";
function UserProfile({ userDetails, currentUser }) {
  console.log("UserDetails:", userDetails);
  if (!userDetails || !currentUser) {
    return <div>Loading...</div>;
  }
  const postCount = userDetails.length;
  return (
    <div className="user-profile">
      {/* 这一层是分割照片和其他信息的*/}
      <img
        src={tempoProfilePicture}
        alt="This will be profile"
        className="user-profile__picture"
      />
      <div className="user-profile__section">
        {/* 这一层是分割UseName, like button 和contribution信息的*/}
        <div className="user-profile__subsection">
          <div className="user-profile__individual">
            <p className="user-profile__subtitle"> UserName </p>
            <p> {currentUser.contributor_name} </p>
          </div>

          <Button variant="contained"> Saved Recipe </Button>
        </div>

        <div className="user-profile__individual">
          <p className="user-profile__subtitle"> Contributions </p>
          <p> Likes: 17 </p>
          {/* Likes的数量目前是hardcode进来的, 将来需要更改*/}
          <p> Posts: {postCount} </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
