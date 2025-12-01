import React from 'react'
import './AddWorkoutComponent.css'
import { PiBarbellLight } from "react-icons/pi";
import customFetch from '../../Utils/customFetch';
import { toast } from 'react-toastify'
import { Form, redirect, useNavigation } from 'react-router-dom'
import { WORKOUT_DIFFICULTY } from '../../../../Utils/Constants';

export const action = async ({ request }) => {
    const formData = await request.formData();
  
  
    try {
      await customFetch.post('/exercises/addexercise', formData);
      toast.success('Workout Added');
      return redirect('/home/admin/add-workout');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
};

const AddWorkoutComponent = () => {

    const navigation = useNavigation()
    console.log(navigation);
    const isSubmitting = navigation.state === 'submitting'
  return (
    <Form method='post' className="admin-add-workout-container" encType='multipart/form-data'>
      <div className="admin-add-workout-logo">
          <PiBarbellLight size={75} color='#0099ff'/>
      </div>
      <div className="admin-add-workout-data">
          <div className="admin-add-workout-data-container">
              <div className="admin-add-workout-itemfield">
                  <p>Nombre</p>
                  <input type="text" name='name' />
              </div>
              <div className="admin-add-workout-itemfield">
                  <p>Grupo Muscular</p>
                  <input type="text" name='muscleGroup' />
              </div>
          </div>
          <div className="admin-add-workout-description">
            <p>Descripcion</p>
            <textarea type="text" name='description' />
          </div>
          <div className="admin-add-workout-difficulty">
            <p>Dificultad</p>
            <select   name="difficulty" >
                {Object.values(WORKOUT_DIFFICULTY).map((itemValue) => {
                return(
                    <option key={itemValue} value= {itemValue}>
                    {itemValue}
                    </option>
                );
                })}
            </select>
          </div>
      </div>
      <div className="admin-add-workout-image">
          <label htmlFor="image-workout">
              <div className="area-workout">
              <p>Imagen</p>
              <input  type="file" name='image' id='image-workout' accept= 'image/*'/>
              </div>
          </label>
      </div>
      <div className="admin-add-workout-button">
        <button type= 'submit' disabled = {isSubmitting}>{isSubmitting ? 'Adding Product...' : 'ADD'}</button>
      </div>
  </Form>
  )
}

export default AddWorkoutComponent