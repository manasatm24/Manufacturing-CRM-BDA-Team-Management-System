import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AuthContext from '../context/AuthContext'
import ToastContext from '../context/ToastContext'
import api from '../services/api'

export default function EditLead(){
  const { id } = useParams()
  const { token } = useContext(AuthContext)
  const { showToast } = useContext(ToastContext)
  const [form, setForm] = useState({ clientName:'', companyName:'', phone:'', email:'', status:'new', notes:'', assignedTo:'', followUpDate:'' })
  const [loading, setLoading] = useState(false)
  const [employees, setEmployees] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    if (!token) return
    api.get(`/leads/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setForm({ ...res.data, assignedTo: res.data.assignedTo?._id || '' }))
      .catch(()=>showToast('Failed to load lead','error'))
    api.get('/employees', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setEmployees(res.data))
  },[id,token])

  const submit = async (e)=>{
    e.preventDefault(); setLoading(true)
    try {
      await api.put(`/leads/${id}`, form, { headers: { Authorization: `Bearer ${token}` } })
      showToast('Lead updated','success')
      navigate('/leads')
    } catch (err) { showToast('Failed to update','error') }
    finally { setLoading(false) }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="mb-4 text-brand-500">Edit Lead</h2>
          <form onSubmit={submit} className="space-y-2 max-w-md bg-white p-4 rounded shadow">
            <input placeholder="Client Name" value={form.clientName} onChange={e=>setForm({...form,clientName:e.target.value})} className="w-full p-2 border rounded" />
            <input placeholder="Company" value={form.companyName} onChange={e=>setForm({...form,companyName:e.target.value})} className="w-full p-2 border rounded" />
            <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="w-full p-2 border rounded" />
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full p-2 border rounded" />
            <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="w-full p-2 border rounded">
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="follow-up">Follow-up</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
            <select value={form.assignedTo} onChange={e=>setForm({...form,assignedTo:e.target.value})} className="w-full p-2 border rounded">
              <option value="">Unassigned</option>
              {employees.map(e=><option key={e._id} value={e._id}>{e.name}</option>)}
            </select>
            <input type="date" value={form.followUpDate?form.followUpDate.slice(0,10):''} onChange={e=>setForm({...form,followUpDate:e.target.value})} className="w-full p-2 border rounded" />
            <textarea placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} className="w-full p-2 border rounded" />
            <button className="bg-brand-500 text-white px-4 py-2 rounded" disabled={loading}>{loading? '...' : 'Update'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
