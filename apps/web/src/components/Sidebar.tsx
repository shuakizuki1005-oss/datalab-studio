
"use client";

import { useState } from "react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: "◫" },
  { id: "datasets", label: "Datasets", icon: "▤" },
  { id: "analytics", label: "Analytics", icon: "▥" },
  { id: "experiments", label: "Experiments", icon: "◇" },
  { id: "models", label: "Models", icon: "◈" },
];

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");

  return (
    <aside className="w-64 shrink-0 border-r border-slate-800 bg-slate-950 p-5">
      <div className="mb-10">
        <h1 className="text-xl font-bold text-white">
          DataLab Studio
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Analytics Workspace
        </p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition ${
              active === item.id
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-12 rounded-lg bg-slate-900 p-4">
        <p className="text-sm font-medium text-white">
          Local Development
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Offline mode
        </p>
      </div>
    </aside>
  );
}
