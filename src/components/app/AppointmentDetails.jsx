import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { logo } from '../../assets';
import generateTrackingId from '../../utils/generateTrackingId';

const AppointmentDetails = ({ exitMethod, dateSelected, timeSelected }) => {
    const date = new Date();
    const showTime = 
        date.getDay() 
        + '/' + date.getMonth() 
        + '/' + date.getFullYear() 
        + ', ' + date.getHours() 
        + ':' + date.getMinutes() 
        + ":" + date.getSeconds();

    return (
        <AnimatePresence>
            <motion.div
                className='AppointmentDetails_pop_up_overlay'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="pop_up"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ 
                        type: 'spring', 
                        stiffness: 300, 
                        damping: 30,
                        duration: 0.5
                    }}
                >
                    <div>
                        <img src={logo} alt="" />
                        <br />
                        <br />
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Appointment Details
                        </motion.h1>
                        <br />
                        <motion.hr
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: 0.3 }}
                        />
                        <br />
                        <motion.div
                            className='AppointmentDetails_pop_up_overlay_content'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <p><strong>Patient Name: </strong> <span>John Doe</span> </p>
                            <p><strong>Appointment Location: </strong> <span>8WJP+7R9, A. S. Fortuna St, Mandaue City, 6014 Cebu</span> </p>
                            <p><strong>Date Booked </strong> <span>{showTime}</span> </p>
                            <p><strong>Doctor:</strong> <span>Dr. Shaboinky</span></p>
                            <p><strong>Reason for Visit:</strong> <span>Tooth Pain</span> </p>
                            <p><strong>Appointment Date:</strong> <span>{dateSelected}</span> </p>
                            <p><strong>Time:</strong> <span>{timeSelected}</span> </p>
                            <p><strong>Appointment Tracking ID:</strong> <span>{generateTrackingId()}</span> </p>
                        </motion.div>
                        <motion.div
                            className="button_container"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <a target='_blank' href="/DoctorAppointmentHCI/public/Details.png">
                                    Download Details
                                </a>
                            </motion.button>

                            <motion.button
                                onClick={exitMethod}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Back to Dashboard
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}



export default AppointmentDetails;