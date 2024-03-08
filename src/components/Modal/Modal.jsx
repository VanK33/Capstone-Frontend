import "./Modal.scss";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecipeCardDetail from "../RecipeCardDetail/RecipeCardDetail";
import RecipeCardVideo from "../RecipeCardVideo/RecipeCardVideo";
import RecipeImageDetail from "../RecipeImageDetail/RecipeImageDetail";
import { Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Creatable from "react-select/creatable";
import {
  tasteOptions,
  meatOptions,
  ingredientOptions,
  originOptions,
} from "../../assets/otions/options";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Modal(props) {
  console.log("Elements currently displayed in the modal", props);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="modal-overlay" onClick={props.closePublicModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <Slider {...settings}>
          <RecipeImageDetail
            selectedRecipe={props.selectedPublicRecipe}
            closePublicModal={props.closePublicModal}
          />
          <RecipeCardDetail
            selectedRecipe={props.selectedPublicRecipe}
            closePublicModal={props.closePublicModal}
          />
          <RecipeCardVideo
            selectedRecipe={props.selectedPublicRecipe}
            closePublicModal={props.closePublicModal}
          />
        </Slider>
      </div>
    </div>
  );
}

export function DeleteModal({
  closeModal,
  selectedRecipe,
  deleteButtonCloseModal,
  messageTitle,
  messageBody,
}) {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="deleteModal" onClick={(e) => e.stopPropagation()}>
        <div className="deleteModal__card-info">
          <div className="deleteModal__message-body">
            <h2> {messageTitle} </h2>

            <p> {messageBody} </p>
          </div>

          <div className="deleteModal__buttons">
            <Button onClick={closeModal} variant="outlined">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => deleteButtonCloseModal(selectedRecipe)}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EditModal({
  selectedRecipe,
  closeModal,
  editButtonCloseModal,
}) {
  // console.log(selectedRecipe);

  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    setDefaultValues({
      ...selectedRecipe,
      ingredients: selectedRecipe.ingredients.map((ingredient) => ({
        value: ingredient.toLowerCase(),
        label: capitalizeFirstLetter(ingredient),
      })),
      meat: {
        value: selectedRecipe.meat.toLowerCase(),
        label: capitalizeFirstLetter(selectedRecipe.meat),
      },
      origins: selectedRecipe.origins.map((origin) => ({
        value: origin.toLowerCase(),
        label: capitalizeFirstLetter(origin),
      })),
      tastes: selectedRecipe.tastes.map((taste) => ({
        value: taste.toLowerCase(),
        label: capitalizeFirstLetter(taste),
      })),
    });
  }, [selectedRecipe]);

  const { register, handleSubmit, control } = useForm({
    defaultValues,
  });

  const [steps, setSteps] = useState(selectedRecipe.steps || [""]);

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="editModal" onClick={(e) => e.stopPropagation()}>
        <h2>Edit {selectedRecipe.recipe_name}</h2>
        <form onSubmit={handleSubmit(editButtonCloseModal)}>
          <Controller
            name="ingredients"
            control={control}
            render={({ field }) => (
              <Creatable
                {...field}
                options={ingredientOptions}
                isMulti
                placeholder="Ingredient"
                defaultValue={defaultValues.ingredients}
              />
            )}
          />
          {steps.map((step, index) => (
            <input
              key={index}
              {...register(`steps[${index}]`, { required: true })}
              defaultValue={step}
              placeholder={`Procedure ${index + 1}...`}
              aria-invalid={false}
            />
          ))}
          <button type="button" onClick={() => setSteps([...steps, ""])}>
            Add a step
          </button>
          <Controller
            name="meat"
            control={control}
            render={({ field }) => (
              <Creatable
                {...field}
                options={meatOptions}
                placeholder="Meat Types"
                isClearable
                defaultValue={defaultValues.meat}
              />
            )}
          />
          <Controller
            name="origin"
            control={control}
            render={({ field }) => (
              <Creatable
                {...field}
                options={originOptions}
                placeholder="Origins"
                isClearable
                defaultValue={defaultValues.control}
              />
            )}
          />
          <Controller
            name="taste"
            control={control}
            render={({ field }) => (
              <Creatable
                {...field}
                options={tasteOptions}
                isMulti
                placeholder="Tastes"
                defaultValue={defaultValues.taste}
              />
            )}
          />
          <button type="submit"> Save </button>
        </form>
      </div>
    </div>
  );
}

