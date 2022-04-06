import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Logo from "./Logo";
import Menu from "./Menu";

function Header() {
  const { handleLogout, isToken } = useContext<any>(AuthContext);


  return (
    <header>
      {isToken && (
        <>
          <Logo />
          <Menu />
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </header>
  );
}

export default Header;
