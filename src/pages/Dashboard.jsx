import React, { useState, useEffect } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";
import { FiEdit } from 'react-icons/fi'


const Dashboard = () => {
    const { expenseList, setExpenseList } = useOutletContext();
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const categoryTotals = {}
    const chartData = []
    const lineChartData = []
    const dailyTotals = {}
    const navigate = useNavigate();

    const handlePieClick = (data, index) => {
        const categoryName = data.name;
        navigate('/expenses', { state: { filterCategory: categoryName } });
      }
    const recentTransactions = [...expenseList].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // Sort in descending order
    }).slice(0, 5); // Get the top 5 recent transactions
    let totalSpent = 0
    let monthlySpent = 0
    const STORAGE_KEY_BUDGET = 'budgetflow_monthly_budget'
    const [monthlyBudget, setMonthlyBudget] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY_BUDGET)
            const parsed = raw ? Number(raw) : NaN
            return Number.isFinite(parsed) ? parsed : 20000
        } catch (e) {
            return 20000
        }
    })
    const [isEditingBudget, setIsEditingBudget] = useState(false)
    const [budgetInput, setBudgetInput] = useState('')

    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEY_BUDGET, String(monthlyBudget)) } catch (e) {}
    }, [monthlyBudget])
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
    
    // Calculate totals: expenses (positive), profits (positive), net spent and balance
    let totalExpenses = 0
    let totalProfits = 0
    monthlyExpenseList.forEach(element => {
        const amt = Number(element.amount)
        if (amt < 0) totalExpenses += Math.abs(amt)
        else totalProfits += amt
    })

    const netSpent = totalExpenses - totalProfits // positive means net spending
    monthlySpent = netSpent
    balance = monthlyBudget - netSpent

    const balanceClass = balance >= 0 ? 'text-green-600' : 'text-red-600'

    monthlyExpenseList.forEach(element=>{
        if (categoryTotals[element.category] === undefined ) {
            categoryTotals[element.category] = 0
        }
        // use absolute amounts so pie chart receives positive values
        if (Number(element.amount) < 0) {
            categoryTotals[element.category] += Math.abs(Number(element.amount))
        }
    })

    console.log(categoryTotals);

    // categoryTotals.forEach(element => {
    //     chartData.push({
    //         categoryName: element,
    //         amount: categoryTotals[element]
    //     })
    // })

    Object.keys(categoryTotals).forEach(key => {
        const val = categoryTotals[key]
        if (val > 0) {
            chartData.push({ name: key, value: val })
        }
    })

    monthlyExpenseList.forEach(element=>{
        const dateString = element.date
        const dateObject = new Date(dateString);
        const day = dateObject.getDate()

        if (dailyTotals[day] === undefined ) {
            dailyTotals[day] = 0
        }
        dailyTotals[day] += Number(element.amount)
    })

    Object.keys(dailyTotals).sort((a, b) => a - b).forEach(key => {
        lineChartData.push({
            date: `${key} ${new Date().toLocaleString("en-IN", { month: "short" })}`,
            amount: dailyTotals[key]
        })
    })


    const COLORS = [
  "#F97316", // Food
  "#3B82F6", // Transport
  "#EC4899", // Shopping
  "#8B5CF6", // Entertainment
  "#22C55E", // Bills & Utilities
  "#EF4444", // Health
  "#0EA5E9", // Education
  "#F59E0B", // Travel
  "#14B8A6", // Subscriptions
  "#6B7280"  // Other
];
    
    
  return (

      <main className='flex-1 p-6'>
        <h1 className='text-2xl font-semibold mb-6'> Dashboard </h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                        <div className='bg-white rounded-xl shadow p-4 relative'>
                                {!isEditingBudget ? (
                                    <>
                                        <button aria-label="Edit monthly budget" onClick={() => { setIsEditingBudget(true); setBudgetInput(String(monthlyBudget)) }} className='absolute right-3 top-3 text-gray-500 hover:text-blue-600 p-1 rounded'>
                                            <FiEdit size={16} />
                                        </button>
                                        <h3 className='text-gray-500 text-sm'>Monthly Budget</h3>
                                        <p className='text-3xl font-extrabold'>{monthlyBudget.toLocaleString('en-IN')}</p>
                                    </>
                                ) : (
                                    <div className='flex items-center gap-2'>
                                        <input type='number' className='border rounded-lg px-2 py-1 w-32' value={budgetInput} onChange={(e) => setBudgetInput(e.target.value)} />
                                        <button className='px-3 py-1 bg-blue-600 text-white rounded' onClick={() => {
                                                const v = Number(budgetInput)
                                                if (Number.isFinite(v) && v >= 0) {
                                                        setMonthlyBudget(v)
                                                        setIsEditingBudget(false)
                                                }
                                        }}>Save</button>
                                        <button className='px-3 py-1 border rounded' onClick={() => setIsEditingBudget(false)}>Cancel</button>
                                    </div>
                                )}
                        </div>
            <div className='bg-white rounded-xl shadow p-4'>
                <h3 className='text-gray-500 text-sm'>Spent Overall</h3>
                <p className='text-2xl font-bold'>₹{Number(monthlySpent).toLocaleString('en-IN')}</p>
            </div>
            <div className='bg-white rounded-xl shadow p-4'>
                <h3 className='text-gray-500 text-sm'>Balance</h3>
                <p className={`text-2xl font-bold ${balanceClass}`}>{balance >= 0 ? `₹${Number(balance).toLocaleString('en-IN')}` : `-₹${Math.abs(Number(balance)).toLocaleString('en-IN')}`}</p>
            </div>
        </div>
        <div className='mb-6 grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow h-64 sm:h-80">
                {/* <div className="bg-white rounded-xl shadow p-6"> */}
                <h2 className="text-lg font-semibold mb-4 text-gray-400">Expenses by Category</h2>
                <div className="h-56">
                <ResponsiveContainer  width="100%" height="100%">
                    {chartData.length === 0 ? <h2 className='text-center py-10 text-gray-400'>No Data to display</h2> :
                    <PieChart>
                        <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        onClick={handlePieClick}
                        >
                        {chartData.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>

                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: 12 }}/>
                    </PieChart>
                }
                </ResponsiveContainer>
                </div>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow h-64 sm:h-80">
                <h2 className="text-lg font-semibold mb-4 text-gray-400">Cash Flow by Date</h2>
                <ResponsiveContainer width="100%" height="100%">
                    {lineChartData.length === 0 ? <h2 className='text-center py-10 text-gray-400'>No Data to display</h2> :
                    <LineChart  data={lineChartData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
                    
                    </LineChart>
}
                </ResponsiveContainer>
               </div>
                {/* </div> */}
        </div>   
            
        <div className='bg-white
            rounded-xl
            shadow
            p-6'>
                <h2 className='text-lg font-semibold mb-4'>Recent Transaction</h2>
                    <div className='space-y-3'>
                    <div className = 'grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm'>
                        <span>Category</span>
                        <span>Amount</span>
                        <span>Date</span>
                    </div>
                    {recentTransactions.length === 0 ? <h2 className='text-center py-10 text-gray-400'>No Recent Transactions</h2> :
                                        recentTransactions.map((row)=>{
                                                return <div key={row.id} className='grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm py-3 border-b last:border-none min-w-0'>
                                                                        <div>
                                                                            <div className='text-xs text-gray-400 sm:hidden'>Category</div>
                                                                            <div className='break-words'>{row.category}</div>
                                                                        </div>
                                                                                                                                <div className='min-w-0'>
                                                                                                                                        <div className='text-xs text-gray-400 sm:hidden'>Amount</div>
                                                                                                                                        {(() => {
                                                const amt = Number(row.amount)
                                                const isProfit = amt >= 0
                                                const cls = isProfit ? 'font-semibold text-green-600' : 'font-semibold text-red-600'
                                                const display = `${isProfit ? '' : '-'}₹${Math.abs(amt).toLocaleString('en-IN')}`
                                                  return <span className={`${cls} text-sm sm:text-base truncate block max-w-[120px] sm:max-w-none`}>{display}</span>
                                            })()}
                                                                                                                                </div>
                                                                        <div>
                                                                            <div className='text-xs text-gray-400 sm:hidden'>Date</div>
                                                                            <div className='text-sm text-gray-600'>{row.date}</div>
                                                                        </div>
                                                        </div>
                                        })
                    }
                    
                </div>
        </div>
      </main>

  )
}

export default Dashboard
