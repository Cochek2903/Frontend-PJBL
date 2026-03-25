export default function GPUCard({ gpu, onEdit, onView }) {

  const formatPrice = (value) => {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const isOutOfStock = gpu.quantidade === 0;

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 
                    hover:shadow-md hover:-translate-y-1 
                    transition duration-300 relative">

      {/* BADGE */}
      <span
        className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-medium ${
          isOutOfStock
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        {isOutOfStock ? "Sem estoque" : "Disponível"}
      </span>

      {/* HEADER */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          {gpu.nome}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {gpu.modelo} • {gpu.fabricante}
        </p>
      </div>

      {/* INFO */}
      <div className="mt-5 space-y-1">

        <p className="text-2xl font-bold text-red-500">
          {formatPrice(gpu.preco)}
        </p>

        <p className="text-sm text-gray-500">
          Estoque:{" "}
          <span className={isOutOfStock ? "text-red-500" : "text-green-600"}>
            {gpu.quantidade}
          </span>
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2 mt-6">

        <button
          onClick={() => onView(gpu.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 
                     text-white px-3 py-2 rounded-lg text-sm font-medium transition"
        >
          Ver detalhes
        </button>

        <button
          onClick={() => onEdit(gpu.id)}
          className="flex-1 border border-gray-200 hover:bg-gray-100 
                     px-3 py-2 rounded-lg text-sm font-medium transition"
        >
          Editar
        </button>

      </div>

    </div>
  );
}