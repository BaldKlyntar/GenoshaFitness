import React,  {useState, useEffect} from 'react'
import { Form, redirect, useNavigation, Link} from 'react-router-dom'
import './RecipeListComponent.css'
import { IoIosCreate } from "react-icons/io";
import { PiBarbellLight } from "react-icons/pi";
import { toast } from 'react-toastify';
import customFetch from '../../Utils/customFetch';
import { LiaTrashAltSolid } from "react-icons/lia";


export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/recipes/addrecipe', data);
      toast.success('Recipe Created');
      return redirect('/home/recipe-list');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
};


const RecipeListComponent = () => {

    const [showPopup, setShowPopup] = useState(false)
    const togglePopup = () =>{
      setShowPopup(!showPopup)
  
    }

    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

  const [all_recipes, setAll_Recipe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllRecipe = async () => {
    try {
      const { data } = await customFetch.get('/recipes/allrecipes');
      setAll_Recipe(data.recipes);

    } catch (error) {
        console.log(error)
    } finally {
      setIsLoading(false); 
    }
  };


  useEffect(() => {
    fetchAllRecipe();
  }, []);

  useEffect(() => {
    if (!isSubmitting && navigation.state === 'idle') {
      fetchAllRecipe();
    }
  }, [isSubmitting, navigation.state]);


    const removeRecipe = async (recipeId) => {
      try {
        await customFetch.delete(`/recipes/${recipeId}`)
        toast.success('Receta Eliminada')
      } catch(error) {
          toast.error(error?.response?.data?.msg);
          return error
  
      }
    }
  

  return (
    <div className="recipe-list">

          <div className="recipe-list-container">
            {all_recipes.map((recipes, index)=>{
              return <><div className="recipe-link"><Link to={`/home/recipe/${recipes._id}`} style={{textDecoration: 'none', color: 'black'}}><div key={index} className="recipe-list-format">
                <div className="recipe-list-format-text">
                  <h1>{recipes.name}</h1>
                  <p>{recipes.Id}</p>
                </div>
                <div className="recipe-list-format-logo">
                  <PiBarbellLight size={50} color='0099ff'/>
                </div>
              </div>
              </Link>
                <div className="recipe-delete-btn">
                  <button onClick={() => {removeRecipe(recipes._id)}}><LiaTrashAltSolid size={50}/></button>
                </div>
              </div>
              </>
            })}
          </div>
        <div className="recipe-add" onClick={togglePopup}>
            <IoIosCreate size={75} color='0099ff'/>
        </div>
        <div className={showPopup ?
        'recipe-popup show-popup':'recipe-popup'}>
            <div className="popup-content">
                <Form method= 'post'>
                    <div className="popup-logo">
                        <PiBarbellLight size={50} color='0099ff'/>
                    </div>
                    <div className="popup-field">
                        <p>Nombre de la Receta</p>
                        <input type="text" name='name' required />
                    </div>
                      <button type='submit'  disabled = {isSubmitting} className="popup-accept" >
                          {isSubmitting ? 'Creando Receta...' : 'CREAR'}
                      </button>
                </Form>
                <button onClick={togglePopup} className="popup-accept">CANCELAR</button>
            </div>
        </div>
    </div>
  )
}

export default RecipeListComponent