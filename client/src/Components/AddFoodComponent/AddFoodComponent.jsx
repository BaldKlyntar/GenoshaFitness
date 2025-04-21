import React from 'react'
import './AddFoodComponent.css'
import { PiBarbellLight } from "react-icons/pi";
import customFetch from '../../Utils/customFetch';
import { toast } from 'react-toastify'
import { Form, redirect, useNavigation } from 'react-router-dom'

export const action = async ({ request }) => {
    const formData = await request.formData();
  
  
    try {
      await customFetch.post('/food/addfood', formData);
      toast.success('Food Added');
      return redirect('/home/admin/add-food');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
};

const AddFoodComponent = () => {

    const navigation = useNavigation()
    console.log(navigation);
    const isSubmitting = navigation.state === 'submitting'

  return (
    <Form method= 'post' className="admin-add-food-container" encType='multipart/form-data'>
        <div className="admin-add-food-logo">
            <PiBarbellLight size={75} color='#0099ff'/>
        </div>
        <div className="admin-add-food-data">
            <div className="admin-add-food-data-container">
                <div className="admin-add-food-itemfield">
                    <p>Nombre</p>
                    <input type="text" name='name' />
                </div>
                <div className="admin-add-food-itemfield">
                    <p>Tamaño de la porcion (g)</p>
                    <input type="number" name='portionSize' />
                </div>
            </div>
            <div className="admin-add-food-data-container">
                <div className="admin-add-food-itemfield">
                    <p>Calorias</p>
                    <input type="number" name='calories' />
                </div>
                <div className="admin-add-food-itemfield">
                    <p>Proteinas</p>
                    <input type="number" name='protein' />
                </div>
            </div>
            <div className="admin-add-food-data-container">
                <div className="admin-add-food-itemfield">
                    <p>Grasa</p>
                    <input type="number" name='fats' />
                </div>
                <div className="admin-add-food-itemfield">
                    <p>Carbohidratos</p>
                    <input type="number" name='carbs' step= ".01" />
                </div>
            </div>
            <div className="admin-add-food-data-container">
                <div className="admin-add-food-itemfield">
                    <p>Grasas saturadas</p>
                    <input type="number" name='saturatedFat' step=".01" />
                </div>
                <div className="admin-add-food-itemfield">
                    <p>Grasas trans</p>
                    <input type="number" name='transFat' step=".01" />
                </div>
            </div>
            <div className="admin-add-food-data-container">
                <div className="admin-add-food-itemfield">
                    <p>Azucares</p>
                    <input type="number" name='sugars' step=".01" />
                </div>
                <div className="admin-add-food-itemfield">
                    <p>Sodio</p>
                    <input type="number" name='sodium' step=".01" />
                </div>
            </div>
            <div className="admin-add-food-data-container">
                <div className="admin-add-food-itemfield">
                    <p>Colesterol</p>
                    <input type="number" name='cholesterol' step=".01" />
                </div>
                <div className="admin-add-food-itemfield">
                    <p>Fibra dietetica</p>
                    <input type="number" name='dietaryFiber' step=".01" />
                </div>
            </div>
        </div>
        <div className="admin-add-food-image">
            <label htmlFor="image">
                <div className="area">
                <p>Imagen</p>
                <input  type="file" name='image' id='image' accept= 'image/*'/>
                </div>
            </label>
        </div>
        <div className="admin-add-food-button">
            <button type= 'submit' disabled = {isSubmitting}>{isSubmitting ? 'Agregando Producto...' : 'AGREGAR'}</button>
        </div>
    </Form>
  )
}

export default AddFoodComponent