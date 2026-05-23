import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AuthContext from '../context/AuthContext'

export default function Profile(){
  const { user } = useContext(AuthContext)
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="mb-4 text-xl font-bold text-brand-500">Profile</h2>
          <div className="max-w-xl rounded bg-white p-5 shadow">
            <div className="mb-4 h-14 w-14 rounded-full bg-brand-500 text-center text-2xl font-bold leading-[56px] text-white">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="grid gap-3 text-sm">
              <div><span className="font-semibold text-slate-600">Name:</span> {user?.name}</div>
              <div><span className="font-semibold text-slate-600">Email:</span> {user?.email}</div>
              <div><span className="font-semibold text-slate-600">Role:</span> <span className="capitalize">{user?.role}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
