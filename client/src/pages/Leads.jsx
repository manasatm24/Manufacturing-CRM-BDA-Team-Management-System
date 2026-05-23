import React, { useEffect, useState, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AuthContext from '../context/AuthContext'
import ToastContext from '../context/ToastContext'
import { getLeads, deleteLead } from '../services/leadService'
import { useNavigate } from 'react-router-dom'

export default function Leads(){
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const { showToast } = useContext(ToastContext)

  const load = async () => {
    setLoading(true)
    try {
      const res = await getLeads(token, { search, status })
      setLeads(res.data)
    } catch (err) {
      showToast('Failed to load leads','error')
    } finally { setLoading(false) }
  }

  useEffect(()=>{ if (token) load() }, [token, search, status])

  const remove = async (id) => {
    if (!confirm('Delete lead?')) return
    try {
      await deleteLead(token, id)
      showToast('Lead deleted','success')
      load()
    } catch (err) { showToast('Failed to delete','error') }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="mb-4 text-xl font-bold text-brand-500">Leads</h2>
          <div className="mb-4 flex flex-col gap-2 md:flex-row">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by client name" className="rounded border p-2" />
            <select value={status} onChange={e=>setStatus(e.target.value)} className="rounded border p-2">
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="follow-up">Follow-up</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
          </div>
          {loading? <div>Loading...</div> : (
            <div className="overflow-x-auto bg-white rounded shadow">
              <table className="w-full table-auto text-left text-sm">
                <thead className="bg-brand-50 text-brand-700"><tr><th className="p-3">Client</th><th className="p-3">Company</th><th className="p-3">Status</th><th className="p-3">Assigned</th><th className="p-3">Follow-up</th><th className="p-3">Actions</th></tr></thead>
                <tbody>
                  {leads.map(l=> (
                    <tr key={l._id} className="border-t hover:bg-gray-50">
                      <td className="p-3 font-medium">{l.clientName}</td>
                      <td className="p-3">{l.companyName}</td>
                      <td className="p-3 capitalize">{l.status}</td>
                      <td className="p-3">{l.assignedTo?.name || 'Unassigned'}</td>
                      <td className="p-3">{l.followUpDate ? l.followUpDate.slice(0,10) : '-'}</td>
                      <td className="flex gap-2 p-3">
                        <button onClick={()=>navigate(`/leads/edit/${l._id}`)} className="text-blue-600">Edit</button>
                        <button onClick={()=>remove(l._id)} className="text-red-600">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && <tr><td className="p-3" colSpan="6">No leads found.</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
