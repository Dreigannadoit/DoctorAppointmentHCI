import { Route, HashRouter as Router, Routes } from "react-router-dom"

import './styles/App.css'

import Hero from "./pages/website/Hero"
import Auth from "./pages/website/Auth"
import PatientInformation from "./pages/app/PatientInformation"
import DoctorDashboard from "./pages/app/doctor/DoctorDashboard"
import AdminDashboard from "./pages/app/admin/AdminDashBoard"
import { logo_light } from "./assets"
import Footer from "./components/Footer"
import PatientDashboard from "./pages/app/patient/PatientDashboard"
import DentalPrices from "./pages/website/DentalPrices"
import Contact from "./pages/website/Contact"
import PatientCalendar from "./pages/app/patient/PatientCalendar"
import PatientWrapper from "./components/app/PatientWrapper"
import PatientDoctorScheduler from "./pages/app/patient/PatientDoctorSceduler"
import PatientBookDoctor from "./pages/app/patient/PatientBookDoctor"

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Website */}
        <Route path="/" element={<Hero />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/prices" element={<DentalPrices />} />
        <Route path="/contact" element={<Contact />} />

        {/* Software */}
        <Route path="/patient_informtation" element={<PatientInformation />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/patient_dashboard" element={<PatientDashboard />} />
        <Route path="/patient_doctor" element={<PatientDoctorScheduler />} />
        <Route path="/patient_book_doctor" element={<PatientBookDoctor />} />
        <Route path="/patient_calendar" element={<PatientCalendar />} />
      </Routes>
    </Router>
  )
}

export default App