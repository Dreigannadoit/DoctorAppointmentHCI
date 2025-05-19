import React, { useState } from 'react'
import "../../styles/PatientInformation.css"
import DropdownField from '../../components/DropdownField'
import { logo } from '../../assets';
import { AnimatePresence } from 'framer-motion';
import PatientConsentPopUp from '../../components/app/PatientConsentPopUp';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

const PatientInformation = () => {
  const [openSubmit, setOpenSubmit] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setOpenSubmit(!openSubmit);

  const goToPatientDashBoard = () =>{
    navigate("/patient_dashboard")
  }

  return (
    <>
      <AnimatePresence>
        {openSubmit && (
          <PatientConsentPopUp toggleDropdown={toggleDropdown} navigateTo={goToPatientDashBoard} />
        )}
      </AnimatePresence>

      <div className='PatientInformation_wrapper'>
        <section className='PatientInformation'>
          <div className="tag">
            <p>Patient Information Form</p>
          </div>

          <br />

          <h1>Patient Information Form</h1>
          <p>Just a few quick details before we brighten your smile.</p>

          <br />

          <form action="">
            <GeneralInformationForm />
            <br />
            <MedicalHistoryForm />
            <br />
            <InsuranceInfo />

            <br />
            <button onClick={(e) => {
              e.preventDefault();
              toggleDropdown();
            }}>
              Submit
            </button>
          </form>

        </section>
      </div>

      <Footer />
    </>
  )
}

const GeneralInformationForm = () => {
  return (
    <div className='GeneralInformationForm'>
      <div className="name">
        <label>
          Username
        </label>
        <input type="text" />
      </div>

      <div className="first_name">
        <label>
          First Name
        </label>
        <input type="text" />
      </div>

      <div className="middle_initial">
        <label>
          Middle Initial
        </label>
        <input type="text" />
      </div>

      <div className="last_name">
        <label>
          Last Name
        </label>
        <input type="text" />
      </div>

      <div className="dob">
        <label>
          Date Of Birth
        </label>
        <input type="date" />
      </div>

      <div className="email">
        <label>
          Email
        </label>
        <input type="email" />
      </div>

      <div className="phone">
        <label>
          Phone Number
        </label>
        <input type="phone" />
      </div>

      <div className="gender">
        <label>
          Gender
        </label>
        <select>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className="address">
        <label>
          Address
        </label>
        <input type="text" />
      </div>
    </div>
  );
}

const allergiesList = [
  { value: 'none', label: 'None' },
  { value: 'colophonium', label: 'Colophonium' },
  { value: 'latex', label: 'Latex' },
  { value: 'tree_nuts', label: 'Tree Nuts' },
  { value: 'resins', label: 'Resins' },
  { value: 'food', label: 'Food' },
  { value: 'artificial_flavoring', label: 'Artificial Flavoring' },
  { value: 'red_dye', label: 'Red Dye' },
];

export const illnessList = [
  { value: 'None', label: 'None' },
  { value: 'ADD/ADHD', label: 'ADD/ADHD' },
  { value: 'Diabetes', label: 'Diabetes' },
  { value: 'Epilepsy/Seizure', label: 'Epilepsy/Seizure' },
  { value: 'Heart Murmur', label: 'Heart Murmur' },
  { value: 'Plavix (chopidogerel)', label: 'Plavix (chopidogerel)' },
  { value: 'Blood Disorder / Hemophilia', label: 'Blood Disorder / Hemophilia' },
  { value: 'Congenital Heart Disease/Defect', label: 'Congenital Heart Disease/Defect' },
  { value: 'Heart Atteck/Heart Failure', label: 'Heart Atteck/Heart Failure' },
  { value: 'Artificial Heart Valve', label: 'Artificial Heart Valve' },
  { value: 'Tuberculosis', label: 'Tuberculosis' },
  { value: 'Hepatitis/Liver Disease', label: 'Hepatitis/Liver Disease' },
  { value: 'Biophosphonate Thearapy (Oral or IV)', label: 'Biophosphonate Thearapy (Oral or IV)' },
  { value: 'Heart Atteck/Heart Failure', label: 'Heart Atteck/Heart Failure' },
  { value: 'Costisone - Corticosteroid Thearapy', label: 'Costisone - Corticosteroid Thearapy' },
  { value: 'Systemic Lupus Erythematosus', label: 'Systemic Lupus Erythematosus' },
];

const MedicalHistoryForm = () => {
  ;
  return (
    <div className="MedicalHistoryForm">
      <h3>Medical History</h3>
      <div className="allergies">
        <label>Allergies</label>
        <DropdownField label={"Allergy"} listItems={allergiesList} inputFieldText={'Select allergies'} />
      </div>

      <div className="illness">
        <label>Illnesses</label>
        <DropdownField label={"Illnesses"} listItems={illnessList} inputFieldText={'Select illness'} />
      </div>
    </div>
  );
};


const InsuranceInfo = () => {
  const [hasInsurance, setHasInsurance] = useState('');
  const [providerName, setProviderName] = useState('');
  const [memberNumber, setMemberNumber] = useState('');

  const handleInsuranceChange = (e) => {
    setHasInsurance(e.target.value);
  };

  return (
    <div className="InsuranceInfo">
      <h3>Insurance Information (Optional)</h3>

      <div className="check">
        <div className="checkIfInsurance">
          <label>Do you have dental insurance?</label>
          <div className="radio_group">
            <label>
              <input
                type="radio"
                name="hasInsurance"
                value="Yes"
                checked={hasInsurance === 'Yes'}
                onChange={handleInsuranceChange}
              />
              <span>Yes</span>
            </label>

            <label>
              <input
                type="radio"
                name="hasInsurance"
                value="No"
                checked={hasInsurance === 'No'}
                onChange={handleInsuranceChange}
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {hasInsurance === 'Yes' && (
          <>
            <div className="insurance_name">
              <label>Insurance Provider Name</label>
              <input
                type="text"
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
              />
            </div>

            <div className="insurance_num">
              <label>Insurance ID / Member Number</label>
              <input
                type="text"
                value={memberNumber}
                onChange={(e) => setMemberNumber(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};


export default PatientInformation