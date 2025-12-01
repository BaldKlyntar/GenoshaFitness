import React from 'react'
import './AllFoodComponent.css'
import customFetch from '../../Utils/customFetch';
import { useLoaderData, Link } from 'react-router-dom';
import { toast } from 'react-toastify';


export const loader = async () => {
    try {

        const { data } = await customFetch.get('/food/allfood');
        return data.foods;
        
        
    } catch (error) {
        console.log(error)
        return redirect('/')
        
    }
}

const AllFoodComponent = () => {

    const deleteFood = async (foodId) => {
        try {

            await customFetch.delete(`/food/${foodId}`);
            toast.success('Alimento eliminado');
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            return error;
            
        }
    }

    const all_food = useLoaderData()
  return (
    <div className="all-food-component">
    <h1>Lista de alimentos</h1>
    <div className="listfood-format-main">
      <p>Alimentos</p>
      <p>Nombre</p>
    </div>
    <div className="listfood-allfoods">
      <hr />
      {all_food.map((food, index)=>{
        return <><div key={index} className="listfood-format-main listfood-format">
          <img src={`http://localhost:5101/${food.image.replace("public\\uploads\\", "")}`} alt="" className="listfood-food-icon" />
          <p>{food.name}</p>
          <div className="listfood-allfoods-btn">
            <button onClick={() => {deleteFood(food._id)}} >Eliminar</button>
          </div>
        </div>
        <hr />
        </>
      })}
    </div>
    </div>
  )
}

export default AllFoodComponent