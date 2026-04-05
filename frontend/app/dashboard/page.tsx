"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  const load = async () => {
    const res = await fetch("http://localhost:3001/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      {tasks.map((t: any) => (
        <div key={t.id}>
          {t.title} - {t.completed ? "Done" : "Pending"}
        </div>
      ))}
    </div>
  );
}