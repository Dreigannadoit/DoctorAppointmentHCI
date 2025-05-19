import React from 'react'
import PatientWrapper from '../../../components/app/PatientWrapper'
import TopBar from '../../../components/app/TopBar'

const PatientDoctorSceduler = () => {
  return (
    <PatientWrapper>
      <section className='patient_window'>
        <TopBar currentPage={"Pick Your Doctor"} />

        <br />
        
      </section>
    </PatientWrapper>
  )
}

export default PatientDoctorSceduler