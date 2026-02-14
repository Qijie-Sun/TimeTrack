import React, { useEffect, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Draggable } from "@fullcalendar/interaction";
import PropTypes from "prop-types";

function Calendar({ assignments, setAssignments, handleDeleteFromCalendar, courses, setCurrentWeekStart }) {
    // Handles combined events
    const [calendarEvents, setCalendarEvents] = useState([]);

    // Adds courses to events
    useEffect(() => {
        setCalendarEvents((prevEvents) => [...prevEvents, ...courses]);
    }, [courses]);

    // Defines dragging behavior
    useEffect(() => {
        const draggableEl = document.getElementById("external-events");
        if (draggableEl) {
            const draggable = new Draggable(draggableEl, {
                itemSelector: ".fc-event",
                eventData: function (eventEl) {
                    return {
                        title: eventEl.getAttribute("title"),
                    };
                },
            });

            return () => {
                draggable.destroy();
            };
        }
    }, []);

    // Removes dragged assignment from list
    const handleEventReceive = (info) => {
        const droppedAssignmentTitle = info.event.title;

        const newEvent = {
            title: droppedAssignmentTitle,
            start: info.event.start,
            end: info.event.end || info.event.start,
            backgroundColor: "#f2a566",
        };
        setCalendarEvents((prevEvents) => [...prevEvents, newEvent]);

        setAssignments(assignments.filter((assignment) => assignment !== droppedAssignmentTitle));
    };

    // Removes dragged element from calendar
    const handleEventDelete = (info) => {
        const deleteBoxEl = document.querySelector(".delete-box");
        const deleteBoxRect = deleteBoxEl.getBoundingClientRect();

        const { clientX: x, clientY: y } = info.jsEvent;

        if (
            x >= deleteBoxRect.left &&
            x <= deleteBoxRect.right &&
            y >= deleteBoxRect.top &&
            y <= deleteBoxRect.bottom
        ) {
            info.event.remove();
            handleDeleteFromCalendar(info.event.title);
            setCalendarEvents((prevEvents) =>
                prevEvents.filter((event) => event.title !== info.event.title)
            );
        }
    };

    return (
        <div>
            <Fullcalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                
                initialView={"timeGridWeek"}
                headerToolbar={{
                    center: "prev,next,today",
                    end: "dayGridMonth,timeGridWeek",
                }}
                height={"auto"}

                datesSet={(info) => setCurrentWeekStart(info.start)}

                nowIndicator={true}
                allDaySlot={false}

                slotMinTime={"08:00"}
                slotMaxTime={"25:00"}

                editable={true}
                droppable={true}

                eventReceive={handleEventReceive}
                eventDragStop={handleEventDelete}
                
                dragRevertDuration={"0"}

                events = {calendarEvents}

            />
        </div>
    );
}

Calendar.propTypes = {
    assignments: PropTypes.arrayOf(PropTypes.string).isRequired,
    setAssignments: PropTypes.func.isRequired,
};

export default Calendar;