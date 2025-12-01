import React from 'react'
import './AllWorkoutComponent.css'
import customFetch from '../../Utils/customFetch';
import { useLoaderData, Link } from 'react-router-dom';

export const loader = async () => {
    try {

        const { data } = await customFetch.get('/exercises/allexercises');
        return data.exercises;

    } catch (error) {
        console.log(error)
        return redirect('/')
        
    }
}

const AllWorkoutComponent = () => {

    const all_workout = useLoaderData();
    const deleteWorkout = async (workoutId) => {
    try {

        await customFetch.delete(`/exercises/${workoutId}`);
        toast.success('Ejercicio eliminado');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
        
    }
}


  return (
    <div className="all-workout-component">
    <h1>Lista de ejercicios</h1>
    <div className="listworkout-format-main">
      <p>Ejercicios</p>
      <p>Nombre</p>
    </div>
    <div className="listworkout-allworkouts">
      <hr />
      {all_workout.map((workout, index)=>{
        return <><div key={index} className="listworkout-format-main listworkout-format">
          <img src={`http://localhost:5101/${workout.image.replace("public\\uploads\\", "")}`} alt="" className="listworkout-workout-icon" />
          <p>{workout.name}</p>
          <div className="listworkout-allworkouts-btn">
            <button onClick={() => deleteWorkout(workout._id)}  >Eliminar</button>
          </div>
        </div>
        <hr />
        </>
      })}
    </div>
    </div>
  )
}

export default AllWorkoutComponent