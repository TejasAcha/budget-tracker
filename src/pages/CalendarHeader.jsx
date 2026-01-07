
import React from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom';
const CalendarHeader = ({ year, month, setCurrentDate }) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const handlePrevMonth = () => {
      const prevMonthDate = new Date(year, month - 1, 1);
      setCurrentDate(prevMonthDate);
    };

    const handleNextMonth = () => {
      const nextMonthDate = new Date(year, month + 1, 1);
      setCurrentDate(nextMonthDate);
    };

    return (
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrevMonth} className="px-4 py-2 bg-gray-200 rounded">Prev</button>
        <h2 className="text-xl font-semibold">{monthNames[month]} {year}</h2>
        <button onClick={handleNextMonth} className="px-4 py-2 bg-gray-200 rounded">Next</button>
      </div>
    );
  }

  export default CalendarHeader