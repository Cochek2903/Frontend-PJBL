import { useEffect, useState } from "react";
import api from "../services/api";
import GPUCard from "../components/GPUCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [gpus, setGpus] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/gpus")
      .then(res => setGpus(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // 🔍 busca inteligente
  const filtered = gpus.filter(gpu =>
    `${gpu.nome} ${gpu.modelo} ${gpu.fabricante}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 📊 métricas
  const total = gpus.length;
  const semEstoque = gpus.filter(g => g.quantidade === 0).length;
  const disponiveis = total - semEstoque;

  return (
    <div className="bg-gray-100 min-h-screen text-gray-900">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          Placas de Vídeo
        </h1>

        <button
          onClick={() => navigate("/create")}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-sm"
        >
          Adicionar GPU
        </button>
      </div>

      {/* MÉTRICAS */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-xl font-semibold">{total}</p>
        </div>

        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Disponíveis</p>
          <p className="text-xl font-semibold text-green-500">
            {disponiveis}
          </p>
        </div>

        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Sem estoque</p>
          <p className="text-xl font-semibold text-red-500">
            {semEstoque}
          </p>
        </div>

      </div>

      {/* BUSCA */}
      <input
        placeholder="Buscar por nome, modelo ou fabricante..."
        className="mb-6 w-full p-3 rounded-xl bg-white border border-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-red-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LOADING */}
      {loading && (
        <p className="text-gray-500">Carregando GPUs...</p>
      )}

      {/* LISTA */}
      {!loading && filtered.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(gpu => (
            <div key={gpu.id} className="relative">

              {/* STATUS */}
              <span
                className={`absolute top-3 right-3 px-2 py-1 text-xs rounded-full ${
                  gpu.quantidade === 0
                    ? "bg-red-100 text-red-500"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {gpu.quantidade === 0 ? "Sem estoque" : "Disponível"}
              </span>

              <GPUCard
                gpu={gpu}
                onEdit={(id) => navigate(`/edit/${id}`)}
                onView={(id) => navigate(`/view/${id}`)}
              />
            </div>
          ))}
        </div>
      )}

      {/* VAZIO */}
      {!loading && filtered.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          <p>Nenhuma GPU encontrada.</p>
        </div>
      )}

    </div>
  );
}