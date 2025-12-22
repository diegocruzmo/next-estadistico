"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import ReportModal from "./components/ReportModal";

type Report = {
  id: string;
  month: string;
  year: string;
  territorial: string;
  createdAt: string;
};

export default function Home() {
  const { user } = useUser();
  const [reportes, setReportes] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const res = await fetch("/api/reportes");
        if (!res.ok) throw new Error("Error al cargar reportes");
        const data = await res.json();
        setReportes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportes();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-semibold tracking-tight pb-1 mb-4 border-b">
        Bienvenido{user?.fullName ? `, ${user.fullName}` : ""}
      </h2>

      <div className="flex flex-row items-center justify-between mb-6">
        <div>
          <p className="text-base font-medium">REPORTE DE ACOSO LABORAL</p>
          <p className="text-sm text-neutral-500">
            Ley 1010 – Enero 26 de 2006
          </p>
        </div>

        <ReportModal />
      </div>

      <h2 className="text-xl font-semibold mb-3">Reportes de usuario</h2>

      {loading && <p>Cargando reportes...</p>}

      {!loading && reportes.length === 0 && (
        <p className="text-sm text-neutral-500">
          No tienes reportes registrados.
        </p>
      )}

      <ul className="space-y-3">
        {reportes.map((reporte) => (
          <li key={reporte.id} className="border rounded-md p-4">
            <p className="font-medium">
              {reporte.month} / {reporte.year}
            </p>
            <p className="text-sm text-neutral-500">
              Territorial: {reporte.territorial}
            </p>
            <p className="text-xs text-neutral-400">
              Creado: {new Date(reporte.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
