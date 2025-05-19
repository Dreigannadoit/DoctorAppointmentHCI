import React from 'react'
import { Calendar, Dashboard, Dental_Codes, Eligibility, exit_icon, logo_sidebar, Patients, profile, Reports } from '../../assets'
import { Link } from 'react-router-dom'

const NavBar = ({handleExitClick}) => {
  return (
    <div className='software_navbar'>
      <div className="logo">
        <img src={logo_sidebar} alt="" />
      </div>

      <ul>
        <li>
          <Link to="/patient_dashboard">
            <img src={Dashboard} alt="" />
            <p>Dashboard</p>
          </Link>
        </li>
        <li>
          <Link to="/patient_calendar">
            <img src={Calendar} alt="" />
            <p>Schedule</p>
          </Link>
        </li>
        <li >
          <Link to="/patient_doctor">
            <img src={Patients} alt="" />
            <p>Doctors</p>
          </Link>
        </li>
        <li>
          <button onClick={handleExitClick}>
            <img src={exit_icon} alt="" />
            <p>Exit</p>
          </button>
        </li>
        {/* <li>
          <Link>
            <img src={Reports} alt="" />
            <p>Records</p></Link>
        </li> */}
      </ul>

      <img src={profile} alt="" />
    </div>
  )
}

export default NavBar