export function PostModal({ closeModal, PostButtonCloseModal }) {
  const { register, handleSubmit, control } = useForm();

  const [steps, setSteps] = useState([""]);

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="postModal" onClick={(e) => e.stopPropagation()}>
        <div className="postModal__card-info">
          <h2>Add Recipe</h2>
          <form
            onSubmit={handleSubmit(PostButtonCloseModal)}
            className="postModal__form"
            enctype="multipart/form-data"
          >
            <div className="postModal__inputs">
              <label htmlFor="recipeName">Recipe Name</label>
              <input
                {...register("recipeName", { required: true })}
                placeholder="Recipe Name"
                id="recipeName"
                className="postModal__input"
              />
            </div>
            <div className="postModal__inputs">
              <label htmlFor="youtubeLink">YouTube Link</label>
              <input
                {...register("youtubeLink", { required: true })}
                placeholder="YouTube Link"
                id="youtubeLink"
                className="postModal__input"
              />
            </div>
            <div className="postModal__inputs">
              <label htmlFor="secondaryLink">Secondary Link (optional)</label>
              <input
                {...register("secondaryLink")}
                placeholder="Secondary Link (optional)"
                id="secondaryLink"
                className="postModal__input"
              />
            </div>
            <div className="postModal__inputs">
              <label>Ingredients</label>
              <Controller
                name="ingredients"
                control={control}
                className="postModal__input"
                render={({ field }) => (
                  <Creatable
                    {...field}
                    options={ingredientOptions}
                    isMulti
                    placeholder="Ingredient"
                  />
                )}
              />
            </div>
            {steps.map((step, index) => (
              <div key={index} className="postModal__inputs">
                <label htmlFor={`steps[${index}]`}>Procedure {index + 1}</label>
                <input
                  {...register(`steps[${index}]`, { required: true })}
                  defaultValue={step}
                  placeholder={`Procedure ${index + 1}...`}
                  aria-invalid={false}
                  id={`steps[${index}]`}
                  className="postModal__input"
                />
              </div>
            ))}
            <div className="postModal__inputs">
              <Button
                variant="contained"
                onClick={() => setSteps([...steps, ""])}
              >
                Add a step
              </Button>
            </div>
            <div className="postModal__inputs">
              <label>Meat Types</label>
              <Controller
                name="meat"
                control={control}
                className="postModal__input"
                render={({ field }) => (
                  <Creatable
                    {...field}
                    options={meatOptions}
                    placeholder="Meat Types"
                    isClearable
                  />
                )}
              />
            </div>
            <div className="postModal__inputs">
              <label>Origins</label>
              <Controller
                name="origins"
                control={control}
                className="postModal__input"
                render={({ field }) => (
                  <Creatable
                    {...field}
                    options={originOptions}
                    placeholder="Origins"
                    isMulti
                    isClearable
                  />
                )}
              />
            </div>
            <div className="postModal__inputs">
              <label>Tastes</label>
              <Controller
                name="tastes"
                control={control}
                className="postModal__input"
                render={({ field }) => (
                  <Creatable
                    {...field}
                    options={tasteOptions}
                    isMulti
                    placeholder="Tastes"
                  />
                )}
              />
            </div>
            <div className="postModal__buttons">
              <input
                type="file"
                name="thumbnail"
                className="postModal__thumbnail-upload"
              />
              <div className="postModal__confirm-buttons">
                <Button
                  onClick={closeModal}
                  variant="outlined"
                  className="postModal__button"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  className="postModal__button"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Modal;
