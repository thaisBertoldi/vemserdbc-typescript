import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const { handleLogout } = useContext<any>(AuthContext);

  return (
    <>
      <div>Header</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Header;
