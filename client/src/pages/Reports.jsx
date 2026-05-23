import React, { useEffect, useState, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AuthContext from '../context/AuthContext'
import api from '../services/api'

export default function Reports(){
  const { token } = useContext(AuthContext)
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if (!token) return
    setLoading(true)
    api.get('/leads', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setLeads(res.data))
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
          <h2 className="mb-4 text-brand-500">Reports</h2>
          {loading? <div>Loading...</div> : (
            <>
              <div className="mb-4">
                <h3 className="font-bold">Daily Leads ({today})</h3>
                <div>Total: {daily.length}</div>
              </div>
              <div className="mb-4">
                <h3 className="font-bold">Monthly Leads ({today.slice(0,7)})</h3>
                <div>Total: {monthly.length}</div>
              </div>
              <div className="mb-4">
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
