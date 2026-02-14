import React, { useState } from "react";
import PropTypes from "prop-types";
import { format, addDays } from "date-fns";

// Adds courses to calendar
const AddCourse = ({ setCourses, currentWeekStart }) => {
    const [courseName, setCourseName] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDays, setSelectedDays] = useState({
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
    });

    const handleDayChange = (day) => {
        setSelectedDays((prevDays) => ({
            ...prevDays,
            [day]: !prevDays[day],
        }));
    };

    const getDayDate = (day, weekOffset = 0) => {
        const daysMap = {
            sun: 0,
            mon: 1,
            tue: 2,
            wed: 3,
            thu: 4,
            fri: 5,
            sat: 6,
        };
        return format(addDays(currentWeekStart, daysMap[day] + (weekOffset * 7)), "yyyy-MM-dd");
    };

    const handleAddCourse = () => {
        if (courseName && selectedTime && Object.values(selectedDays).some(Boolean)) {
            const courseDays = Object.keys(selectedDays).filter(day => selectedDays[day]);
            const weeksToAdd = 20;
            
            let courseEvents = [];
            for (let weekOffset = 0; weekOffset < weeksToAdd; weekOffset++) {
                courseDays.forEach(day => {
                    const dayDate = getDayDate(day, weekOffset);
                    courseEvents.push({
                        title: courseName,
                        start: `${dayDate}T${selectedTime}:00`,
                        end: `${dayDate}T${parseInt(selectedTime.split(":")[0]) + 1}:00`,
                    });
                });
            }
    
            setCourses(prevCourses => [...prevCourses, ...courseEvents]);
            setCourseName("");
            setSelectedTime("");
            setSelectedDays({ mon: false, tue: false, wed: false, thu: false, fri: false });
        }
    };

    return (
        <div>
            <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Course Name"
                style={inputStyles}
            />

            <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                style={{ 
                    padding: "10px",
                    width: "100%",
                    marginBottom: "10px",
                    cursor: "pointer",
                }}
            >
                <option value="">Select Time</option>
                {Array.from({ length: 13 }, (_, i) => i + 8).map(hour => (
                    <option key={hour} value={`${hour < 10 ? `0${hour}` : hour}:00`}>
                        {hour < 10 ? `0${hour}` : hour}:00
                </option>
                ))}
            </select>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                {[
                    { day: "mon", label: "M" },
                    { day: "tue", label: "T" },
                    { day: "wed", label: "W" },
                    { day: "thu", label: "R" },
                    { day: "fri", label: "F" },
                    { day: "sat", label: "S" },
                    { day: "sun", label: "U" },
                ].map(({ day, label }) => (
                    <div key={day} style={{ textAlign: "center" }}>
                        <input
                            type="checkbox"
                            id={day}
                            checked={selectedDays[day]}
                            onChange={() => handleDayChange(day)}
                            style={{ display: "block", margin: "5px" }}
                        />
                        <label htmlFor={day} style={{ fontSize: "14px", marginTop: "5px" }}>
                            {label}
                        </label>
                    </div>
                ))}
            </div>

            <br/>

            <button onClick={handleAddCourse} style={buttonStyles}>
                Add Course
            </button>
        </div>
    );
};

AddCourse.propTypes = {
    setCourses: PropTypes.func.isRequired,
};

const inputStyles = {
    padding: "10px",
    width: "90%",
    marginBottom: "10px",
};

const buttonStyles = {
    padding: "10px",
    width: "100%",
    backgroundColor: "#3b3ed4",
    color: "white",
    border: "none",
    cursor: "pointer",
};

export default AddCourse;