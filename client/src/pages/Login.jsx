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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="w-full max-w-md p-6 shadow rounded bg-white">
        <h2 className="text-2xl mb-4 text-brand-500">Login</h2>
        <input className="w-full p-2 mb-2 border rounded" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input type="password" className="w-full p-2 mb-2 border rounded" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <button className="w-full bg-brand-500 text-white p-2 rounded" disabled={loading}>{loading? '...' : 'Login'}</button>
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
