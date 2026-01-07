import React from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
const CalendarPage = () => {
  const { expenseList, setExpenseList } = useOutletContext();
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  

  const navigate = useNavigate();
  return (
    <main className="flex-1 p-6">
      <h1 className="text-2xl font-semibold mb-6">Calendar</h1>

      {/* Month Header */}
      <CalendarHeader
        year={year}
        month={month}
        setCurrentDate={setCurrentDate}
      />

      {/* Calendar Grid */}
      <CalendarGrid
        year={year}
        month={month}
        expenseList={expenseList}
        onDateClick={(date) =>
          navigate("/expenses", { state: { filterDate: date } })
        }
      />
    </main>
  )
}

export default CalendarPage
