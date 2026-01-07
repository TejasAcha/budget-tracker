
import React, { useEffect, useState } from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const MainLayout = () => {
  const STORAGE_KEY = 'budgetflow_expenses';
  const [expenseList, setExpenseList] = useState(() => {
  try {
    const storedExpenses = localStorage.getItem(STORAGE_KEY);
    const parsed = storedExpenses ? JSON.parse(storedExpenses) : [];
    return Array.isArray(parsed)
      ? parsed.filter(e => e && e.date)
      : [];
  } catch (error) {
    console.error('Error parsing stored expenses:', error);
    return [];
  }
});
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenseList));
}, [expenseList]);
    
  
  
  return (
    <div className='min-h-screen bg-gray-100 flex'>
        <Sidebar />
        <main className="flex-1 p-6">
            <Outlet context={{ expenseList, setExpenseList }} />
      </main>
    </div>    
  )
}

export default MainLayout
