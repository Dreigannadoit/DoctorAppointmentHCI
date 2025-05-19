import React, { useEffect, useState } from "react";
import "../../../styles/PatientDashboard.css";
import PatientWrapper from "../../../components/app/PatientWrapper";
import { Banner_Full, bell, doctor_1, doctor_4 } from "../../../assets";
import TopBar from "../../../components/app/TopBar";
import { getBusinessStatus } from "../../../utils/getBusinessStatus";
import useAppointmentCountdown from "../../../hooks/useAppointmentCountdown";

const PatientDashboard = () => {

  return (
    <PatientWrapper>
      <section className="patient_window">
        <TopBar currentPage={"Patient Dashboard"} />

        <br />

        <div className="s_1">
          <GreetingBlock />
          <AppointmentInfo />
        </div>

        <div className="s2">
          {/* add other information here */}
        </div>
      </section>
    </PatientWrapper>
  );
};

const GreetingBlock = () => {
  const { isOpen, statusMessage } = getBusinessStatus();
  const {
    currentDateTime,
    timeLeft,
    formattedDate,
    formattedTime,
    appointmentDate
  } = useAppointmentCountdown("June 12 2025 13:30:00");


  return (
    <div className="basic_info">
      <div className="greeting_block">
        <div className="greeting_block_content">
          <div className="text">
            <div className="info">
              <div className={`open_status ${isOpen ? "open" : "closed"}`}>
                <p>{statusMessage}</p>
              </div>
            </div>

            <div>
              <p>{formattedDate} at {formattedTime}</p>
              <h1>Welcome Back User!</h1>
            </div>
          </div>

          <div className="banenr">
            <img src={Banner_Full} alt="Banner" />
          </div>
        </div>
      </div>

      <div className="countdown">
        <p>Your Next Appointment is in: <b>
          {appointmentDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </b></p>
        <p className="appointment-date">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </p>
      </div>
    </div>
  );
};

const AppointmentInfo = () => {
  const {
    appointmentDate
  } = useAppointmentCountdown("June 12 2025 13:30:00");

  return (
    <div className="doctor_info_block">
      <p>Upcoming Appointment</p>
      <img src={doctor_4} alt="" />
      <div className="content">
        <p>Doctor: <b>Dr. Lauren Mitchell</b></p>
        <p>Visit Date: <b>{appointmentDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })}
        </b></p>
        <p>Visti ID: <b>04-05-2025-0925-AB</b></p>
        <p>Purpose: <br /><b>Removal of Widom Tooth</b></p>
      </div>
    </div>
  );
}

export default PatientDashboard;
