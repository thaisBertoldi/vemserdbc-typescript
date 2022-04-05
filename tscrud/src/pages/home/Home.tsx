import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Card, Container, CardTitle } from "./Home.styles"

function Home() {
  const getToken = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if(!getToken){
    navigate('/login')
  }
  }, [])

  return (
    <Container>
      <Card>
        <CardTitle><Link to='/users'>Users</Link></CardTitle>
      </Card>
      <Card>
        <CardTitle><Link to='/address'>Address</Link></CardTitle>
      </Card>
    </Container>
  )
}

export default Home