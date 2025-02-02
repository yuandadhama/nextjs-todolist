"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [todos, setTodos] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await fetch("/api/todos");
      if (res.status === 401) {
        setMessage("Anda belum login");
        return;
      }
      const data = await res.json();
      setTodos(data.todos);
    } catch (err) {
      setMessage("Gagal mengambil todo");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) {
        const err = await res.json();
        setMessage(err.error);
      } else {
        setTitle("");
        fetchTodos();
      }
    } catch (err) {
      setMessage("Terjadi kesalahan");
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white h-screen flex justify-center items-center">
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
        {message && <p style={{ color: "red" }}>{message}</p>}
        <form onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Masukkan todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "80%", padding: "0.5rem" }}
          />
          <button
            type="submit"
            style={{ padding: "0.5rem 1rem", marginLeft: "1rem" }}
          >
            Tambah
          </button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo._id} style={{ marginTop: "1rem" }}>
              {todo.title} {todo.completed ? "(Selesai)" : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
