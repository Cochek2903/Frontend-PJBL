import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateGPU() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    modelo: "",
    fabricante: "",
    ano_lancamento: "",
    preco: "",
    quantidade: "",
    descricao: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!form.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!form.modelo.trim()) newErrors.modelo = "Modelo é obrigatório";
    if (!form.fabricante.trim())
      newErrors.fabricante = "Fabricante é obrigatório";

    if (!form.ano_lancamento)
      newErrors.ano_lancamento = "Ano é obrigatório";

    if (!form.preco || Number(form.preco) <= 0)
      newErrors.preco = "Preço deve ser maior que 0";

    if (form.quantidade === "" || Number(form.quantidade) < 0)
      newErrors.quantidade = "Quantidade inválida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) {
      setMessage("Corrija os erros antes de salvar.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/gpus", {
        ...form,
        preco: Number(form.preco),
        quantidade: Number(form.quantidade),
        ano_lancamento: Number(form.ano_lancamento),
      });

      setMessage("GPU criada com sucesso!");

      setTimeout(() => navigate("/"), 1500);

    } catch (error) {
      setMessage("Erro ao criar GPU.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center pt-10 text-gray-900">

      <div className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-2xl shadow-sm">

        <h1 className="text-2xl font-semibold mb-6 tracking-tight">
          Nova GPU
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
                value={form[field.name]}
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
            value={form.descricao}
            onChange={handleChange}
            placeholder="Descrição"
            className="w-full p-3 rounded-xl bg-white border border-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <div className="pt-4 flex justify-end">

            <button
              type="submit"
              disabled={loading}
              className={`px-5 py-2 rounded-lg text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>

          </div>
        </form>

      </div>

    </div>
  );
}