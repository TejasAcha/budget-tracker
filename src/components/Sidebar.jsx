import React from 'react'
import { FaHome } from 'react-icons/fa'; 
import { FaRegCalendarAlt } from 'react-icons/fa';
import { BsJournalText } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai'
import {Link} from 'react-router-dom'

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className='hidden md:flex w-64 bg-white shadow-md flex-col p-6'>
        <h2 className='text-xl font-bold text-blue-600 mb-8'> Dashboard </h2>
        <div className='flex flex-col space-y-4'>
          <Link to="/dashboard" className='flex items-center space-x-2 text-gray-700 font-medium hover:text-blue-600'> 
            <FaHome size={20} color="gray" /> 
            <span>Dashboard</span>
          </Link>
          <Link to="/expenses" className='flex items-center space-x-2 text-gray-700 font-medium hover:text-blue-600'> 
            <BsJournalText size={20} color="gray" /> 
            <span>Expense</span>
          </Link>
          <Link to="/calendar" className='flex items-center space-x-2 text-gray-700 font-medium hover:text-blue-600'> 
            <FaRegCalendarAlt size={20} color="gray" /> 
            <span>Calendar</span>
          </Link>   
        </div>   
      </aside>

      {/* Mobile slide-over */}
      <div className={`fixed inset-0 z-40 md:hidden pointer-events-none ${isOpen ? 'pointer-events-auto' : ''}`} aria-hidden={!isOpen}>
        {/* overlay */}
        <div className={`absolute inset-0 bg-black transition-opacity ${isOpen ? 'opacity-50' : 'opacity-0'}`} onClick={onClose} />

        <aside className={`absolute left-0 top-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className='p-4 flex items-center justify-between'>
            <h2 className='text-xl font-bold text-blue-600'>Dashboard</h2>
            <button onClick={onClose} className='p-2 rounded-md hover:bg-gray-100'>
              <AiOutlineClose size={20} />
            </button>
          </div>
          <div className='p-4 flex flex-col space-y-4'>
            <Link to="/dashboard" onClick={onClose} className='flex items-center space-x-2 text-gray-700 font-medium hover:text-blue-600'> 
              <FaHome size={18} color="gray" /> 
              <span>Dashboard</span>
            </Link>
            <Link to="/expenses" onClick={onClose} className='flex items-center space-x-2 text-gray-700 font-medium hover:text-blue-600'> 
              <BsJournalText size={18} color="gray" /> 
              <span>Expense</span>
            </Link>
            <Link to="/calendar" onClick={onClose} className='flex items-center space-x-2 text-gray-700 font-medium hover:text-blue-600'> 
              <FaRegCalendarAlt size={18} color="gray" /> 
              <span>Calendar</span>
            </Link>   
          </div>
        </aside>
      </div>
    </>
  )
}

export default Sidebar
