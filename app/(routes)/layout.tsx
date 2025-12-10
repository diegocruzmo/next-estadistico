import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white dark:bg-gray-800">
      <Header />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
