import { LoginButton } from "@/components";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md space-y-6">
        <h1
          className={cn(
            "text-4xl sm:text-5xl font-bold tracking-tight text-gray-900"
          )}
        >
          Bienvenido a <span className="text-blue-600">Auth</span>
        </h1>

        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          Un servicio de autenticación moderno, seguro y escalable para tus
          aplicaciones web y móviles.
        </p>

        <div>
          <LoginButton asChild>
            <Button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg active:scale-95" variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}