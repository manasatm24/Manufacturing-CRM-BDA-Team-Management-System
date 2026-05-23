import React, { useEffect, useState, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AuthContext from '../context/AuthContext'
import api from '../services/api'

export default function Employees(){
  const { token } = useContext(AuthContext)
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if (!token) return
    setLoading(true)
    api.get('/employees', { headers: { Authorization: `Bearer ${token}` } })
      .then(res=>setEmployees(res.data))
      .catch(()=>{})
      .finally(()=>setLoading(false))
  },[token])

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="mb-4 text-xl font-bold text-brand-500">Employees</h2>
          <div className="overflow-x-auto rounded bg-white shadow">
            <table className="w-full table-auto text-left text-sm">
              <thead className="bg-brand-50 text-brand-700">
                <tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Role</th></tr>
              </thead>
              <tbody>
                {loading && <tr><td className="p-3" colSpan="3">Loading employees...</td></tr>}
                {!loading && employees.map(e=> (
                  <tr key={e._id} className="border-t">
                    <td className="p-3 font-medium">{e.name}</td>
                    <td className="p-3">{e.email}</td>
                    <td className="p-3 capitalize">{e.role}</td>
                  </tr>
                ))}
                {!loading && employees.length === 0 && <tr><td className="p-3" colSpan="3">No employees found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
