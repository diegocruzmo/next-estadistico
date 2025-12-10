export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 border-t py-4">
      <div className="container mx-auto px-4 text-sm text-gray-600 text-center">
        © {new Date().getFullYear()} Ministerio del Trabajo - Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
