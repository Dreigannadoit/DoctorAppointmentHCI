import React, { useEffect, useRef, useState } from 'react';
import PatientWrapper from '../../../components/app/PatientWrapper';
import TopBar from '../../../components/app/TopBar';

import { AnimatePresence, motion } from 'framer-motion';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import "../../../styles/PatientBookDoctor.css"
import timeToMinutes from '../../../utils/timeToMinutes';
import generateAvailableSlots from '../../../utils/generateAvailableSlots';
import businessHoursConfig from '../../../config/businessHoursConfig';
import { initialUnavailableEvents } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import AppointmentDetails from '../../../components/app/AppointmentDetails';

const PatientBookDoctor = () => {
    const navigate = useNavigate();
    const calendarRef = useRef(null);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedSlotDetails, setSelectedSlotDetails] = useState(null);
    const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
    const [finalDateSelected, setFinalDateSelected] = useState('');
    const [finalTimeSelected, setFinalTimeSelected] = useState('');

    useEffect(() => {
        const available = generateAvailableSlots(initialUnavailableEvents, 2024, 6);
        setCalendarEvents([...initialUnavailableEvents, ...available]);
    }, []);

    const openConfirmationPopup = (details) => {
        setSelectedSlotDetails(details);
        setIsPopupOpen(true);
        setFinalDateSelected(selectedSlotDetails.dateSelected);
        setFinalTimeSelected(selectedSlotDetails.timeSelected);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedSlotDetails(null);
        setFinalDateSelected(selectedSlotDetails.dateSelected);
        setFinalTimeSelected(selectedSlotDetails.timeSelected);
    };

    const handleConfirmBooking = () => {
        if (!selectedSlotDetails) return;

        const { rawStart, rawEnd, rawAllDay, isFromAvailableSlot, originalAvailableEventStartISO } = selectedSlotDetails;

        const newBooking = {
            title: 'Your Booking',
            start: rawStart,
            end: rawEnd,
            allDay: rawAllDay,
            className: 'event-user-booking',
        };

        setCalendarEvents(prevEvents => {
            let filteredEvents = prevEvents;
            if (isFromAvailableSlot && originalAvailableEventStartISO) {
                filteredEvents = filteredEvents.filter(event =>
                    !(event.extendedProps?.isAvailableSlot &&
                        new Date(event.start).toISOString() === originalAvailableEventStartISO)
                );
            } else if (!isFromAvailableSlot) {
                filteredEvents = filteredEvents.filter(event =>
                    !(event.extendedProps?.isAvailableSlot &&
                        new Date(event.start).getTime() === new Date(rawStart).getTime() &&
                        new Date(event.end).getTime() === new Date(rawEnd).getTime()
                    )
                );
            }
            return [...filteredEvents, newBooking];
        });
        
        setFinalDateSelected(selectedSlotDetails.dateSelected);
        setFinalTimeSelected(selectedSlotDetails.timeSelected);

        handleClosePopup();
        setShowAppointmentDetails(true);
    };

    const handleCloseAppointmentDetails = () => {
        setShowAppointmentDetails(false);
    };

    const handleDateSelect = (selectInfo) => {
        const calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();

        const startStr = selectInfo.start.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        const endStr = selectInfo.end.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        const dateStr = selectInfo.start.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        openConfirmationPopup({
            rawStart: selectInfo.start,
            rawEnd: selectInfo.end,
            rawAllDay: selectInfo.allDay,
            dateSelected: dateStr,
            timeSelected: `${startStr} - ${endStr}`,
            isFromAvailableSlot: false,
        });
    };

    const handleSelectAllow = (selectInfo) => {
        const { start, end } = selectInfo;
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            const allEvents = calendarApi.getEvents();
            for (const event of allEvents) {
                if (event.display === 'background' && event.extendedProps?.isUnavailable) {
                    if (event.daysOfWeek) {
                        const selectStartDate = new Date(start);
                        const selectEndDate = new Date(end);
                        if (event.daysOfWeek.includes(selectStartDate.getDay())) {
                            const blockStartTime = timeToMinutes(event.extendedProps.type === 'lunch' ? '12:00:00' : businessHoursConfig.startTime);
                            const blockEndTime = timeToMinutes(event.extendedProps.type === 'lunch' ? '13:00:00' : businessHoursConfig.endTime);

                            const selectionStartMinutes = selectStartDate.getHours() * 60 + selectStartDate.getMinutes();
                            const selectionEndMinutes = selectEndDate.getHours() * 60 + selectEndDate.getMinutes() === 0 ? 24 * 60 : selectEndDate.getHours() * 60 + selectEndDate.getMinutes();

                            if (selectionStartMinutes < blockEndTime && selectionEndMinutes > blockStartTime) {
                                return false;
                            }
                        }
                    } else if (event.start && event.end) {
                        if (start < new Date(event.end) && end > new Date(event.start)) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    };

    const handleEventClick = (clickInfo) => {
        const clickedEvent = clickInfo.event;

        if (clickedEvent.extendedProps && clickedEvent.extendedProps.isAvailableSlot) {
            const startStr = clickedEvent.start.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            const endStr = clickedEvent.end.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            const dateStr = clickedEvent.start.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

            openConfirmationPopup({
                rawStart: clickedEvent.start,
                rawEnd: clickedEvent.end,
                dateSelected: dateStr,
                timeSelected: `${startStr} - ${endStr}`,
                isFromAvailableSlot: true,
                originalAvailableEventStartISO: new Date(clickedEvent.start).toISOString(),
            });
        }
    };

    const returnToDashboard = () => {
        navigate("/patient_dashboard")
    }

    return (
        <PatientWrapper>
            <section className='patient_window PatientBookDoctor'>
                <TopBar currentPage={"Pick A Date & Time"} />

                <Calendar
                    handleDateSelect={handleDateSelect}
                    handleSelectAllow={handleSelectAllow}
                    handleEventClick={handleEventClick}
                    calendarEvents={calendarEvents}
                    calendarRef={calendarRef}
                />

                <PopUp
                    isOpen={isPopupOpen}
                    dateSelected={finalDateSelected}
                    timeSelected={finalTimeSelected}
                    onCancel={handleClosePopup}
                    onConfirm={handleConfirmBooking}
                />

                <AnimatePresence>
                    {showAppointmentDetails && (
                        <AppointmentDetails
                            exitMethod={() => {
                                handleCloseAppointmentDetails();
                                returnToDashboard();
                            }}
                            dateSelected={finalDateSelected}
                            timeSelected={finalTimeSelected}
                        />
                    )}
                </AnimatePresence>
            </section>
        </PatientWrapper>
    );
}

const Calendar = ({ handleDateSelect, handleSelectAllow, handleEventClick, calendarEvents, calendarRef }) => {
    return (
        <div className="calendar_container_wrapper" style={{ padding: '20px', backgroundColor: '#f0f4f8' }}>
            <div className="calendar_container" style={{ position: 'relative', zIndex: 0 }}>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    events={calendarEvents}
                    eventClick={handleEventClick}
                    businessHours={businessHoursConfig}
                    slotMinTime="08:00:00"
                    slotMaxTime="18:00:00"
                    slotDuration="00:30:00"
                    slotLabelFormat={{
                        hour: 'numeric',
                        minute: '2-digit',
                        omitZeroMinute: false,
                        meridiem: 'short'
                    }}
                    slotLabelInterval="01:00"
                    allDaySlot={false}
                    selectable={true}
                    selectMirror={true}
                    selectAllow={handleSelectAllow}
                    select={handleDateSelect}
                    editable={false}
                    nowIndicator={true}
                    height="auto"
                    initialDate="2024-06-03"
                />
            </div>
        </div>
    );
}

const PopUp = ({ isOpen, dateSelected, timeSelected, onCancel, onConfirm, doctorName = "Dr. Smith" }) => {
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.2,
                when: "afterChildren"
            }
        }
    };

    const childVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="popup-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className="pop_Up"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.h2
                            variants={childVariants}
                            transition={{ delay: 0.1 }}
                        >
                            Appointment Details
                        </motion.h2>

                        <motion.p
                            variants={childVariants}
                            transition={{ delay: 0.1 }}
                        >
                            <strong>Doctor:</strong> {doctorName}
                        </motion.p>

                        <motion.p
                            variants={childVariants}
                            transition={{ delay: 0.1 }}
                        >
                            <strong>Reason for Visit:</strong> Tooth Pain
                        </motion.p>

                        <motion.p
                            variants={childVariants}
                            transition={{ delay: 0.2 }}
                        >
                            <strong>Date:</strong> {dateSelected}
                        </motion.p>

                        <motion.p
                            variants={childVariants}
                            transition={{ delay: 0.3 }}
                        >
                            <strong>Time:</strong> {timeSelected}
                        </motion.p>

                        <motion.div
                            className="button_container"
                            variants={childVariants}
                            transition={{ delay: 0.4 }}
                        >
                            <motion.button
                                onClick={onCancel}
                                className="popup-button cancel"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: 'spring' }}
                            >
                                Cancel
                            </motion.button>
                            <motion.button
                                onClick={onConfirm}
                                className="popup-button confirm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: 'spring' }}
                            >
                                Confirm
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PatientBookDoctor;