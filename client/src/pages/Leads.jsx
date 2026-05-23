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
          <h2 className="text-xl mb-4 text-brand-500">Leads</h2>
          <div className="flex gap-2 mb-4">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by client name" className="p-2 border rounded" />
            <select value={status} onChange={e=>setStatus(e.target.value)} className="p-2 border rounded">
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
              <table className="w-full table-auto">
                <thead className="bg-gray-100"><tr><th className="p-2">Client</th><th className="p-2">Company</th><th className="p-2">Status</th><th className="p-2">Assigned</th><th className="p-2">Actions</th></tr></thead>
                <tbody>
                  {leads.map(l=> (
                    <tr key={l._id} className="border-t hover:bg-gray-50">
                      <td className="p-2">{l.clientName}</td>
                      <td className="p-2">{l.companyName}</td>
                      <td className="p-2">{l.status}</td>
                      <td className="p-2">{l.assignedTo?.name}</td>
                      <td className="p-2 flex gap-2">
                        <button onClick={()=>navigate(`/leads/edit/${l._id}`)} className="text-blue-600">Edit</button>
                        <button onClick={()=>remove(l._id)} className="text-red-600">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
