import React from 'react';
import { getBusinessStatus } from '../../utils/getBusinessStatus';

const OpenStatus = () => {
  const { isOpen, statusMessage, hoursDescription } = getBusinessStatus();

  return (
    <>
      <div className="working_hours">
        <h3>WORKING HOURS</h3>
        <div>
          <p>{hoursDescription.weekdays.split(':')[0]}</p>
          <p>{hoursDescription.weekdays.split(':')[1]}</p>
        </div>
        <div>
          <p>{hoursDescription.weekends.split(':')[0]}</p>
          <p>{hoursDescription.weekends.split(':')[1]}</p>
        </div>
      </div>

      <div className={`open_status ${isOpen ? 'open' : 'closed'}`}>
        <p>{statusMessage}</p>
      </div>
    </>
  );
};

export default OpenStatus;