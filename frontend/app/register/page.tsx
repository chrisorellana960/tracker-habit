"use client";

import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        username,
        email,
        password,
      });

      alert("Usuario creado");

      window.location.href = "/login";
    } catch (error: any) {
  console.log(error.response);
  alert(error.response?.data?.message || "Error en registro");
}
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border p-6 rounded-xl shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Registro</h1>

        <input
  type="text"
  placeholder="Usuario"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  className="border p-2 w-full mb-3"
/>

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
          onClick={handleRegister}
          className="bg-green-500 text-white w-full py-2 rounded"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}