import React from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";


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
        <div className='bg-white rounded-xl shadow p-6 mb-6 min-h-[35vh]
            grid grid-cols-1 lg:grid-cols-2 gap-6
            '>
                
                <div className="bg-white p-6 rounded-xl shadow h-80">
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
                <div className="bg-white p-6 rounded-xl shadow h-80">
                <h2 className="text-lg font-semibold mb-4 text-gray-400">Expenses by Date</h2>
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
                    <div className = 'grid grid-cols-3 gap-4 text-sm'>
                        <span>Category</span>
                        <span>Amount</span>
                        <span>Date</span>
                    </div>
                    {recentTransactions.length === 0 ? <h2 className='text-center py-10 text-gray-400'>No Recent Transactions</h2> :
                    recentTransactions.map((row)=>{
                        return <div key={row.id} className='grid grid-cols-3 gap-4
                        text-sm'>
                            
                                <span>{row.category}</span>
                                <span className='font-semibold text-red-600'>{row.amount}</span>
                                <span>{row.date}</span>
                                
                        </div>
                    })
                    }
                    
                </div>
        </div>
      </main>

  )
}

export default Dashboard
