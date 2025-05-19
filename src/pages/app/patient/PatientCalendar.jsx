import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo
} from "react";
import "../../../styles/scheduler.css";
import { Arrow_left, Arrow_right } from "../../../assets";
import "@schedule-x/theme-default/dist/index.css";
import { DateCalendar, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import timeGridPlugin from "@fullcalendar/timegrid";
import PatientWrapper from "../../../components/app/PatientWrapper";
import TopBar from "../../../components/app/TopBar";


const PatientCalendar = () => {
    const [events, setEvents] = useState([
        {
            id: "1",
            title: "Sample Event",
            start: "2025-01-01T10:00:00",
            end: "2025-01-01T12:00:00",
            allDay: false,
            description: 'Lecture',
            backgroundColor: "#FE9C8F",
            borderColor: "#FE9C8F"
        },
        {
            id: "2",
            title: "All-Day Event",
            start: "2025-01-20",
            end: "",
            allDay: true,
            backgroundColor: "#FE9C8F",
            borderColor: "#FE9C8F"
        },
        {
            id: "3",
            title: "Removal Of Wisdom Tooth",
            start: "2025-06-12T13:30:00",
            end: "2025-06-12T15:30:00",
            allDay: false,
            description: 'Weekly team sync',
            backgroundColor: "#EAA9A4",
            borderColor: "#EAA9A4"
        },
    ]);
    const [currentTitle, setCurrentTitle] = useState("");
    const [currentDate, setCurrentDate] = useState(dayjs());
    const calendarRef = useRef(null);
    const [hoveredEvent, setHoveredEvent] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const handleEventMouseEnter = useCallback((info) => {
        const { event, jsEvent } = info;

        setHoveredEvent({
            title: event.title,
            description: event.extendedProps.description,
            start: event.start,
            end: event.end,
            allDay: event.allDay,
            borderColor: event.borderColor,
        });

        // Set tooltip position based on the mouse event
        setTooltipPosition({
            x: jsEvent.pageX,
            y: jsEvent.pageY,
        });
    }, []);

    const handleEventMouseLeave = useCallback(() => {
        setHoveredEvent(null);
    }, []);

    const openAddEventForm = useCallback((date) => {
        setSelectedDate(date);
        setShowAddEventForm(true);
    }, []);

    const updateCurrentTitleAndDate = useCallback(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            if (calendarApi) {
                setCurrentTitle(calendarApi.view.title);
                setCurrentDate(dayjs(calendarApi.getDate()));
            }
        }
    }, []);

    const handleNavigate = useCallback((action) => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            switch (action) {
                case "prev":
                    calendarApi.prev();
                    break;
                case "next":
                    calendarApi.next();
                    break;
                case "today":
                    calendarApi.today();
                    break;
                case "month":
                    calendarApi.changeView("dayGridMonth");
                    break;
                case "week":
                    calendarApi.changeView("timeGridWeek");
                    break;
                default:
                    break;
            }
            updateCurrentTitleAndDate();
        }
    }, [updateCurrentTitleAndDate]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            if (calendarRef.current) {
                calendarRef.current.getApi().updateSize();
            }
        });

        const calendarParent = document.querySelector(".scheduler");
        if (calendarParent) {
            resizeObserver.observe(calendarParent);
        }

        return () => resizeObserver.disconnect();
    }, []);

    const handleDateChange = useCallback((newDate) => {
        setCurrentDate(newDate);
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.gotoDate(newDate.format("YYYY-MM-DD"));
            updateCurrentTitleAndDate();
        }
    }, [updateCurrentTitleAndDate]);

    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            setCurrentTitle(calendarApi.view.title);
        }
    }, []);

    const handleDateClick = useCallback((info) => {
        openAddEventForm(info.dateStr);
    }, [openAddEventForm]);

    const handleEventDrop = useCallback((info) => {
        const { event } = info;
        setEvents((prevEvents) =>
            prevEvents.map((ev) =>
                ev.id === event.id
                    ? {
                        ...ev,
                        start: event.start.toISOString(),
                        end: event.end ? event.end.toISOString() : null,
                    }
                    : ev
            )
        );
    }, []);

    const handleEventResize = useCallback((info) => {
        const { event } = info;
        setEvents((prevEvents) =>
            prevEvents.map((ev) =>
                ev.id === event.id
                    ? {
                        ...ev,
                        start: event.start.toISOString(),
                        end: event.end ? event.end.toISOString() : null,
                    }
                    : ev
            )
        );
    }, []);

    const tooltipStyle = useMemo(() => ({
        top: tooltipPosition.y - 100,
        left: tooltipPosition.x + 10,
        position: "absolute",
        zIndex: 1000,
        maxWidth: '200px'
    }), [tooltipPosition]);

    return (
        <>
            {hoveredEvent && (
                <div
                    className="tooltip"
                    style={{
                        ...tooltipStyle,
                        border: `${hoveredEvent.borderColor} solid 3px`,
                    }}
                >
                    <strong>{hoveredEvent.title}</strong>
                    <p>{hoveredEvent.description}</p>
                    <p>{hoveredEvent.allDay ? "Type: All Day" : ""}</p>
                    <small>
                        {hoveredEvent.start
                            ? hoveredEvent.allDay
                                ? hoveredEvent.start.toLocaleDateString()
                                : hoveredEvent.start.toLocaleString()
                            : ""}
                        {" - "}
                        {hoveredEvent.end
                            ? hoveredEvent.allDay
                                ? hoveredEvent.end.toLocaleDateString()
                                : hoveredEvent.end.toLocaleString()
                            : ""}
                    </small>
                </div>
            )}

            <PatientWrapper>
                <section className="patient_window">
                    <TopBar currentPage={"Patient Dashboard"} />

                    <br />

                    <div className="scheduler_wrapper">
                        <div className="scheduler">
                            <div className="calendar_controls_wrapper">
                                <div className="calendar_controls f-center">
                                    <div className="f-center">
                                        <h1>{currentTitle}</h1>
                                        <button className="prev f-center shadow" onClick={() => handleNavigate("prev")}>
                                            <img src={Arrow_left} alt="" />
                                        </button>
                                        <button className="next f-center shadow" onClick={() => handleNavigate("next")}>
                                            <img src={Arrow_right} alt="" />
                                        </button>
                                        <button className="today f-center shadow" onClick={() => handleNavigate("today")}>Today</button>
                                    </div>
                                    <div className="f-center">
                                        <button className="month f-center shadow" onClick={() => handleNavigate("month")}>Month View</button>
                                        <button className="week f-center shadow" onClick={() => handleNavigate("week")}>Week View</button>
                                    </div>
                                </div>
                            </div>
                            <FullCalendar
                                ref={calendarRef}
                                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                                events={events}
                                dateClick={handleDateClick}
                                initialView="dayGridMonth"
                                headerToolbar={false}
                                footerToolbar={false}
                                height="auto"
                                contentHeight="auto"
                                datesSet={updateCurrentTitleAndDate}
                                editable={true}
                                eventMouseEnter={handleEventMouseEnter}
                                eventMouseLeave={handleEventMouseLeave}
                                eventDrop={handleEventDrop}
                                eventResize={handleEventResize}

                            />

                        </div>

                        <div className="side_info">
                            <div className="mini_calendar ">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateCalendar
                                        value={currentDate}
                                        onChange={handleDateChange}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className="events_planed">
                                <h2>Upcoming Appointments</h2>
                                <br />
                                <ul style={{ maxHeight: "300px", overflowY: "auto" }}>
                                    {events
                                        .filter(event => dayjs(event.start).isAfter(dayjs()))
                                        .sort((a, b) => dayjs(a.start).diff(dayjs(b.start)))
                                        .map(event => (
                                            <li key={event.id} style={{ marginBottom: "10px", padding: "10px", background: event.backgroundColor, borderRadius: "5px", color: "#fff" }}>
                                                <strong>{event.title}</strong>
                                                <p>{event.allDay ? `All Day Event - ${dayjs(event.start).format("MMM D, YYYY")}` : `${dayjs(event.start).format("MMM D, YYYY h:mm A")} - ${dayjs(event.end).format("MMM D, YYYY h:mm A")}`}</p>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </section>
            </PatientWrapper>

        </>
    );
};

export default PatientCalendar;