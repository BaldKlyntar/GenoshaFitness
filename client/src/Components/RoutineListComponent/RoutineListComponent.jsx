import React, {useState, useEffect} from 'react'
import { Form, redirect, useNavigation, Link} from 'react-router-dom'
import './RoutineListComponent.css'
import { IoIosCreate } from "react-icons/io";
import { PiBarbellLight } from "react-icons/pi";
import { toast } from 'react-toastify';
import customFetch from '../../Utils/customFetch';
import { FaSlideshare } from "react-icons/fa";
import { LiaTrashAltSolid } from "react-icons/lia";

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

  
    try {
      await customFetch.post('/routines/addroutine', data);
      toast.success('Routine Created');
      return redirect('/home/routine-list');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
};



const RoutineListComponent = () => {

    const [showPopup, setShowPopup] = useState(false)
    const [showShare, setShowShare] = useState(false)
    const togglePopup = () =>{
      setShowPopup(!showPopup)
  
    }

    const toggleShare = () => {
      setShowShare(!showShare)

    }

    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

  const [all_routines, setAll_Routine] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllRoutine = async () => {
    try {
      const { data } = await customFetch.get('/routines/allroutines');
      setAll_Routine(data.routines);

    } catch (error) {
        console.log(error)
    } finally {
      setIsLoading(false); 
    }
  };



  useEffect(() => {
    fetchAllRoutine();
  }, []);

  useEffect(() => {
    if (!isSubmitting && navigation.state === 'idle') {
      fetchAllRoutine();
    }
  }, [isSubmitting, navigation.state]);

  const shareRoutine = async (event) => {
    event.preventDefault(); 
    const formShareData = new FormData(event.target);
    const routineId = formShareData.get('routineId'); 

    try {
        await customFetch.post('routines/shareRoutine', { routineId });
        toast.success('Routine Shared');
        fetchAllRoutine(); 
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }
};

  const removeRoutine = async (routineId) => {
    try {
      await customFetch.post(`/users/removeroutine/${routineId}`)
      toast.success('Rutina Eliminada')
    } catch(error) {
        toast.error(error?.response?.data?.msg);
        return error

    }
  }



  return (
    <div className="routine-list">

          <div className="routine-list-container">
            {all_routines.map((routines, index)=>{
              return <><div className="routine-link"><Link to={`/home/routine/${routines._id}`} style={{textDecoration: 'none', color: 'black'}}><div key={index} className="routine-list-format">
                <div className="routine-list-format-text">
                  <h1>{routines.name}</h1>
                  <p>{routines.Id}</p>
                </div>
                <div className="routine-list-format-logo">
                  <PiBarbellLight size={50} color='0099ff'/>
                </div>
              </div>
              </Link>
                <div className="routine-delete-btn">
                  <button onClick={() => {removeRoutine(routines._id)}}><LiaTrashAltSolid size={50}/></button>
                </div>
              </div>
              </>
            })}
            
          </div>
          
        <div className="routine-addshare">
          <div className="routine-add" onClick={togglePopup}>
              <IoIosCreate size={75} color='0099ff'/>
          </div>
          <div className="routine-share" onClick={toggleShare}>
              <FaSlideshare size={75} color= 'red'/>
          </div>
        </div>
        <div className={showPopup ?
        'routine-popup show-popup':'routine-popup'}>
            <div className="popup-content">
                <Form method= 'post'>
                    <div className="popup-logo">
                        <PiBarbellLight size={50} color='0099ff'/>
                    </div>
                    <div className="popup-field">
                        <p>Nombre de la Rutina</p>
                        <input type="text" name='name' required />
                    </div>
                      <button type='submit'  disabled = {isSubmitting} className="popup-accept" >
                          {isSubmitting ? 'Creando Rutina...' : 'CREAR'}
                      </button>
                </Form>
                <button onClick={togglePopup} className="popup-accept">CANCELAR</button>
            </div>
        </div>
        <div className={showShare ?
        'routine-sharepopup show-share':'routine-sharepopup'}>
            <div className="share-content">
                <Form method= 'post' onSubmit={shareRoutine}>
                    <div className="share-logo">
                        <PiBarbellLight size={50} color='red'/>
                    </div>
                    <div className="share-field">
                        <p>Obtener Rutina</p>
                        <input type="text" name='routineId' required />
                    </div>
                      <button type='submit'  disabled = {isSubmitting} className="share-accept" >
                          {isSubmitting ? 'Obteniendo Rutina...' : 'OBTENER'}
                      </button>
                </Form>
                <button onClick={toggleShare} className="share-accept">CANCELAR</button>
            </div>
        </div>
    </div>
  )
}

export default RoutineListComponent