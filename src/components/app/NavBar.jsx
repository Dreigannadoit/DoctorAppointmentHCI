import React from 'react'
import { Calendar, Dashboard, Dental_Codes, Eligibility, logo_sidebar, Patients, profile } from '../../assets'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='software_navbar'>
      <div className="logo">
        <img src={logo_sidebar} alt="" />
      </div>

        <nav>
          <ul>
            <li>
              <Link>
                <img src={Dashboard} alt="" />
                <p>Dashboard</p>
              </Link>
            </li>
            <li>
              <Link>
                <img src={Patients} alt="" />
                <p>Doctors</p></Link>
            </li>
            <li>
              <Link>
                <img src={Calendar} alt="" />
                Schedule
              </Link>
            </li>
          </ul>
        </nav>

        <img src={profile} alt="" />
    </div>
  )
}

export default NavBar