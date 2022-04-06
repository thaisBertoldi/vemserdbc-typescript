import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  ButtonLogout,
  ContainerHeader,
  HeaderButton,
  HeaderLogo,
  HeaderMenu,
} from "./Header.styles";
import Logo from "./Logo";
import Menu from "./Menu";

function Header() {
  const { handleLogout, isToken } = useContext<any>(AuthContext);

  return (
    <ContainerHeader>
      {isToken && (
        <div>
          <HeaderLogo>
            <Logo />
          </HeaderLogo>
          <HeaderMenu>
            <Menu />
          </HeaderMenu>
          <HeaderButton>
            <ButtonLogout onClick={handleLogout}>Logout</ButtonLogout>
          </HeaderButton>
        </div>
      )}
    </ContainerHeader>
  );
}

export default Header;
