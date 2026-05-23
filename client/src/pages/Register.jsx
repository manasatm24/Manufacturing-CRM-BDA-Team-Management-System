import React, { useState, useContext } from 'react'
import { register as apiRegister } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import ToastContext from '../context/ToastContext'

export default function Register(){
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { showToast } = useContext(ToastContext)

  const submit = async (e) => {
    e.preventDefault(); setLoading(true)
    // validation
    if (!form.name || !form.email || !form.password) { showToast('Please fill all fields','error'); setLoading(false); return }
    if (form.password.length < 6) { showToast('Password must be 6+ chars','error'); setLoading(false); return }
    try {
      const res = await apiRegister(form)
      showToast('Registered successfully','success')
      navigate('/login')
    } catch (err) {
      showToast(err.response?.data?.msg || 'Registration failed','error')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="w-full max-w-md p-6 shadow rounded bg-white">
        <h2 className="text-2xl mb-4 text-brand-500">Register</h2>
        <input className="w-full p-2 mb-2 border rounded" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input className="w-full p-2 mb-2 border rounded" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input type="password" className="w-full p-2 mb-2 border rounded" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <button className="w-full bg-brand-500 text-white p-2 rounded" disabled={loading}>{loading? '...' : 'Register'}</button>
      </form>
    </div>
  )
}
