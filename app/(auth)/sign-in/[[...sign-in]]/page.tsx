import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 p-4">
      <SignIn
        appearance={{
          baseTheme: [dark],
        }}
      />
    </div>
  );
}
