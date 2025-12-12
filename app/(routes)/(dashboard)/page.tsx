"use client";

import { useUser } from "@clerk/nextjs";
import ReportModal from "./components/ReportModal";

export default function Home() {
  const { user } = useUser();

  return (
    <>
      <h2 className="text-2xl font-semibold text-foreground tracking-tight pb-1 mb-4 border-b border-border">
        Bienvenido{user?.fullName ? `, ${user.fullName}` : ""}
      </h2>

      <div className="flex flex-row items-center justify-between">
        <div>
          <p className="text-base font-medium text-neutral-800 dark:text-neutral-100">
            REPORTE DE ACOSO LABORAL
          </p>

          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Ley 1010 – Enero 26 de 2006
          </p>
        </div>

        <ReportModal />
      </div>
    </>
  );
}
