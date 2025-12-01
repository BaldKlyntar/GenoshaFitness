import React, {useState} from 'react'
import './RecipeCollections.css'
import {useParams} from 'react-router-dom'
import customFetch from '../../Utils/customFetch';
import { useNavigate } from 'react-router-dom';

const RecipeCollections = (props) => {

  const {recipeId} = useParams()
  const navigate = useNavigate();



  const removeFood = async (foodId) => {
    try {
      const response = await customFetch.post(`recipes/removeFood/${recipeId}`, {
        foodId: foodId,
        
      });
      navigate(0)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };





  return (
    <div className="recipe-collection">

    <div className="recipecollection-right">
      <div className="recipecollection-name">
        <h3>{props.name}</h3>
      </div>
        <div className="ingredient-data">
        <div className="ingredient-total">
          <div className="ingredient-total-row">
            <div className="ingredient-macro">
              <h3>{props.calories}</h3>
              <p>Calorias</p>
            </div>
            <div className="ingredient-macro">
              <h3>{props.protein} g</h3>
              <p>Proteinas</p>
            </div>
          </div>
          <div className="ingredient-total-row">
            <div className="ingredient-macro">
                <h3>{props.carbs} g</h3>
                <p>Carbohidratos</p>
            </div>
            <div className="ingredient-macro">
              <h3>{props.fats} g</h3>
              <p>Grasas</p>
            </div>
          </div>
      </div>
        </div>
        <div className="recipecollection-options">
            <button>Porcion</button>
            <button onClick={() => removeFood(props.id)}>Remover</button>
        </div>
    </div>
</div>
  )
}

export default RecipeCollections