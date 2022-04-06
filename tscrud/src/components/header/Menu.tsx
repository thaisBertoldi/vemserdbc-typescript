import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <>
    <nav>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/address'>Address</Link></li>
            <li><Link to='/users'>Users</Link></li>
        </ul>
    </nav>
    </>
  )
}
