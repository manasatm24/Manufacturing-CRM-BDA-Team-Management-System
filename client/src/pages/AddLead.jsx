import React, { useEffect, useState, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AuthContext from '../context/AuthContext'
import { createLead } from '../services/leadService'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import ToastContext from '../context/ToastContext'

export default function AddLead(){
  const { token } = useContext(AuthContext)
  const [form, setForm] = useState({ clientName:'', companyName:'', phone:'', email:'', status:'new', assignedTo:'', followUpDate:'', notes:'' })
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { showToast } = useContext(ToastContext)

  useEffect(()=>{
    if (!token) return
    api.get('/employees', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setEmployees(res.data))
      .catch(() => showToast('Failed to load employees','error'))
  },[token])

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
          <h2 className="mb-4 text-xl font-bold text-brand-500">Add Lead</h2>
          <form onSubmit={submit} className="grid max-w-3xl gap-4 rounded bg-white p-5 shadow md:grid-cols-2">
            <input placeholder="Client Name" value={form.clientName} onChange={e=>setForm({...form,clientName:e.target.value})} className="rounded border p-2" />
            <input placeholder="Company Name" value={form.companyName} onChange={e=>setForm({...form,companyName:e.target.value})} className="rounded border p-2" />
            <input placeholder="Phone Number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="rounded border p-2" />
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="rounded border p-2" />
            <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="rounded border p-2">
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="follow-up">Follow-up</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
            <select value={form.assignedTo} onChange={e=>setForm({...form,assignedTo:e.target.value})} className="rounded border p-2">
              <option value="">Assign Employee</option>
              {employees.map(e=><option key={e._id} value={e._id}>{e.name}</option>)}
            </select>
            <input type="date" value={form.followUpDate} onChange={e=>setForm({...form,followUpDate:e.target.value})} className="rounded border p-2" />
            <textarea placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} className="rounded border p-2 md:col-span-2" />
            <button className="rounded bg-brand-500 px-4 py-2 font-medium text-white hover:bg-brand-700 md:col-span-2" disabled={loading}>{loading? 'Creating...' : 'Create Lead'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
