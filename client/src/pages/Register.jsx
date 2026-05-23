import React, { useState, useContext } from 'react'
import { register as apiRegister } from '../services/authService'
import { Link, useNavigate } from 'react-router-dom'
import ToastContext from '../context/ToastContext'

export default function Register(){
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { showToast } = useContext(ToastContext)

  const submit = async (e) => {
    e.preventDefault(); setLoading(true)
    // validation
    if (!form.name || !form.email || !form.password) { showToast('Please fill all fields','error'); setLoading(false); return }
    if (form.password.length < 6) { showToast('Password must be 6+ chars','error'); setLoading(false); return }
    try {
      await apiRegister(form)
      showToast('Registered successfully','success')
      navigate('/login')
    } catch (err) {
      showToast(err.response?.data?.msg || 'Registration failed','error')
    } finally { setLoading(false) }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded bg-white p-6 shadow">
        <h2 className="mb-1 text-2xl font-bold text-brand-500">Create Account</h2>
        <p className="mb-4 text-sm text-slate-500">Register as an admin or employee to access CRM workflows.</p>
        <input className="mb-3 w-full rounded border p-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input className="mb-3 w-full rounded border p-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input type="password" className="mb-3 w-full rounded border p-2" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <select className="mb-3 w-full rounded border p-2" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <button className="w-full rounded bg-brand-500 p-2 font-medium text-white hover:bg-brand-700" disabled={loading}>{loading? 'Creating...' : 'Register'}</button>
        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account? <Link to="/login" className="font-medium text-brand-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  )
}
