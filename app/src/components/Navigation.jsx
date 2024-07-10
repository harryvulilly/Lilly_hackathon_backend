import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="py-4 min-w-full flex bg-[#d52b1e] text-white text-2xl">
      <Link className="flex" to="/home">
        <img
          src="https://www.pngkey.com/png/full/216-2163239_lilly-logo-eli-lilly-and-company.png"
          alt="Lilly Logo"
          width={50}
          height={50}
          className="mx-5"
        />
        <h1 className="pr-5">New Employee Resources</h1>
      </Link>
    </nav>
  );
}

export default Navigation;
