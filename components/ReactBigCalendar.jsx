// run ----------> npm install react-big-calendar date-fns react-datepicker

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(),
        end: new Date(),
    }
];

function CalendarComponent() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
        setNewEvent({ title: "", start: "", end: "" });
    }

    return (
        <div className="flex-[4]">
            <div className="flex space-x-5 items-center my-4 justify-center">
                <input type="text" placeholder="Add Title" className="px-3 py-1 focus:outline-none border border-gray-300 rounded-lg" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date" className="focus:outline-none" selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" className="focus:outline-none" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <button className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddEvent}>
                    Add Event
                </button>
            </div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
        </div>
    );
}

export default CalendarComponent;