import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import ToastContext from '../context/ToastContext'

export default function Navbar(){
  const { user, logout } = useContext(AuthContext)
  const { showToast } = useContext(ToastContext)
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <div className="text-sm font-semibold uppercase tracking-wide text-brand-500">CRM & BDA Operations</div>
        <div className="text-xs text-slate-500">Lead tracking, follow-ups and sales reporting</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-sm font-semibold text-slate-800">{user?.name}</div>
          <div className="text-xs capitalize text-slate-500">{user?.role}</div>
        </div>
        <button onClick={() => { logout(); showToast('Logged out','info') }} className="rounded bg-brand-500 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700">Logout</button>
      </div>
    </header>
  )
}
