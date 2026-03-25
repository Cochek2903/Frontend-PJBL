import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

export default function ViewGPU() {
  const { id } = useParams();
  const [gpu, setGpu] = useState(null);

  useEffect(() => {
    api.get(`/gpus/${id}`)
      .then(res => setGpu(res.data))
      .catch(() => {});
  }, [id]);

  const formatPrice = (value) => {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  if (!gpu) {
    return (
      <p className="text-gray-500">Carregando...</p>
    );
  }

  const isOutOfStock = gpu.quantidade === 0;

  return (
    <div className="bg-gray-100 min-h-screen text-gray-900 flex justify-center items-start pt-10">

      <div className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-2xl shadow-sm relative">

        {/* STATUS */}
        <span
          className={`absolute top-5 right-5 px-3 py-1 text-xs rounded-full ${
            isOutOfStock
              ? "bg-red-100 text-red-500"
              : "bg-green-100 text-green-600"
          }`}
        >
          {isOutOfStock ? "Sem estoque" : "Disponível"}
        </span>

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            {gpu.nome}
          </h1>

          <p className="text-gray-500 mt-1">
            {gpu.modelo} • {gpu.fabricante}
          </p>
        </div>

        {/* INFO */}
        <div className="space-y-3 text-sm">

          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">Preço</span>
            <span className="font-semibold text-red-500">
              {formatPrice(gpu.preco)}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">Estoque</span>
            <span className={isOutOfStock ? "text-red-500" : "text-green-600"}>
              {gpu.quantidade}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">Fabricante</span>
            <span>{gpu.fabricante}</span>
          </div>

          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">Ano</span>
            <span>{gpu.ano_lancamento}</span>
          </div>

        </div>

        {/* DESCRIÇÃO */}
        {gpu.descricao && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold mb-2 text-gray-700">
              Descrição
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {gpu.descricao}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}