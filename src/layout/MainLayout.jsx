
import React, { useEffect, useState } from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { HiOutlineMenu } from 'react-icons/hi'

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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className='min-h-screen bg-gray-100 flex'>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-6">
            {/* Mobile header with hamburger */}
            <div className='md:hidden flex items-center justify-between mb-4'>
              <button onClick={() => setIsSidebarOpen(true)} className='p-2 rounded-md hover:bg-gray-200'>
                <HiOutlineMenu size={22} />
              </button>
              <h1 className='text-lg font-semibold'>Budget Flow</h1>
              <div />
            </div>

            <Outlet context={{ expenseList, setExpenseList }} />
      </main>
    </div>
  )
}

export default MainLayout
