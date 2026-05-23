import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export default function Sidebar(){
  const { user } = useContext(AuthContext)
  const linkClass = ({ isActive }) => (
    `rounded px-3 py-2 text-sm font-medium transition ${
      isActive ? 'bg-brand-500 text-white' : 'text-slate-700 hover:bg-brand-50 hover:text-brand-700'
    }`
  )

  return (
    <aside className="min-h-screen w-64 shrink-0 border-r border-slate-200 bg-white p-4">
      <div className="mb-6">
        <div className="text-lg font-bold text-brand-700">Manufacturing CRM</div>
        <div className="text-xs uppercase tracking-wide text-slate-500">{user?.role || 'employee'} workspace</div>
      </div>
      <nav className="flex flex-col gap-2">
        <NavLink to="/" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/leads" className={linkClass}>Leads</NavLink>
        <NavLink to="/leads/add" className={linkClass}>Add Lead</NavLink>
        <NavLink to="/employees" className={linkClass}>Employees</NavLink>
        {user?.role === 'admin' && <NavLink to="/employees/add" className={linkClass}>Add Employee</NavLink>}
        <NavLink to="/reports" className={linkClass}>Reports</NavLink>
        <NavLink to="/profile" className={linkClass}>Profile</NavLink>
      </nav>
    </aside>
  )
}
