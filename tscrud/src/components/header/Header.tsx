import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const { handleLogout, login } = useContext<any>(AuthContext);

  return (
    <>
      <div>Header</div>
      {login && 
      <button onClick={handleLogout}>Logout</button>}
    </>
  );
}

export default Header;
