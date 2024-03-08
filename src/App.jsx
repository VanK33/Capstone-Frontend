import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import PublicPage from "./pages/PublicPage/PublicPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import UserPage from "./pages/UserPage/UserPage";
import { useState, useEffect } from "react";
import axios from "axios";

const URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_PORT;

function App() {
  const storedToken = sessionStorage.getItem("token");
  const [token, setToken] = useState(storedToken);
  const [currentUser, setCurrentUser] = useState();
  const [userDetails, setUserDetails] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState();
  const [recipeArray, setRecipeArray] = useState();
  const [isPublicModalOpen, setIsPublicModalOpen] = useState(false);
  const [selectedPublicRecipe, setSelectedPublicRecipe] = useState();

  const { id } = currentUser || {};
  useEffect(() => {
    fetchUserDetails(id);
  }, [id]);

  const handleLogIn = async (data, navigate) => {
    try {
      let response = await axios.post(`${URL}:${PORT}/auth/login`, {
        username: data.username,
        password: data.password,
      });

      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        setToken(response.data.token);
      } else {
        throw new Error("Token Set Failure");
      }

      try {
        fetchUserProfile(response.data.token);
        navigate("/public");
      } catch (error) {
        console.log("Error feteching user profile", error);
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(`${URL}:${PORT}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCurrentUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error.response);
      throw error;
    }
  };

  const fetchUserDetails = async (id) => {
    try {
      const response = await axios.get(`${URL}:${PORT}/user/${id}`);
      setUserDetails(response.data);
    } catch (error) {
      console.log("error fetching user with: ", error);
    }
  };

  const openDeleteModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsDeleteModalOpen(true);
  };
  const openEditModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsEditModalOpen(true);
  };
  const openPostModal = () => {
    setIsPostModalOpen(true);
  };
  const closeModal = () => {
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setIsPostModalOpen(false);
  };

  const deleteButtonCloseModal = async (recipeId) => {
    try {
      await axios.delete(`${URL}:${PORT}/${currentUser.id}/${recipeId}`);
      // console.log("this suppose to be the deleting command");
      await fetchUserDetails(currentUser.id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.log(
        "this error comes from deleteButtonCloseModal of UserRecipes.jsx",
        error
      );
    }
  };

  // editing section is NOT completed. Not to be used.
  const editButtonCloseModal = async (recipeId, data) => {
    try {
      // await axios.put(`${URL}:${PORT}/${currentUser.id}/${recipeId}`, data);
      console.log("this is suppose to be the editing command", data);
      await fetchUserDetails(currentUser.id);
      setIsEditModalOpen(false);
    } catch (error) {
      console.log(
        "this error comes from EditButtonCloseModal of UserRecipes.jsx",
        error
      );
    }
  };

  const PostButtonCloseModal = async (data) => {
    try {
      let link = `${URL}:${PORT}/user/${currentUser.id}`;
      // console.log("this is the link", link);

      const dataWithContributor = {
        ...data,
        contributor: currentUser.contributor_name,
      };

      // await axios.post(
      //   `${URL}:${PORT}/user/${currentUser.id}`,
      //   dataWithContributor
      // );
      console.log("this suppose to be the Post command", dataWithContributor);
      await fetchUserDetails(currentUser.id);
      // setIsPostModalOpen(false);
    } catch (error) {
      console.log(
        "this error comes from PostButtonCloseModal of UserRecipes.jsx",
        error
      );
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}:${PORT}/public`);
      setRecipeArray(response.data);
    } catch (error) {
      console.log("fetching data error: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRandomRecipe = async () => {
    try {
      const randomIndex = Math.floor(Math.random() * recipeArray.length);
      const randomRecipe = recipeArray[randomIndex];
      // console.log("test random recipe", randomRecipe);
      openPublicModal(randomRecipe);
    } catch (error) {
      console.log(
        "This is the error generated from handleRandomRecipe in App.jsx",
        error
      );
    }
  };

  const openPublicModal = (recipe) => {
    // console.log("test random recipe", recipe);
    setSelectedPublicRecipe(recipe);
    setIsPublicModalOpen(true);
  };

  const closePublicModal = () => {
    setIsPublicModalOpen(false);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/public" />} />
        <Route
          path="/public"
          element={
            <PublicPage
              token={token}
              currentUser={currentUser}
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
              handleRandomRecipe={handleRandomRecipe}
              recipeArray={recipeArray}
              closePublicModal={closePublicModal}
              openPublicModal={openPublicModal}
              selectedPublicRecipe={selectedPublicRecipe}
              isPublicModalOpen={isPublicModalOpen}
            />
          }
        />
        <Route
          path="/auth/registration"
          element={<AuthPage page={`registration`} />}
        />
        <Route
          path="/auth/login"
          element={<AuthPage page={`login`} handleLogIn={handleLogIn} />}
        />
        <Route
          path="/auth/:id/profile"
          element={
            <UserPage
              token={token}
              currentUser={currentUser}
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
              closePublicModal={closePublicModal}
              openPublicModal={openPublicModal}
              selectedPublicRecipe={selectedPublicRecipe}
              isPublicModalOpen={isPublicModalOpen}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
