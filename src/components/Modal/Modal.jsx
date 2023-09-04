import "./Modal.scss";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecipeCardDetail from "../RecipeCardDetail/RecipeCardDetail";
import RecipeCardVideo from "../RecipeCardVideo/RecipeCardVideo";
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
  // console.log(props);
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
          <RecipeCardDetail selectedRecipe={props.selectedPublicRecipe} />
          <RecipeCardVideo selectedRecipe={props.selectedPublicRecipe} />
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
        <h2> {messageTitle} </h2>

        <p> {messageBody} </p>

        <div>
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
      <div className="editModal" onClick={(e) => e.stopPropagation()}>
        <h2>Add Recipe</h2>
        <form onSubmit={handleSubmit(PostButtonCloseModal)}>
          <input
            {...register("recipeName", { required: true })}
            placeholder="Recipe Name"
          />
          <input
            {...register("youtubeLink", { required: true })}
            placeholder="YouTube Link"
          />
          <input
            {...register("secondaryLink")}
            placeholder="Secondary Link (optional)"
          />
          <Controller
            name="ingredients"
            control={control}
            render={({ field }) => (
              <Creatable
                {...field}
                options={ingredientOptions}
                isMulti
                placeholder="Ingredient"
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
          <Button variant="contained" onClick={() => setSteps([...steps, ""])}>
            Add a step
          </Button>
          <Controller
            name="meat"
            control={control}
            render={({ field }) => (
              <Creatable
                {...field}
                options={meatOptions}
                placeholder="Meat Types"
                isClearable
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
              />
            )}
          />
          <div>
            <Button onClick={closeModal} variant="outlined">
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Modal;
