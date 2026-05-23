import React, { useState, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AuthContext from '../context/AuthContext'
import { createLead } from '../services/leadService'
import { useNavigate } from 'react-router-dom'
import ToastContext from '../context/ToastContext'

export default function AddLead(){
  const { token } = useContext(AuthContext)
  const [form, setForm] = useState({ clientName:'', companyName:'', phone:'', email:'', status:'new', notes:'' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { showToast } = useContext(ToastContext)

  const submit = async (e)=>{
    e.preventDefault(); setLoading(true)
    if (!form.clientName) { showToast('Client name is required','error'); setLoading(false); return }
    try {
      await createLead(token, form)
      showToast('Lead created','success')
      navigate('/leads')
    } catch (err) { showToast('Failed to create lead','error') }
    finally { setLoading(false) }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="mb-4 text-brand-500">Add Lead</h2>
          <form onSubmit={submit} className="space-y-2 max-w-md bg-white p-4 rounded shadow">
            <input placeholder="Client Name" value={form.clientName} onChange={e=>setForm({...form,clientName:e.target.value})} className="w-full p-2 border rounded" />
            <input placeholder="Company" value={form.companyName} onChange={e=>setForm({...form,companyName:e.target.value})} className="w-full p-2 border rounded" />
            <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="w-full p-2 border rounded" />
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full p-2 border rounded" />
            <textarea placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} className="w-full p-2 border rounded" />
            <button className="bg-brand-500 text-white px-4 py-2 rounded">{loading? '...' : 'Create'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
