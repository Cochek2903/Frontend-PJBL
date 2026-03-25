import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function EditGPU() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [gpu, setGpu] = useState({
    nome: "",
    modelo: "",
    fabricante: "",
    ano_lancamento: "",
    preco: "",
    quantidade: "",
    descricao: "",
  });

  const [originalGpu, setOriginalGpu] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!id) return;

    api.get(`/gpus/${id}`)
      .then((res) => {
        const data = res.data;

        setGpu({
          nome: data.nome || "",
          modelo: data.modelo || "",
          fabricante: data.fabricante || "",
          ano_lancamento: data.ano_lancamento || "",
          preco: data.preco || "",
          quantidade: data.quantidade || "",
          descricao: data.descricao || "",
        });

        setOriginalGpu(data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Erro ao carregar GPU.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setGpu((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!gpu.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!gpu.modelo.trim()) newErrors.modelo = "Modelo é obrigatório";
    if (!gpu.fabricante.trim())
      newErrors.fabricante = "Fabricante é obrigatório";

    if (!gpu.ano_lancamento)
      newErrors.ano_lancamento = "Ano é obrigatório";

    if (!gpu.preco || Number(gpu.preco) <= 0)
      newErrors.preco = "Preço inválido";

    if (gpu.quantidade === "" || Number(gpu.quantidade) < 0)
      newErrors.quantidade = "Quantidade inválida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isChanged = () => {
    return JSON.stringify(gpu) !== JSON.stringify(originalGpu);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) {
      setMessage("Corrija os erros antes de salvar.");
      return;
    }

    if (!isChanged()) {
      setMessage("Nenhuma alteração foi feita.");
      return;
    }

    try {
      setSaving(true);

      await api.put(`/gpus/${id}`, {
        ...gpu,
        preco: Number(gpu.preco),
        quantidade: Number(gpu.quantidade),
        ano_lancamento: Number(gpu.ano_lancamento),
      });

      setMessage("Salvo com sucesso.");
      setTimeout(() => navigate("/"), 1200);

    } catch {
      setMessage("Erro ao salvar alterações.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await api.delete(`/gpus/${id}`);
      navigate("/");
    } catch {
      setMessage("Erro ao excluir.");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Carregando...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center pt-10 text-gray-900">

      <div className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-2xl shadow-sm">

        <h1 className="text-2xl font-semibold mb-6 tracking-tight">
          Editar GPU
        </h1>

        {message && (
          <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded text-sm text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {[
            { name: "nome", placeholder: "Nome" },
            { name: "modelo", placeholder: "Modelo" },
            { name: "fabricante", placeholder: "Fabricante" },
            { name: "ano_lancamento", placeholder: "Ano de lançamento" },
            { name: "preco", placeholder: "Preço" },
            { name: "quantidade", placeholder: "Quantidade" },
          ].map((field) => (
            <div key={field.name}>
              <input
                name={field.name}
                value={gpu[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full p-3 rounded-xl bg-white border border-gray-200 
                           focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          <textarea
            name="descricao"
            value={gpu.descricao}
            onChange={handleChange}
            placeholder="Descrição"
            className="w-full p-3 rounded-xl bg-white border border-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <div className="flex items-center justify-between pt-4">

            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="text-sm text-red-500 hover:text-red-600 transition"
            >
              Excluir GPU
            </button>

            <button
              type="submit"
              disabled={saving}
              className={`px-5 py-2 rounded-lg text-white transition ${
                saving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {saving ? "Salvando..." : "Salvar"}
            </button>

          </div>
        </form>

      </div>

      {/* MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

          <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-md shadow-lg">

            <h2 className="text-lg font-semibold mb-2">
              Excluir GPU
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Tem certeza que deseja excluir esta GPU? Essa ação não pode ser desfeita.
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition"
              >
                Cancelar
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  deleting
                    ? "bg-gray-300"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                {deleting ? "Excluindo..." : "Excluir"}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}