import React, { useEffect, useState, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AuthContext from '../context/AuthContext'
import api from '../services/api'

export default function Employees(){
  const { token } = useContext(AuthContext)
  const [employees, setEmployees] = useState([])

  useEffect(()=>{
    if (!token) return
    api.get('/employees', { headers: { Authorization: `Bearer ${token}` } })
      .then(res=>setEmployees(res.data))
      .catch(()=>{})
  },[token])

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="mb-4">Employees</h2>
          <ul>
            {employees.map(e=> <li key={e._id}>{e.name} - {e.email}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
