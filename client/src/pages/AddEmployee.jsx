import React, { useState, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AuthContext from '../context/AuthContext'
import ToastContext from '../context/ToastContext'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function AddEmployee(){
  const { token } = useContext(AuthContext)
  const { showToast } = useContext(ToastContext)
  const [form, setForm] = useState({ name:'', email:'', password:'', role: 'employee' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault(); setLoading(true)
    if (!form.name || !form.email || !form.password) { showToast('Fill all fields','error'); setLoading(false); return }
    if (form.password.length < 6) { showToast('Password must be 6+ chars','error'); setLoading(false); return }
    try {
      await api.post('/employees', form, { headers: { Authorization: `Bearer ${token}` } })
      showToast('Employee created','success')
      navigate('/employees')
    } catch (err) {
      showToast(err.response?.data?.msg || 'Failed to create','error')
    } finally { setLoading(false) }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="mb-4 text-xl font-bold text-brand-500">Add Employee</h2>
          <form onSubmit={submit} className="grid max-w-xl gap-4 rounded bg-white p-5 shadow">
            <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="rounded border p-2" />
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="rounded border p-2" />
            <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="rounded border p-2" />
            <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})} className="rounded border p-2">
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
            <button className="rounded bg-brand-500 px-4 py-2 font-medium text-white hover:bg-brand-700" disabled={loading}>{loading? 'Creating...' : 'Create Employee'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
