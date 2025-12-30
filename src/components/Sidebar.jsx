import React from 'react'
import { FaHome } from 'react-icons/fa'; 
import { FaRegCalendarAlt } from 'react-icons/fa';
import { BsJournalText } from 'react-icons/bs';
import {Link} from 'react-router-dom'
const Sidebar = () => {
  return (
    <aside className='hidden md:flex
            w-64
            bg-white
            shadow-md
            flex-col
            p-6'>
                <h2 className='text-xl font-bold text-blue-600 mb-8'> Dashboard </h2>
                <div className='flex flex-col space-y-4'>
                <Link to="/dashboard" className='flex items-center space-x-2
                    text-gray-700 font-medium
                    hover:text-blue-600'> 
                    <FaHome size={20} color="gray" /> 
                    <span>Dashboard</span>
                </Link>
                <Link to="/expenses" className='flex items-center space-x-2
                    text-gray-700 font-medium
                    hover:text-blue-600'> 
                    <BsJournalText size={20} color="gray" /> 
                    <span>Expense</span>
                </Link>
                <Link to="/calendar" className='flex items-center space-x-2
                    text-gray-700 font-medium
                    hover:text-blue-600'> 
                    <FaRegCalendarAlt size={20} color="gray" /> 
                    <span>Calendar</span>
                </Link>   
                </div>   
    </aside>
  )
}

export default Sidebar
