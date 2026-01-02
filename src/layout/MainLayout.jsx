
import React, { useEffect, useState } from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const MainLayout = () => {
  const [expenseList, setExpenseList] = useState([]);
  
  
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
