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
          <h2 className="mb-4 text-brand-500">Add Employee</h2>
          <form onSubmit={submit} className="space-y-2 max-w-md bg-white p-4 rounded shadow">
            <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full p-2 border rounded" />
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full p-2 border rounded" />
            <input placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full p-2 border rounded" />
            <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})} className="w-full p-2 border rounded">
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
            <button className="bg-brand-500 text-white px-4 py-2 rounded" disabled={loading}>{loading? '...' : 'Create'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
