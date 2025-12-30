import React from 'react'
import { FaHome } from 'react-icons/fa'; 
import { FaRegCalendarAlt } from 'react-icons/fa';
import { BsJournalText } from 'react-icons/bs';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (

      <main className='flex-1 p-6'>
        <h1 className='text-2xl font-semibold mb-6'> Dashboard </h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
            <div className='bg-white
                rounded-xl
                shadow
                p-4'>
                <h3 className='text-gray-500 text-sm'>Monthly Budget</h3>
                <p className='text-2xl font-bold'>20,000</p>
            </div>
            <div className='bg-white
                rounded-xl
                shadow
                p-4'>
                <h3 className='text-gray-500 text-sm'>Spent Overall</h3>
                <p className='text-2xl font-bold'>10,000</p>
            </div>
            <div className='bg-white
                rounded-xl
                shadow
                p-4'>
                <h3 className='text-gray-500 text-sm'>Balance</h3>
                <p className='text-2xl font-bold'>10,000</p>
            </div>
        </div>
        <div className='bg-white
            rounded-xl
            shadow
            p-6
            mb-6
            h-64 
            lg:h-80
            flex
            items-center
            justify-center
            text-gray-400'>
                Chart will be added here
        </div>
        <div className='bg-white
            rounded-xl
            shadow
            p-6'>
                <h2 className='text-lg font-semibold mb-4'>Recent Transaction</h2>
                <div className='space-y-3'>
                    <div className = 'grid grid-cols-3 gap-4 text-sm'>
                        <span>Category</span>
                        <span>Amount</span>
                        <span>Date</span>
                    </div>
                    <div className = 'grid grid-cols-3 gap-4 text-sm'>
                        <span>Food</span>
                        <span>₹250</span>
                        <span>12 Sep</span>
                    </div>
                    <div className = 'grid grid-cols-3 gap-4 text-sm'>
                        <span>Food</span>
                        <span>₹250</span>
                        <span>12 Sep</span>
                    </div>
                </div>
        </div>
      </main>

  )
}

export default Dashboard
