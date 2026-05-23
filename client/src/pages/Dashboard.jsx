import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import api from '../services/api'
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function Dashboard(){
  const { token } = useContext(AuthContext)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if (!token) return
    setLoading(true)
    api.get('/dashboard/stats', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setStats(res.data))
      .catch(err => console.error(err))
      .finally(()=>setLoading(false))
  },[token])

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="mb-4 text-2xl font-bold text-brand-700">Dashboard</h1>
          {loading && <div className="mb-4 rounded bg-white p-4 shadow">Loading dashboard...</div>}
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded bg-white p-4 shadow"><div className="text-sm text-slate-500">Total Leads</div><div className="text-3xl font-bold text-brand-700">{stats?.totalLeads || 0}</div></div>
            <div className="rounded bg-white p-4 shadow"><div className="text-sm text-slate-500">Converted Leads</div><div className="text-3xl font-bold text-green-600">{stats?.converted || 0}</div></div>
            <div className="rounded bg-white p-4 shadow"><div className="text-sm text-slate-500">Pending Follow-ups</div><div className="text-3xl font-bold text-amber-600">{stats?.pending || 0}</div></div>
          </div>

          <div className="mb-6 rounded bg-white p-4 shadow">
            <h3 className="mb-2 font-semibold text-brand-700">Monthly Sales Analytics</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={(stats?.monthlyAgg || []).map(i=>({ month: i._id, count: i.count }))}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#0b3b66" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded bg-white p-4 shadow">
            <h3 className="mb-2 font-semibold text-brand-700">Employee Performance</h3>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={(stats?.perf || []).map(e=>({ name: e.name || 'Unassigned', converted: e.converted }))}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="converted" fill="#0b3b66" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
