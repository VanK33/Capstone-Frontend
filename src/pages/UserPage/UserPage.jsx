import Header from "../../components/Header/Header";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserRecipes from "../../components/UserRecipes/UserRecipes";
import axios from "axios";
import { useState, useEffect } from "react";

const URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_PORT;

function UserPage({ token, currentUser }) {
  console.log("currentUser", currentUser);
  const [userDetails, setUserDetails] = useState();

  const { id } = currentUser || {};
  useEffect(() => {
    fetchUserDetails(id);
  }, [id]);

  const fetchUserDetails = async (id) => {
    try {
      const response = await axios.get(`${URL}:${PORT}/user/${id}`);
      setUserDetails(response.data);
    } catch (error) {
      console.log("error fetching user with: ", error);
    }
  };

  return (
    userDetails && (
      <div>
        <Header token={token} currentUser={currentUser} />
        <div>
          <div> Welcome Back, {currentUser.contributor_name} </div>
          <UserProfile userDetails={userDetails} currentUser={currentUser} />
          <UserRecipes userDetails={userDetails} />
        </div>
      </div>
    )
  );
}

export default UserPage;
