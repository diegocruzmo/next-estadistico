import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen px-4 text-center bg-white dark:bg-gray-800">
      <Link
        href="/"
        className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={80}
          height={80}
          className="drop-shadow-sm"
        />
      </Link>

      <p className="text-xl text-gray-700 dark:text-gray-400 mb-1">
        Estadístico Ministerio del Trabajo
      </p>

      <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Página no encontrada
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </p>

      <Link
        href="/"
        className="px-6 py-3 bg-rose-950 text-white rounded-lg shadow-md hover:bg-rose-900 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
