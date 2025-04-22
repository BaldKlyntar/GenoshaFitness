import React from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import customFetch from '../../Utils/customFetch'
import './UserSettingsComponent.css'
import { GOAL_CATEGORY } from '../../../../Utils/Constants'
import { PAL_CATEGORY } from '../../../../Utils/Constants'

export const loader = async() => {
    try{
        const { data } = await customFetch.get('/users/profile');
        return data;
    }catch(error){
        console.log(error)
        return redirect('/')
    }
}



const UserSettingsComponent = () => {

    const { user } = useLoaderData();

    

  return (
    <div className="user-settings-background">
        <div className="user-settings-top">
            <h1>Informacion Personal</h1>
            <p>Aqui puedes actualizar la informacion de tu perfil</p>
        </div>
        <div className="user-settings-bottom">
            <Form method='patch'>
                <div className="first-row">
                    <div className="input-row">
                        <h4>Nombre</h4>
                        <input type="text" placeholder={user.name} />
                    </div>
                    <div className="input-row">
                        <h4>Apellido</h4>
                        <input type="text" placeholder={user.lastName} />
                    </div>
                    <div className="input-row">
                        <h4>Email</h4>
                        <input type="email" placeholder={user.email} />
                    </div>
                </div>
                <div className="second-row">
                <div className="input-row">
                        <h4>Peso (kg)</h4>
                        <input type="number" placeholder={user.height} />
                    </div>
                    <div className="input-row">
                        <h4>Altura (cm)</h4>
                        <input type="number" placeholder={user.weight} />
                    </div>
                </div>
                <div className="third-row">
                    <div className="select-row">
                    <h4>Tu objetivo actual es: <div className="marker">{user.goal}</div></h4>
                        <select   name="goal">
                            {Object.values(GOAL_CATEGORY).map((itemValue) => {
                            return(
                                <option key={itemValue} value= {itemValue}>
                                {itemValue}
                                </option>
                            );
                            })}
                        </select>
                    </div>
                    <div className="select-row">
                    <h4>Tu nivel de actividad fisica actual es: <div className="marker">{user.pal}</div></h4>
                        <select   name="pal" >
                            {Object.values(PAL_CATEGORY).map((itemValue) => {
                            return(
                                <option key={itemValue} value= {itemValue}>
                                {itemValue}
                                </option>
                            );
                            })}
                        </select>
                    </div>

                </div>
                <div className="button-row">
                    <button>ACTUALIZAR</button>
                </div>
            </Form>
        </div>
    </div>
  )
}

export default UserSettingsComponent