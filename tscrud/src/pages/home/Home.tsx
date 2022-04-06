import { Link } from "react-router-dom";
import { Card, Container, CardTitle } from "./Home.styles"

function Home() {

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