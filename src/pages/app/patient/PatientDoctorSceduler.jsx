import React, { useState } from 'react'
import PatientWrapper from '../../../components/app/PatientWrapper'
import TopBar from '../../../components/app/TopBar'
import { doctor_1, doctor_2, doctor_3, doctor_4, doctor_5, doctor_6, doctor_7, logo } from '../../../assets';
import "../../../styles/PatientDoctorScheduler.css"
import DropdownField from '../../../components/DropdownField';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";


const visitationReasons = [
    {
        value: "Consultation",
        label: "General check-up or inquiry."
    },
    {
        value: "Routine Cleaning",
        label: "Regular dental cleaning or prophylaxis."
    },
    {
        value: "Toothache",
        label: "Patient experiencing dental pain."
    },
    {
        value: "Cavity / Filling",
        label: "Suspected or known cavity needing attention."
    },
    {
        value: "Tooth Extraction",
        label: "Including wisdom tooth or other."
    },
    {
        value: "Orthodontic Evaluation",
        label: "Braces or aligners consultation."
    },
    {
        value: "Follow-up Appointment",
        label: "Returning after a previous visit."
    },
    {
        value: "Root Canal Treatment",
        label: "Suspected or ongoing RCT."
    },
    {
        value: "Dental Crown / Bridge",
        label: "Fixing or checking prosthetics."
    },
    {
        value: "Teeth Whitening",
        label: "Cosmetic whitening procedures."
    },
    {
        value: "Emergency Visit",
        label: "Swelling, bleeding, or trauma."
    },
    {
        value: "Pediatric Check-up",
        label: "Visit for a child-specific concern."
    },
    {
        value: "Gum Treatment",
        label: "Periodontal cleaning, deep scaling, etc."
    },
    {
        value: "Denture Fitting / Repair",
        label: "Issues with removable prosthetics."
    },
    {
        value: "X-Ray / Imaging Appointment",
        label: "Scheduled for diagnostics."
    },
    {
        value: "Cosmetic Consultation",
        label: "Veneers, smile design, etc."
    },
    {
        value: "Post-Surgery Check-up",
        label: "After an extraction or surgery."
    },
    {
        value: "Braces Adjustment",
        label: "Ongoing ortho care."
    }
];

const doctorDetails = [
    {
        name: "Dr. Emily Carter",
        specialty: "Orthodontist",
        category: "Orthodontists",
        img: doctor_1,
        availability: {
            days: ["Monday", "Wednesday", "Friday"],
            hours: "9:00 AM - 5:00 PM"
        },
        bookingReasons: [
            "Orthodontic Evaluation",
            "Braces Adjustment",
            "Consultation",
            "Cosmetic Consultation"
        ]
    },
    {
        name: "Dr. Benjamin Hayes",
        specialty: "Prosthodontist",
        category: "Dentists",
        img: doctor_2,
        availability: {
            days: ["Tuesday", "Thursday", "Saturday"],
            hours: "10:00 AM - 6:00 PM"
        },
        bookingReasons: [
            "Dental Crown / Bridge",
            "Denture Fitting / Repair",
            "Tooth Extraction",
            "Follow-up Appointment",
            "Cosmetic Consultation",
            "Consultation"
        ]
    },
    {
        name: "Dr. James Whitaker",
        specialty: "Cosmetic & General Dentist",
        category: "Dentists",
        img: doctor_3,
        availability: {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            hours: "8:00 AM - 4:00 PM"
        },
        bookingReasons: [
            "Routine Cleaning",
            "Cavity / Filling",
            "Toothache",
            "Teeth Whitening",
            "Dental Crown / Bridge",
            "Follow-up Appointment",
            "Consultation",
            "Cosmetic Consultation"
        ]
    },
    {
        name: "Dr. Lauren Mitchell",
        specialty: "Oral Surgeon",
        category: "Surgeons",
        img: doctor_4,
        availability: {
            days: ["Wednesday", "Thursday", "Friday"],
            hours: "11:00 AM - 7:00 PM"
        },
        bookingReasons: [
            "Tooth Extraction",
            "Root Canal Treatment",
            "Post-Surgery Check-up",
            "Emergency Visit",
            "Consultation",
            "X-Ray / Imaging Appointment"
        ]
    },
    {
        name: "Dr. Daniel Brooks",
        specialty: "General & Family Dentist",
        category: "Dentists",
        img: doctor_5,
        availability: {
            days: ["Monday", "Wednesday", "Thursday", "Saturday"],
            hours: "7:00 AM - 3:00 PM"
        },
        bookingReasons: [
            "Routine Cleaning",
            "Cavity / Filling",
            "Toothache",
            "Gum Treatment",
            "Pediatric Check-up",
            "Follow-up Appointment",
            "Consultation"
        ]
    },
    {
        name: "Dr. Rachel Bennett",
        specialty: "Maxillofacial Surgeon",
        category: "Surgeons",
        img: doctor_6,
        availability: {
            days: ["Tuesday", "Thursday", "Saturday"],
            hours: "8:00 AM - 4:00 PM"
        },
        bookingReasons: [
            "Tooth Extraction",
            "Emergency Visit",
            "Post-Surgery Check-up",
            "Consultation",
            "X-Ray / Imaging Appointment"
        ]
    },
    {
        name: "Dr. Chelsea Graham",
        specialty: "Pediatric Orthodontist",
        category: "Orthodontists",
        img: doctor_7,
        availability: {
            days: ["Monday", "Wednesday", "Friday", "Saturday"],
            hours: "10:00 AM - 6:00 PM"
        },
        bookingReasons: [
            "Orthodontic Evaluation",
            "Pediatric Check-up",
            "Braces Adjustment",
            "Consultation",
            "Cosmetic Consultation"
        ]
    }
];


