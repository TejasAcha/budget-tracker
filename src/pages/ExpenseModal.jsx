import React from 'react'
import { EXPENSE_CATEGORIES } from './ExpensesPage'

const ExpenseModal = ({form, onAddExpense, onCancelButton, handleExpenseForm, modal}) => {
  return (
    <div className='fixed inset-0
        bg-black/40
        flex items-center justify-center backdrop-blur-sm
        z-50' onClick={onCancelButton} >
            <div className='bg-white
            w-full max-w-md
            rounded-xl
            shadow-xl max-h-[90vh] overflow-y-auto
            p-6
            relative
            animate-scaleIn' onClick={(e) => {e.stopPropagation()}}>
                <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-lg font-semibold text-gray-800'>{modal} Expense</h3>
                    <button className='text-gray-400 hover:text-gray-600 cursor-pointer' onClick={onCancelButton}>X</button>
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='text-sm font-medium text-gray-700'>Amount</label>
                    <input type="text" className='border rounded-lg px-3 py-2
                    focus:ring focus:ring-blue-300
                    outline-none' placeholder='$1' name='amount' onChange={handleExpenseForm} value={form.amount} />
                    <label className='text-sm font-medium text-gray-700'>Category</label>
                    <select name="category" id="" className='border rounded-lg px-3 py-2
                    focus:ring focus:ring-blue-300
                    outline-none' onChange={handleExpenseForm} value={form.category}>
                        <option value="All Catogories"> All Catogories</option>
                        {EXPENSE_CATEGORIES.map((category)=>{
                            return <option value={category} key={category}>{category}</option>
                        })}
                    </select>
                    <label className='text-sm font-medium text-gray-700'>Description</label>
                    <input type="text" className='border rounded-lg px-3 py-2
                    focus:ring focus:ring-blue-300
                    outline-none' placeholder='Description..' name='description' onChange={handleExpenseForm} value={form.description}/>
                    <label className='text-sm font-medium text-gray-700'>Date</label>
                    <input type="date" name="date" className='border rounded-lg px-3 py-2
                    focus:ring focus:ring-blue-300
                    outline-none' onChange={handleExpenseForm} value={form.date}/>
                </div>
                <div className='flex justify-end gap-3 mt-6'>
                    <button className='px-4 py-2
                    rounded-lg
                    border
                    text-gray-600
                    hover:bg-gray-100' onClick={onCancelButton}>Cancel</button>
                    <button className='px-4 py-2
                    rounded-lg
                    bg-blue-600 text-white
                    hover:bg-blue-700' onClick={onAddExpense}>{modal} Expense</button>
                </div>
            </div>
        </div>
  )
}

export default ExpenseModal
