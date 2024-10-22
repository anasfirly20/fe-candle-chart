import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

export const Navbar = (): JSX.Element => {
  return (
    <nav className="px-xl py-sm flex justify-between items-center">
      <Link to="/">
        <img src={logo} width={40} height={40} alt="logo" />
      </Link>
    </nav>
  );
};
