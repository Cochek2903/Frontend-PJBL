import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/*Nome */}
        <Link 
          to="/" 
          className="text-lg font-semibold text-gray-900 tracking-tight hover:opacity-80 transition"
        >
          João Pedro Cochek Giovannoni
        </Link>

        {/* Navegação */}
        <nav className="flex items-center gap-6 text-sm">
          <Link 
            to="/" 
            className="text-gray-500 hover:text-red-500 transition"
          >
            Voltar
          </Link>
        </nav>

      </div>
    </header>
  );
}