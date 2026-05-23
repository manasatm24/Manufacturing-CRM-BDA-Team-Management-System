import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import ToastContext from '../context/ToastContext'

export default function Navbar(){
  const { user, logout } = useContext(AuthContext)
  const { showToast } = useContext(ToastContext)
  return (
    <div className="flex items-center justify-between p-4 bg-brand-500 text-white">
      <div className="font-bold">Manufacturing CRM</div>
      <div className="flex items-center gap-4">
        <div>{user?.name}</div>
        <button onClick={() => { logout(); showToast('Logged out','info') }} className="bg-white text-brand-500 px-3 py-1 rounded">Logout</button>
      </div>
    </div>
  )
}
