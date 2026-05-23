import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import api from '../services/api'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function Dashboard(){
  const { token } = useContext(AuthContext)
  const [stats, setStats] = useState(null)

  useEffect(()=>{
    if (!token) return
    api.get('/dashboard/stats', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setStats(res.data))
      .catch(err => console.error(err))
  },[token])

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 shadow">Total Leads: {stats?.totalLeads || 0}</div>
            <div className="p-4 shadow">Converted: {stats?.converted || 0}</div>
            <div className="p-4 shadow">Pending: {stats?.pending || 0}</div>
          </div>

          <div className="p-4 shadow mb-6">
            <h3 className="mb-2">Monthly Conversions</h3>
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

          <div className="p-4 shadow">
            <h3 className="mb-2">Employee Performance</h3>
            <table className="w-full table-auto">
              <thead><tr><th>Name</th><th>Converted Leads</th></tr></thead>
              <tbody>
                {(stats?.perf || []).map(e => (
                  <tr key={e.employeeId || e.name}>
                    <td>{e.name || 'Unassigned'}</td>
                    <td>{e.converted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}
