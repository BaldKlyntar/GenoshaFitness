import React from 'react'
import './Navbar.css'
import { HiMenuAlt1 } from "react-icons/hi"
import { PiBarbellLight } from "react-icons/pi";
import { useDashboardContext } from '../../Pages/DashboardLayout';

const Navbar = () => {
  const {toggleSideBar} = useDashboardContext()
  return (
    <div className="navbar">
        <div className="nav-center">
            <button className="toggle-btn" onClick={toggleSideBar}>
                <HiMenuAlt1 color='#0099ff'/>
            </button>
            <div>
                <div className="logo">
                  <PiBarbellLight size={100} color='#0099ff'/>
                </div>
            </div>
            <div className="btn-container">
              <button>User</button>
            </div>
        </div>
    </div>

  )
}

export default Navbar