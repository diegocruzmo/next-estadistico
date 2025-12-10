import Image from "next/image";
import Link from "next/link";
import ModeToggle from "../ModeToggle";
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="w-full bg-gray-100 dark:bg-gray-900 shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.png"
              alt="logo"
              width={50}
              height={50}
              className="h-auto w-auto drop-shadow-sm"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <UserButton />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
