import React, { useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid';
import ExpenseModal from './ExpenseModal';
import Sidebar from '../components/Sidebar';
import { useOutletContext } from 'react-router-dom';

const ExpensesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [form, setForm] = useState({
        amount: '',
        category: '',
        description:'',
        date:''
    })
    // const [expenseList, setExpenseList] = useState([]);
    const { expenseList, setExpenseList } = useOutletContext();
    const [editForm, setEditForm] = useState({
        amount: '',
        category: '',
        description:'',
        date:'',
        id:null
    })
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
            const newExpenseObject = {...form, id: uuidv4()}
            setExpenseList(prevList => [...prevList, newExpenseObject]);
            setForm({amount: '',
            category: '',
            description:'',
            date:''})
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
        setEditForm(editRow)
    }

    const onEditExpense = (form) => {
        setExpenseList(prevList => prevList.map((row) => {
            if(row.id === form.id){
                return {
                    ...row,
                    amount: form.amount,
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
            id:null
        })
        setIsEditMode(false)
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
                focus:ring-blue-300 outline-none' />
                <select name="category" id="" className='border rounded-lg px-3 py-2 bg-white
                focus:ring focus:ring-blue-300 outline-none'>
                    <option value="All Catogories"> All Catogories</option>
                    <option value="Food">Food</option>
                    <option value="Outing">Outing</option>
                </select>
                <select name="date" id="" className='border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 outline-none'>
                    <option value="1-10-2025">1-10-2025</option>
                    <option value="1-10-2025">1-10-2025</option>
                    <option value="1-10-2025">1-10-2025</option>
                </select>
            </div>
        <div className='bg-white rounded-xl shadow p-4'>
            <div className='grid grid-cols-5 gap-4
            text-sm text-gray-500 font-medium
            pb-3 border-b'>
                <span>Category</span>
                <span>Description</span>
                <span>Date</span>
                <span>Amount</span>
                <span>Actions</span>
            </div>
            {
            expenseList.length === 0 ? <h2 className='text-center py-10 text-gray-400'>No Expenses added yet</h2> :
            expenseList.map((row)=>{
            return <div key={row.id} className='grid grid-cols-5 gap-4 items-center
            py-3 border-b last:border-none
            text-sm'>
                
                    <span>{row.category}</span>
                    <span>{row.description}</span>
                    <span>{row.date}</span>
                    <span className='font-semibold text-red-600'>{row.amount}</span>
                    <span className='flex gap-3'>
                        <button className='text-blue-600 hover:underline' onClick={() => editExpenseForm(row.id)}>Edit</button> | 
                        <button className='text-red-600 hover:underline' onClick={() => deleteExpense(row.id)}>Delete</button>
                    </span>
            </div>})}
            
        </div>
        {isModalOpen && <ExpenseModal form={form} onAddExpense={onAddExpense} onCancelButton={onCancelButton} handleExpenseForm={handleExpenseForm} modal={'Add'}/> }
        {isEditMode && <ExpenseModal form={editForm} onAddExpense={() => {onEditExpense(editForm)}} onCancelButton={()=> setIsEditMode(false)} handleExpenseForm={handleExpenseEditForm} modal={'Edit'}/> }
        </main>
        
  )
}

export default ExpensesPage
