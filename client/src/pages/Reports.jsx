import React, { useEffect, useState, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AuthContext from '../context/AuthContext'
import api from '../services/api'

export default function Reports(){
  const { token } = useContext(AuthContext)
  const [leads, setLeads] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if (!token) return
    setLoading(true)
    Promise.all([
      api.get('/leads', { headers: { Authorization: `Bearer ${token}` } }),
      api.get('/reports/summary', { headers: { Authorization: `Bearer ${token}` } })
    ])
      .then(([leadsRes, reportRes]) => { setLeads(leadsRes.data); setSummary(reportRes.data) })
      .finally(()=>setLoading(false))
  },[token])

  // Simple daily/monthly report
  const today = new Date().toISOString().slice(0,10)
  const daily = leads.filter(l=>l.createdAt && l.createdAt.slice(0,10) === today)
  const monthly = leads.filter(l=>l.createdAt && l.createdAt.slice(0,7) === today.slice(0,7))
  const converted = leads.filter(l=>l.status==='converted')

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="mb-4 text-xl font-bold text-brand-500">Reports</h2>
          {loading? <div>Loading...</div> : (
            <>
              <div className="mb-4 grid gap-4 md:grid-cols-3">
                <div className="rounded bg-white p-4 shadow"><div className="text-sm text-slate-500">Daily Leads</div><div className="text-2xl font-bold text-brand-700">{summary?.daily?.total ?? daily.length}</div></div>
                <div className="rounded bg-white p-4 shadow"><div className="text-sm text-slate-500">Monthly Leads</div><div className="text-2xl font-bold text-brand-700">{summary?.monthly?.total ?? monthly.length}</div></div>
                <div className="rounded bg-white p-4 shadow"><div className="text-sm text-slate-500">Conversion Rate</div><div className="text-2xl font-bold text-green-600">{summary?.conversion?.rate ?? 0}%</div></div>
              </div>
              <div className="mb-4 rounded bg-white p-4 shadow">
                <h3 className="font-bold">Daily Leads ({today})</h3>
                <div>Total: {daily.length}</div>
              </div>
              <div className="mb-4 rounded bg-white p-4 shadow">
                <h3 className="font-bold">Monthly Leads ({today.slice(0,7)})</h3>
                <div>Total: {monthly.length}</div>
              </div>
              <div className="mb-4 rounded bg-white p-4 shadow">
                <h3 className="font-bold">Converted Leads</h3>
                <div>Total: {converted.length}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