const PatientDoctorScheduler = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Experts");
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedReasons, setSelectedReasons] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [visitReason, setVisitReason] = useState("");

    const handleBookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
        setShowPopup(true);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setIsPopupOpen(false);
        setSelectedDoctor(null);
        setVisitReason("");
    };


    // Time slots for the time filter
    const timeSlots = [
        "Any Time",
        "Morning (8AM - 12PM)",
        "Afternoon (12PM - 5PM)",
        "Evening (5PM - 8PM)"
    ];

    const daysOfWeek = [
        "Any Day",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    const filteredDoctors = doctorDetails.filter(doc => {
        const categoryMatch = selectedCategory === "All Experts" || doc.category === selectedCategory;

        const dayMatch = !selectedDay || selectedDay === "Any Day" ||
            doc.availability.days.includes(selectedDay);

        let timeMatch = true;
        if (selectedTime && selectedTime !== "Any Time") {
            const [docStart, docEnd] = doc.availability.hours.split(" - ");
            const docStartTime = convertTo24Hour(docStart);
            const docEndTime = convertTo24Hour(docEnd);

            if (selectedTime === "Morning (8AM - 12PM)") {
                timeMatch = docStartTime <= 12 && docEndTime >= 8;
            } else if (selectedTime === "Afternoon (12PM - 5PM)") {
                timeMatch = docStartTime <= 17 && docEndTime >= 12;
            } else if (selectedTime === "Evening (5PM - 8PM)") {
                timeMatch = docStartTime <= 20 && docEndTime >= 17;
            }
        }

        let reasonMatch = true;
        if (selectedReasons.length > 0 && !selectedReasons.includes('none')) {
            reasonMatch = selectedReasons.some(reason =>
                doc.bookingReasons.includes(reason)
            );
        }

        return categoryMatch && dayMatch && timeMatch && reasonMatch;
    });


    // Helper function to convert time string to 24-hour format
    function convertTo24Hour(timeStr) {
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":");

        if (hours === "12") {
            hours = "00";
        }

        if (modifier === "PM") {
            hours = parseInt(hours, 10) + 12;
        }

        return parseInt(hours, 10);
    }

    // Handler for when reasons are selected in dropdown
    const handleReasonSelect = (selectedItems) => {
        setSelectedReasons(selectedItems);
    };

    return (
        <>
            <PatientWrapper>
                <section className='patient_window PatientDoctorScheduler'>
                    <TopBar currentPage={"Pick Your Doctor"} />

                    <br />

                    <div className="controller">
                        <div className="category_sorter">
                            {["All Experts", "Dentists", "Surgeons", "Orthodontists"].map((cat) => (
                                <button
                                    key={cat}
                                    className={selectedCategory === cat ? "active" : ""}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="availability-filters">
                            <div className="filter-group">
                                <label htmlFor="day-filter">Filter by Day:</label>
                                <select
                                    id="day-filter"
                                    value={selectedDay}
                                    onChange={(e) => setSelectedDay(e.target.value)}
                                >
                                    {daysOfWeek.map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="filter-group">
                                <label htmlFor="time-filter">Filter by Time:</label>
                                <select
                                    id="time-filter"
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                >
                                    {timeSlots.map(time => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className="filter_reasons">
                        <DropdownField listItems={visitationReasons} inputFieldText={"What are you looking For?"} label={"Description"} showValue={true} onSelectionChange={handleReasonSelect} retunValue={true} />
                    </div>

                    <br />
                    <br />

                    <div className="card_container">
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map((card, index) => (
                                <div className="card" key={index}>
                                    <img src={card.img} alt={card.name} />
                                    <br />
                                    <br />
                                    <h1>{card.name}</h1>
                                    <p><i>{card.specialty}</i></p>
                                    <div className="availability">
                                        <p><strong>Available Days:</strong> {card.availability.days.join(", ")}</p>
                                        <p><strong>Hours:</strong> {card.availability.hours}</p>
                                    </div>
                                    <br />
                                    <button onClick={() => handleBookAppointment(card)}>Book Appointment</button>
                                </div>
                            ))
                        ) : (
                            <div className="no-results">
                                <p>No doctors match your selected filters.</p>
                            </div>
                        )}

                    </div>
                </section>
            </PatientWrapper>

            <PopUp
                visitReason={visitReason}
                setVisitReason={setVisitReason}
                selectedDoctor={selectedDoctor}
                handleClosePopup={handleClosePopup}
                isOpen={isPopupOpen}
            />
        </>
    )
}

const quickResponses = [
    "Follow-up appointment",
    "My lower tooth hurts",
    "Yearly check-up",
    "Consultation",
    "Braces adjustment",
    "Tooth Pain",
    "Tooth extraction",
    "Routine cleaning"
];

const PopUp = ({ visitReason, setVisitReason, selectedDoctor, handleClosePopup, isOpen }) => {
    const navigate = useNavigate();

    const sendAppointmentPage = () => {
        navigate("/patient_book_doctor");
    };

    const handleQuickResponseClick = (response) => {
        setVisitReason(response);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            transition: {
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        exit: {
            y: -20,
            opacity: 0,
            transition: { duration: 0.2 }
        }
    };

    const quickResponseVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { type: "spring", stiffness: 400, damping: 15 }
        },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="pop_up_container"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={containerVariants}
                >
                    <motion.div
                        className="pop_up_block"
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants}>
                            <div className="tag">
                                <p>Just a moment</p>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <br />
                            <img src={logo} alt="" />
                        </motion.div>

                        <motion.h2 variants={itemVariants}>
                            {selectedDoctor.name} would like to ask why you'd like to visit
                        </motion.h2>

                        <motion.div variants={itemVariants}>
                            <label>
                                <input
                                    type="text"
                                    value={visitReason}
                                    onChange={(e) => setVisitReason(e.target.value)}
                                    placeholder="Enter your reason for visit"
                                />
                            </label>
                        </motion.div>

                        <motion.div
                            className="quick_responses"
                            variants={itemVariants}
                        >
                            <motion.p variants={itemVariants} style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
                                Quick Responses:
                            </motion.p>
                            <motion.div
                                style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                                variants={{
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.1,
                                            delayChildren: 0.3
                                        }
                                    }
                                }}
                            >
                                {quickResponses.map((response, idx) => (
                                    <motion.button
                                        key={idx}
                                        type="button"
                                        style={{
                                            padding: "0.5rem 1rem",
                                            background: "#f0f0f0",
                                            border: "1px solid #ccc",
                                            borderRadius: "20px",
                                            cursor: "pointer"
                                        }}
                                        variants={quickResponseVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        onClick={() => handleQuickResponseClick(response)}
                                    >
                                        {response}
                                    </motion.button>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <br />
                            <br />
                        </motion.div>

                        <motion.div
                            className="button_container"
                            variants={itemVariants}
                        >
                            <motion.button
                                onClick={handleClosePopup}
                                whileHover={{ backgroundColor: "#f5f5f5" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Return
                            </motion.button>
                            <motion.button
                                onClick={sendAppointmentPage}
                                whileHover={{ backgroundColor: "#0069d9" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Send
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PatientDoctorScheduler