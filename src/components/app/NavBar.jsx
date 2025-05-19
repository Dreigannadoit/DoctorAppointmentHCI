import React from 'react'
import { Calendar, Dashboard, Dental_Codes, Eligibility, logo_sidebar, Patients, profile, Reports } from '../../assets'
import { Link } from 'react-router-dom'

const NavBar = () => {
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
            Schedule
          </Link>
        </li>
        <li >
          <Link to="/patient_doctor">
            <img src={Patients} alt="" />
            <p>Doctors</p></Link>
        </li>
        <li>
          <Link>
            <img src={Reports} alt="" />
            <p>Records</p></Link>
        </li>
      </ul>

      <img src={profile} alt="" />
    </div>
  )
}

export default NavBar