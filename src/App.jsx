import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ExpensesPage from './pages/ExpensesPage';
import CalendarPage from './pages/CalendarPage';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>

        <Route element={<MainLayout />}>
          <Route path='/' element={<Navigate to="/dashboard" />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/expenses' element={<ExpensesPage />}/>
          <Route path='/calendar' element={<CalendarPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>

    // <div /*className="p-6 bg-blue-500 text-black text-3xl"*/>
    //   {/* <Login /> */}
    //   {/* <Dashboard /> */}
    //   <ExpensesPage />
    // </div>
  );
}

export default App;