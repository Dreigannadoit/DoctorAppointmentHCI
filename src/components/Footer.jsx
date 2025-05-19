import React from 'react'
import { logo_light } from '../assets'
import { Link } from 'react-router-dom'

const Footer = ({addClassCondition = ""}) => {
  return (
    <div className={`footer ${addClassCondition}`}>
      <Link to="/"><img src={logo_light} alt="" /></Link>
      <p>Smart Appointment Scheduler for Community (Dental) Clinics</p>
      <p>A PROJECT WE MADE || ALL RIGHTS RESERVED 2025</p>
    </div>
  )
}

export default Footer