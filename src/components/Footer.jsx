import React from 'react'
import { logo_light } from '../assets'
import { Link } from 'react-router-dom'

const Footer = ({addClassCondition = ""}) => {
  return (
    <div className={`footer ${addClassCondition}`}>
      <Link to="/"><img src={logo_light} alt="" /></Link>
      <p>Demo Dentist Booking App Frontend</p>
      <p>A DreiAbmab Project || ALL RIGHTS RESERVED 2025</p>
    </div>
  )
}

export default Footer