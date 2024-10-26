import React, {useState, useEffect} from 'react'
import './FoodDisplayComponent.css'
import customFetch from '../../Utils/customFetch'
import { useLoaderData, useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners'
import { PiBarbellLight } from "react-icons/pi";
import { toast } from 'react-toastify';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/recipes/allrecipes');
    return data;
  }catch (error) {
    console.log(error)

  }
}

const FoodDisplayComponent = () => {

    const {foodId} = useParams()
    const [food, set_Food] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const[showList, setShowList] = useState(false)
    const recipe = useLoaderData()
    const toggleList = () => {
      setShowList(!showList)
    }

    
    useEffect(() => {
      const fetchFood = async () => {
        try {
          const { data } = await customFetch.get(`/food/${foodId}`);
          set_Food(data.food);

        } catch (error) {
            console.log(error)
        } finally {
          setIsLoading(false); 
        }
      };
  
      fetchFood();
    }, []);

    if (isLoading) {
        return <div><CircleLoader size={150} color="#0099ff" /></div>;
      }
    
      if (!food) {
        return <div>Food not found</div>;
      }


      const addToRecipe= async (recipeId) => {
        try {
          const response = await customFetch.post('recipes/addIngredient', {
            recipeId: recipeId,
            foodId: foodId
          });
          toast.success('Ingredient Added')
          toggleList()
        } catch (error) {
          toast.error(error?.response?.data?.msg)
          return error;
        }
      }
    

    const imageUrl = `http://localhost:5101/${food.image.replace("public\\uploads\\", "")}`; // Solucion temporal

  return (
    <div className="food-display-container">
        <div className="food-display-top">
            <div className="food-display-top-left">
                <img src={imageUrl} alt="" />
            </div>
            <div className="food-display-top-right">
                <h1>{food.name}</h1>
                <h3>Serving Size {food.portionSize} g</h3>
                <button onClick={toggleList}>Add to Recipe</button>
            </div>
        </div>
        <hr  className='calorie-division'/>
        <div className="food-display-bottom">
            <div className="food-display-values-container">
                <h1>Calories</h1>
                <h1>{food.calories}</h1>
            </div>
            <hr  className='macros-division'/>
            <div className="food-display-values-container">
                <h3>Protein</h3>
                <h3>{food.protein} g</h3>
            </div>
            <hr />
            <div className="food-display-values-container">
                <h3>Total Fat</h3>
                <h3>{food.fats} g</h3>
            </div>
            <hr />
            <div className="food-display-values-container">
                <h3>Total Carbohydrate</h3>
                <h3>{food.carbs} g</h3>
            </div>
            <hr  className='calorie-division'/>
        </div>
        <div className={showList?
      "recipes-list-display show-list":"recipes-list-display"}>
          {recipe.recipes.map((recipes, index)=>{
            return <><div key={index} className="recipe-list-display-format">
              <div className="recipe-list-display-format-text">
                <h1>{recipes.name}</h1>
                <p>{recipes.Id}</p>
                <PiBarbellLight size={50} color='0099ff'/>
              </div>
              <div className="recipe-display-add-button">
                <button onClick={() => addToRecipe(recipes._id)}>ADD</button>
              </div>
            </div>
            </>
          })}
          <div className="recipe-display-cancel-button">
            <button onClick={toggleList}>CANCEL</button>
          </div>
      </div>
    </div>
  )
}

export default FoodDisplayComponent