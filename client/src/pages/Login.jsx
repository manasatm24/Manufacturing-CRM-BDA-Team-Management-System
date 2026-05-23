import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as apiLogin } from '../services/authService'
import AuthContext from '../context/AuthContext'
import ToastContext from '../context/ToastContext'

export default function Login(){
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const { showToast } = useContext(ToastContext)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault(); setLoading(true)
    // simple validation
    if (!form.email || !form.password) { showToast('Please fill email and password','error'); setLoading(false); return }
    try {
      const res = await apiLogin(form)
      login(res.data.token, res.data.user)
      showToast('Login successful','success')
      navigate('/')
    } catch (err) {
      showToast(err.response?.data?.msg || 'Login failed','error')
    } finally { setLoading(false) }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded bg-white p-6 shadow">
        <h2 className="mb-1 text-2xl font-bold text-brand-500">Login</h2>
        <p className="mb-4 text-sm text-slate-500">Access the manufacturing CRM dashboard.</p>
        <input className="mb-3 w-full rounded border p-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input type="password" className="mb-3 w-full rounded border p-2" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <button className="w-full rounded bg-brand-500 p-2 font-medium text-white hover:bg-brand-700" disabled={loading}>{loading? 'Logging in...' : 'Login'}</button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-brand-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}
