"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "./services/api";
import { setHabits } from "./features/habitSlice";

export default function Home() {
  const dispatch = useDispatch();
  const habits = useSelector((state: any) => state.habits.habits);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // obtener color de barra
  const getColor = (streak: number) => {
    if (streak < 3) return "bg-red-500";
    if (streak < 7) return "bg-yellow-400";
    return "bg-green-500";
  };

  // porcentaje progreso (máx 10 días)
  const getProgress = (streak: number) => {
    return Math.min((streak / 10) * 100, 100);
  };

  // traer hábitos
  const fetchHabits = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/habits", {
        headers: {
          Authorization: token,
        },
      });

      dispatch(setHabits(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetchHabits();
  }, []);

  // marcar como completado
  const markAsDone = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      await API.patch(
        `/habits/${id}/done`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchHabits();
    } catch (error) {
      console.error(error);
    }
  };

  // crear hábito
  const createHabit = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/habits",
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setName("");
      setDescription("");

      fetchHabits();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      
      {/* HEADER CON LOGOUT */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mis Hábitos</h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* CREAR HÁBITO */}
      <div className="mb-6 border p-4 rounded-xl">
        <h2 className="text-xl font-bold mb-3">Crear Hábito</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <button
          onClick={createHabit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Crear
        </button>
      </div>

      {/* LISTA */}
      <div className="grid gap-4">
        {habits.map((habit: any) => (
          <div
            key={habit._id}
            className="border p-4 rounded-xl shadow-md"
          >
            <h2 className="text-xl font-semibold">{habit.name}</h2>
            <p className="text-gray-600">{habit.description}</p>

            <p className="mt-2 font-bold">
              Streak: {habit.streak}
            </p>

            {/* BARRA DE PROGRESO */}
            <div className="w-full bg-gray-200 rounded-full h-4 mt-3">
              <div
                className={`${getColor(habit.streak)} h-4 rounded-full transition-all`}
                style={{ width: `${getProgress(habit.streak)}%` }}
              ></div>
            </div>

            <button
              onClick={() => markAsDone(habit._id)}
              className="mt-3 bg-green-500 text-white px-4 py-2 rounded"
            >
              Done
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}