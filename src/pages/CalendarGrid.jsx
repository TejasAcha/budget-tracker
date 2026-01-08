
import { useMemo } from 'react';
import React from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom';

const CalendarGrid = ({ year, month, expenseList, onDateClick }) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const weeks = [];
    let currentDay = 1 - firstDayIndex;

    const expensesByDate = useMemo(() => {
  const map = {};
  expenseList.forEach(e => {
    if (!map[e.date]) map[e.date] = [];
    map[e.date].push(e);
  });
  return map;
}, [expenseList])

    for (let week = 0; week < 6; week++) {
      const days = [];
      for (let day = 0; day < 7; day++) {
        if (currentDay > 0 && currentDay <= daysInMonth) {
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`;
          const dayExpenses = expensesByDate[dateStr] || [];
          days.push(
            <div
              key={dateStr}
              className="border p-2 h-20 sm:h-24 cursor-pointer hover:bg-blue-50 transition"
              onClick={() => onDateClick(dateStr)}
            >
              <div className={`font-semibold ${(currentDay === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) ? 'text-blue-600' : ''}`}>{currentDay}</div>
              <div className="text-xs mt-1">
                {dayExpenses.slice(0, 2).map((exp, idx) => (
                  <div key={idx} className="bg-blue-100 text-blue-800 rounded px-1 mb-1">

                    {exp.description}: ₹{Number(exp.amount).toLocaleString('en-IN')}

                  </div>
                ))}
                {dayExpenses.length > 2 && <div className="text-xs">+{dayExpenses.length - 2}</div>}
              </div>
            </div>
          );
        } else {
          days.push(<div key={day} className="border p-2 h-24 bg-gray-100"></div>);
        }
        currentDay++;
      }
      weeks.push(
        <div key={week} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
    }

    return <div>{weeks}</div>;
  }

export default CalendarGrid
