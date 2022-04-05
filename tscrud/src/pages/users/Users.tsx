import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Users() {
  const getToken = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if(!getToken){
    navigate('/login')
  }
  }, [])
  return (
    <div>Users</div>
  )
}

export default Users