import React, { useState, useEffect} from 'react'
import './WorkoutDisplayComponent.css'
import customFetch from '../../Utils/customFetch'
import { useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners'
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import RelatedVideosComponent  from '../RelatedVideosComponent/RelatedVideosComponent'


export const loader = async () => {
  try {
    const { data } = await customFetch.get('/routines/allroutines');
    return data;
  }catch (error) {
    console.log(error)

  }
}

const WorkoutDisplayComponent = () => {

    const {workoutId} = useParams()
    const [exercise, set_Exercise] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const[showList, setShowList] = useState(false)
    const routine = useLoaderData();
    const toggleList = () => {
      setShowList(!showList)
    }

    // Solicitud de un Ejercicio
    
    useEffect(() => {
      const fetchWorkout = async () => {
        try {
          const { data } = await customFetch.get(`/exercises/${workoutId}`);
          set_Exercise(data.exercise);

        } catch (error) {
            console.log(error)
        } finally {
          setIsLoading(false); 
        }
      };
  
      fetchWorkout();
    }, []);

    if (isLoading) {
        return <div><CircleLoader size={150} color="#0099ff" /></div>;
      }
    
      if (!exercise) {
        return <div>Workout not found</div>;
      }

  // Agregar ejercicio a rutina

  const addToRoutine = async (routineId) => {
    try {
      const response = await customFetch.post('routines/addExercise', {
        routineId: routineId,
        exerciseId: workoutId
      });
      toast.success('Workout Added')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error;
    }
  }
    

    const imageUrl = `http://localhost:5101/${exercise.image.replace("public\\uploads\\", "")}`; // Solucion temporal


  return (

    <div className="main-background">
      <div className="main-background-left">
        <div className="workout-image">
          <img src={imageUrl} alt="workout-image" />
        </div>
        <div className="workout-name">
          <h1>{exercise.name}</h1>
          <button>Agregar a una rutina</button>
        </div>
        <div className="workout-description">
          <h3>Descripcion</h3>
          <p>{exercise.description}</p>
        </div>
        <div className="workout-musclegroup">
            <h3>Grupo muscular</h3>
            <div className="musclegroup-mini">
             <p>{exercise.muscleGroup}</p>
            </div>
        </div>
        <div className="workout-rank">
          <h3>Calificacion</h3>
          <div className="rank-mini">
            <p>9.5</p>
          </div>
        </div>
      </div>
      <div className="main-backgorund-right">
        <div className="workout-video-header">
          <h1>Videos relacionados</h1>
          <div className="workout-video">
            <RelatedVideosComponent exerciseName={exercise.name}/>
          </div>
        </div>
      </div>
    </div>

  )
}

export default WorkoutDisplayComponent