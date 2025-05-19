import React, { useEffect, useRef, useState } from 'react';
import PatientWrapper from '../../../components/app/PatientWrapper';
import TopBar from '../../../components/app/TopBar';

import { AnimatePresence, motion } from 'framer-motion';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import "../../../styles/PatientBookDoctor.css"

const initialUnavailableEvents = [
  {
    title: 'Doctor Unavailable', start: '2024-06-04T08:30:00', end: '2024-06-04T09:30:00',
    display: 'background', className: 'event-unavailable-bg',
    extendedProps: { isUnavailable: true, type: 'unavailable' }
  },
  {
    title: 'Lunch Break', daysOfWeek: [1, 2, 3, 4, 5], startTime: '12:00:00', endTime: '13:00:00',
    display: 'background', className: 'event-lunch-bg',
    extendedProps: { isUnavailable: true, type: 'lunch' }
  },
  // ... ADD className TO ALL OTHER UNAVAILABLE/BOOKED EVENTS
  { title: 'Booked', start: '2024-06-10T09:00:00', end: '2024-06-10T10:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-10T14:00:00', end: '2024-06-10T14:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-11T11:00:00', end: '2024-06-11T11:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-11T15:30:00', end: '2024-06-11T16:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-12T08:00:00', end: '2024-06-12T09:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-12T13:00:00', end: '2024-06-12T13:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-12T16:00:00', end: '2024-06-12T17:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-13T10:30:00', end: '2024-06-13T11:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-13T17:00:00', end: '2024-06-13T18:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-14T09:30:00', end: '2024-06-14T10:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-14T13:30:00', end: '2024-06-14T14:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-14T15:00:00', end: '2024-06-14T15:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-17T08:30:00', end: '2024-06-17T09:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-17T14:30:00', end: '2024-06-17T15:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-18T11:30:00', end: '2024-06-18T12:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-18T16:30:00', end: '2024-06-18T17:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-19T10:00:00', end: '2024-06-19T11:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-19T13:00:00', end: '2024-06-19T14:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-20T09:00:00', end: '2024-06-20T09:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-20T15:00:00', end: '2024-06-20T16:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-21T11:00:00', end: '2024-06-21T12:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-21T14:00:00', end: '2024-06-21T14:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-24T08:00:00', end: '2024-06-24T08:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-24T13:30:00', end: '2024-06-24T14:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-24T16:00:00', end: '2024-06-24T16:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-25T10:30:00', end: '2024-06-25T11:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-25T15:30:00', end: '2024-06-25T16:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-26T09:30:00', end: '2024-06-26T10:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-26T17:00:00', end: '2024-06-26T17:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-27T08:30:00', end: '2024-06-27T09:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-27T14:30:00', end: '2024-06-27T15:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-28T10:00:00', end: '2024-06-28T10:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-28T13:00:00', end: '2024-06-28T13:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-28T16:30:00', end: '2024-06-28T17:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
];
const businessHoursConfig = {
  daysOfWeek: [1, 2, 3, 4, 5],
  startTime: '08:00:00',
  endTime: '18:00:00',
};
function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + (minutes || 0);
}
function dateTimeRangesOverlap(start1, end1, start2, end2) {
  const d_start1 = new Date(start1);
  const d_end1 = new Date(end1);
  const d_start2 = new Date(start2);
  const d_end2 = new Date(end2);
  return d_start1 < d_end2 && d_end1 > d_start2;
}
function generateAvailableSlots(unavailableEvents, year, month, slotDurationHours = 1) {
  const availableSlots = [];
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);
  const businessStartMinutes = timeToMinutes(businessHoursConfig.startTime);
  const businessEndMinutes = timeToMinutes(businessHoursConfig.endTime);

  for (let day = new Date(firstDayOfMonth); day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
    const currentDay = new Date(day);
    const dayOfWeek = currentDay.getDay();
    if (!businessHoursConfig.daysOfWeek.includes(dayOfWeek)) continue;

    for (let hour = businessStartMinutes / 60; hour < businessEndMinutes / 60; hour += slotDurationHours) {
      const slotStart = new Date(currentDay);
      slotStart.setHours(hour, 0, 0, 0);
      const slotEnd = new Date(slotStart);
      slotEnd.setHours(slotStart.getHours() + slotDurationHours, 0, 0, 0);
      const slotEndCurrentDayMinutes = slotEnd.getHours() * 60 + slotEnd.getMinutes();
      if (slotEnd.getDate() > slotStart.getDate() || slotEndCurrentDayMinutes > businessEndMinutes) continue;

      let isSlotBlocked = false;
      for (const unavailableEvent of unavailableEvents) {
        if (unavailableEvent.extendedProps && unavailableEvent.extendedProps.isUnavailable) {
          if (unavailableEvent.daysOfWeek) {
            if (unavailableEvent.daysOfWeek.includes(dayOfWeek)) {
              const unavailableStartMinutes = timeToMinutes(unavailableEvent.startTime);
              const unavailableEndMinutes = timeToMinutes(unavailableEvent.endTime);
              const currentSlotStartMinutes = slotStart.getHours() * 60 + slotStart.getMinutes();
              const currentSlotEndMinutes = (slotEnd.getHours() * 60 + slotEnd.getMinutes()) === 0 ? 24*60 : (slotEnd.getHours() * 60 + slotEnd.getMinutes());
              if (currentSlotStartMinutes < unavailableEndMinutes && currentSlotEndMinutes > unavailableStartMinutes) {
                isSlotBlocked = true; break;
              }
            }
          } else {
            if (dateTimeRangesOverlap(slotStart, slotEnd, new Date(unavailableEvent.start), new Date(unavailableEvent.end))) {
              isSlotBlocked = true; break;
            }
          }
        }
      }
      if (!isSlotBlocked) {
        availableSlots.push({
          title: 'Available', start: slotStart.toISOString(), end: slotEnd.toISOString(),
          className: 'event-available', display: 'block',
          extendedProps: { isAvailableSlot: true }
        });
      }
    }
  }
  return availableSlots;
}


const PatientBookDoctor = () => {
  const calendarRef = useRef(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSlotDetails, setSelectedSlotDetails] = useState(null); 

  useEffect(() => {
    const available = generateAvailableSlots(initialUnavailableEvents, 2024, 6);
    setCalendarEvents([...initialUnavailableEvents, ...available]);
  }, []);

  const openConfirmationPopup = (details) => {
    setSelectedSlotDetails(details);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedSlotDetails(null);
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

    console.log('Appointment Confirmed:', {
      start: new Date(rawStart).toISOString(),
      end: new Date(rawEnd).toISOString(),
      allDay: rawAllDay,
    });

    handleClosePopup(); 
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
                const selectionEndMinutes = selectEndDate.getHours() * 60 + selectEndDate.getMinutes() === 0 ? 24*60 : selectEndDate.getHours() * 60 + selectEndDate.getMinutes();

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


  return (
    <PatientWrapper>
      <section className='patient_window PatientBookDoctor'>
        <TopBar currentPage={"Pick A Date & Time"} />

        <div className="calendar_container_wrapper" style={{ padding: '20px', backgroundColor: '#f0f4f8'}}>
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

        <PopUp
          isOpen={isPopupOpen}
          dateSelected={selectedSlotDetails?.dateSelected}
          timeSelected={selectedSlotDetails?.timeSelected}
          onCancel={handleClosePopup}
          onConfirm={handleConfirmBooking}
        />

      </section>
    </PatientWrapper>
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