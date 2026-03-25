import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import CreateGPU from "./pages/CreateGPU";
import ViewGPU from "./pages/ViewGPU";
import EditGPU from "./pages/EditGPU";

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-900">
      <BrowserRouter>
        <Navbar />

        <div className="max-w-6xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateGPU />} />
            <Route path="/view/:id" element={<ViewGPU />} />
            <Route path="/edit/:id" element={<EditGPU />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}