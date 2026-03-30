"use client";

import { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login exitoso");

      window.location.href = "/";
    } catch (error: any) {
      alert(error.response?.data?.message || "Error en login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border p-6 rounded-xl shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Iniciar sesión
        </button>

        {/* TEXTO PARA IR A REGISTER */}
        <p className="text-center text-sm mt-4">
          ¿No tienes cuenta?{" "}
          <span
            onClick={() => (window.location.href = "/register")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Crear cuenta aquí
          </span>
        </p>
      </div>
    </div>
  );
}