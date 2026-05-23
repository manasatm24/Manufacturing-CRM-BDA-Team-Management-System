import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export default function Sidebar(){
  const { user } = useContext(AuthContext)
  return (
    <div className="w-64 bg-gray-100 min-h-screen p-4">
      <nav className="flex flex-col gap-2">
        <NavLink to="/" className={({isActive})=> isActive? 'font-bold':' '}>Dashboard</NavLink>
        <NavLink to="/leads">Leads</NavLink>
        <NavLink to="/leads/add">Add Lead</NavLink>
        <NavLink to="/employees">Employees</NavLink>
        {user?.role === 'admin' && <NavLink to="/employees/add">Add Employee</NavLink>}
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </div>
  )
}
