import React from 'react'
import './Container.css'
import { Link } from 'react-router-dom'
import { PiBarbellLight } from "react-icons/pi";

const Container = (props) => {

  const imageUrl = `http://localhost:5101/${props.image.replace("public\\uploads\\", "")}`; // Solucion temporal
  console.log(props.muscle)

  return (
    <Link to={`/home/workout/${props.id}`}  style={{textDecoration: 'none', color: 'black'}}>
        <div className="container">
            <div className="container-left">
                <img onClick={window.scrollTo(0, 0)} src={imageUrl} alt="" />
            </div>
            <div className="container-right">
                <h1>{props.name}</h1>
                <h3>{props.muscle}</h3>
            </div>
            <div className="container-corner">
                <PiBarbellLight size={50} color='#0099ff'/>
            </div>
        </div>
    </Link>
  )
}

export default Container