import Image from "next/image";

import logo from "@/assets/svg/Logo_Polcode.svg";

const Header: React.FC = async () => (
  <nav className="h-16 flex items-center justify-between px-10 bg-slate-200 flex-none">
    <Image src={logo} alt="logo polcode" height={40} />

    <p>Paweł Wasilonek</p>
  </nav>
);

export default Header;
