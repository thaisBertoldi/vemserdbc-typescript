import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
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
        <CardTitle>Users</CardTitle>
      </Card>
      <Card>
        <CardTitle>Address</CardTitle>
      </Card>
    </Container>
  )
}

export default Home