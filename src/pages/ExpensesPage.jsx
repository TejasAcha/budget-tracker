import React, { useEffect, useMemo, useState } from 'react'

import { v4 as uuidv4 } from 'uuid';
import ExpenseModal from './ExpenseModal';
import Sidebar from '../components/Sidebar';
import { useOutletContext, useLocation } from 'react-router-dom';

export const EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Health",
  "Entertainment",
  "Education",
  "Work",
  "Others"
];

const ExpensesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [form, setForm] = useState({
        amount: '',
        category: '',
        description:'',
        date:'',
        type: 'expense'
    })
    // const [expenseList, setExpenseList] = useState([]);
    const { expenseList, setExpenseList } = useOutletContext();
    const [editForm, setEditForm] = useState({
        amount: '',
        category: '',
        description:'',
        date:'',
        type: 'expense',
        id:null
    })
    
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    // const [filteredExpenseList, setFilteredExpenseList] = useState(expenseList);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedMonth, setSelectedMonth] = useState('All');
    const [selectedDate, setSelectedDate] = useState('All Dates');
    const [searchDescription, setSearchDescription] = useState('');
    const uniqueDates = [...new Set(expenseList.map(e => e.date))];
    const location = useLocation();
    useEffect(() => {
        if (location.state && location.state.filterCategory) {
            setSelectedCategory(location.state.filterCategory);
        }
        if (location.state && location.state.filterMonth) {
            setSelectedMonth(location.state.filterMonth);
        }
        if (location.state && location.state.filterDate) {
            setSelectedDate(location.state.filterDate);
        }   
    }, [location.state]);
    const handleExpenseForm = (e) => {
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleExpenseEditForm = (e) => {
        setEditForm({...editForm,[e.target.name]:e.target.value})
    }
    
    const onExpenseModal = () => {
        setIsModalOpen(true)
    }
    const onCancelButton = () => {
        setIsModalOpen(false)
    }
    const onAddExpense = () => {
        
        if (form.amount !== '' && form.category!=='' && form.date!=='' && form.description!=='') {
            // ensure signed amount based on type
            const raw = Number(form.amount)
            const signedAmount = form.type === 'profit' ? Math.abs(raw) : -Math.abs(raw)
            const newExpenseObject = {...form, amount: signedAmount, id: uuidv4()}
            setExpenseList(prevList => [...prevList, newExpenseObject]);
            setForm({amount: '',
            category: '',
            description:'',
            date:'',
            type: 'expense'})
            setIsModalOpen(false)
        }
        else{
            console.log('error');      
        }    
    }

    const deleteExpense = (id) => {
        console.log(id);
        
        
        setExpenseList(prevList => prevList.filter(row =>  row.id !== id))
    }

    const editExpenseForm = (id) => {
        const editRow = expenseList.find(row=>row.id === id)
        setIsEditMode(true)
        // ensure edit form has a type
        const inferredType = editRow && Number(editRow.amount) >= 0 ? 'profit' : 'expense'
        setEditForm({...editRow, type: editRow.type || inferredType})
    }

    const onEditExpense = (form) => {
        setExpenseList(prevList => prevList.map((row) => {
            if(row.id === form.id){
                // ensure signed amount based on type
                const raw = Number(form.amount)
                const signedAmount = form.type === 'profit' ? Math.abs(raw) : -Math.abs(raw)
                return {
                    ...row,
                    amount: signedAmount,
                    type: form.type,
                    category: form.category,
                    description: form.description,
                    date: form.date,
                    id: form.id
                }
            }
            return row
        }))
        setEditForm({
            amount: '',
            category: '',
            description:'',
            date:'',
            type: 'expense',
            id:null
        })
        setIsEditMode(false)
    }

    const filteredExpenseList = useMemo(() => {
        // apply filters immediately using current/new values
        let filtered = expenseList || [];

        if (selectedCategory && selectedCategory !== 'All Categories') {
            filtered = filtered.filter(row => row.category === selectedCategory)
        }

        if (selectedMonth && selectedMonth !== 'All') {
            filtered = filtered.filter(row => {
                if (!row.date) return false
                const dateObject = new Date(row.date);
                const monthShort = dateObject.toLocaleString('en-IN', { month: 'short' }).toUpperCase()
                return monthShort === selectedMonth.toUpperCase()
            })
        }

        if(selectedDate && selectedDate !== 'All Dates'){
            filtered = filtered.filter(row => row.date === selectedDate)
        }

        if (searchDescription && searchDescription !== '') {
            filtered = filtered.filter(row => row.description.toLowerCase().includes(searchDescription.toLowerCase()))
        }

        return filtered
    }, [expenseList, selectedCategory, selectedMonth, selectedDate, searchDescription]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        // compute new selected values (because setState is async)
        
        if (name === 'Search') setSearchDescription(value)
        if (name === 'category') setSelectedCategory(value)
        if (name === 'month') setSelectedMonth(value)
        if (name === 'date') setSelectedDate(value)
    }

    const onClearFilter = () => {
        setSelectedCategory('All Categories')
        setSelectedMonth('All')
        setSelectedDate('All Dates')
        setSearchDescription('')
    }

    
    useEffect(() => {
            console.log(expenseList); 
            console.log(editForm);
            
        },[expenseList, editForm])
  return (
    
        <main className='flex-1 p-6'>
            <div className='flex items-center justify-between mb-6'>
                <h1 className='text-2xl font-semibold'>Expenses</h1>
                <button className='flex items-center gap-2
                px-4 py-2 rounded-lg
                bg-blue-600 text-white
                hover:bg-blue-700'
                onClick={onExpenseModal}
                >
                + Add Expense
                </button>
            </div>
            <div className='bg-white rounded-xl shadow
            p-4 mb-6
            flex flex-col md:flex-row gap-4'>
                <input type="text" name="Search" id="" className='flex-1 border rounded-lg px-3 py-2 focus:ring 
                focus:ring-blue-300 outline-none' value={searchDescription} onChange={handleFilterChange} />
                <select name="category" id="" value={selectedCategory} className='border rounded-lg px-3 py-2 bg-white
                focus:ring focus:ring-blue-300 outline-none' onChange={handleFilterChange}>
                    <option value="All Categories"> All Categories</option>
                    {EXPENSE_CATEGORIES.map((category)=>{
                        return <option value={category} key={category}>{category}</option>
                    })}
                </select>
                <select name="month" id="" value={selectedMonth} className='border rounded-lg px-3 py-2 bg-white
                focus:ring focus:ring-blue-300 outline-none' onChange={handleFilterChange}>
                    <option value="All"> All</option>
                    {months.map((month)=>{
                        return <option value={month} key={month}>{month} 2026</option>
                    })}
                </select>
                <select name="date" id=""  value={selectedDate} className='border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 
                outline-none' onChange={handleFilterChange}>
                    <option value="All Dates">All Dates</option>
                    {uniqueDates.map((date)=>{
                        return <option value={date} key={date}>{date}</option>
                    })}
                </select>
                <button className='flex items-center gap-2
                px-4 py-2 rounded-lg
                bg-blue-600 text-white
                hover:bg-blue-700'
                onClick={onClearFilter}
                >
                Clear
                </button>
            </div>
        <div className='bg-white rounded-xl shadow p-4 overflow-x-auto'>
            <div className='grid grid-cols-1 sm:grid-cols-5 gap-4
            text-sm text-gray-500 font-medium
            pb-3 border-b'>
                <span>Category</span>
                <span>Description</span>
                <span>Date</span>
                <span>Amount</span>
                <span>Actions</span>
            </div>
            {
            filteredExpenseList.length === 0 ? <h2 className='text-center py-10 text-gray-400'>No Expenses added yet</h2> :
                        filteredExpenseList.map((row)=>{
                        return <div key={row.id} className='grid grid-cols-1 sm:grid-cols-5 gap-4 items-start
                        py-3 border-b last:border-none
                        text-sm min-w-0'>
                                        <div>
                                            <div className='text-xs text-gray-400 sm:hidden'>Category</div>
                                            <div className='break-words'>{row.category}</div>
                                        </div>
                                        <div>
                                            <div className='text-xs text-gray-400 sm:hidden'>Description</div>
                                            <div className='break-words'>{row.description}</div>
                                        </div>
                                        <div>
                                            <div className='text-xs text-gray-400 sm:hidden'>Date</div>
                                            <div className='text-sm text-gray-600'>{row.date}</div>
                                        </div>
                                        <div>
                                            <div className='text-xs text-gray-400 sm:hidden'>Amount</div>
                                            {(() => {
                                                const amt = Number(row.amount)
                                                const isProfit = amt >= 0
                                                const cls = isProfit ? 'font-semibold text-green-600' : 'font-semibold text-red-600'
                                                const display = `${isProfit ? '' : '-'}₹${Math.abs(amt).toLocaleString('en-IN')}`
                                                  return <span className={`${cls} text-sm sm:text-base truncate block max-w-[120px] sm:max-w-none`}>{display}</span>
                                            })()}
                                        </div>
                                        <div className='flex gap-3 items-center'>
                                            <div className='text-xs text-gray-400 sm:hidden'>Actions</div>
                                            <div className='flex gap-3'>
                                                <button className='text-blue-600 hover:underline' onClick={() => editExpenseForm(row.id)}>Edit</button>
                                                <button className='text-red-600 hover:underline' onClick={() => deleteExpense(row.id)}>Delete</button>
                                            </div>
                                        </div>
                        </div>})}
            
        </div>
        {isModalOpen && <ExpenseModal form={form} onAddExpense={onAddExpense} onCancelButton={onCancelButton} handleExpenseForm={handleExpenseForm} modal={'Add'}/> }
        {isEditMode && <ExpenseModal form={editForm} onAddExpense={() => {onEditExpense(editForm)}} onCancelButton={()=> setIsEditMode(false)} handleExpenseForm={handleExpenseEditForm} modal={'Edit'}/> }
        </main>
        
  )
}

export default ExpensesPage
