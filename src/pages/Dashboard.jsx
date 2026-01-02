import React from 'react'
import { useOutletContext } from 'react-router-dom';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";


const Dashboard = () => {
    const { expenseList, setExpenseList } = useOutletContext();
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const categoryTotals = {}
    const chartData = []
    let totalSpent = 0
    let monthlySpent = 0
    const monthlyBudget = 20000
    let balance = 0
    expenseList.forEach(element => {
        totalSpent += Number(element.amount)
    });
    const monthlyExpenseList = expenseList.filter((row) => {
        const dateString = row.date
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear()
        const month = dateObject.getMonth()

        if (year === currentYear && month === currentMonth) {
            
            return true
        }
    })
    
    monthlyExpenseList.forEach(element => {
        monthlySpent += Number(element.amount)
    });

    balance = monthlyBudget - monthlySpent

    monthlyExpenseList.forEach(element=>{
        if (categoryTotals[element.category] === undefined ) {
            categoryTotals[element.category] = 0
        }
        categoryTotals[element.category] += Number(element.amount)
    })

    console.log(categoryTotals);

    // categoryTotals.forEach(element => {
    //     chartData.push({
    //         categoryName: element,
    //         amount: categoryTotals[element]
    //     })
    // })

    Object.keys(categoryTotals).forEach(key => {
        chartData.push({
            name: key,
            value: categoryTotals[key]
        })
    })

    const COLORS = ["#3b82f6", "#22c55e"];
    
    
  return (

      <main className='flex-1 p-6'>
        <h1 className='text-2xl font-semibold mb-6'> Dashboard </h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
            <div className='bg-white
                rounded-xl
                shadow
                p-4'>
                <h3 className='text-gray-500 text-sm'>Monthly Budget</h3>
                <p className='text-2xl font-bold'>{monthlyBudget}</p>
            </div>
            <div className='bg-white
                rounded-xl
                shadow
                p-4'>
                <h3 className='text-gray-500 text-sm'>Spent Overall</h3>
                <p className='text-2xl font-bold'>{monthlySpent}</p>
            </div>
            <div className='bg-white
                rounded-xl
                shadow
                p-4'>
                <h3 className='text-gray-500 text-sm'>Balance</h3>
                <p className='text-2xl font-bold'>{balance}</p>
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
                

                {/* <div className="bg-white rounded-xl shadow p-6"> */}
                <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>
                <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                    <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    
                    >
                    {chartData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>
                </ResponsiveContainer>
               
                {/* </div> */}
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
