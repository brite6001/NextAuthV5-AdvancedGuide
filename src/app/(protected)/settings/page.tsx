import { auth, signOut } from "@root/auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { redirect } from "next/navigation";
import { Settings, LogOut, User, Mail, Hash } from "lucide-react";

export default async function SettingsPage() {
  const session = await auth();

  // Protección adicional (redundante con middleware pero más seguro)
  if (!session?.user) {
    redirect("/auth/login");
  }

  const { id, name, email, image, role } = session.user;

  // Server Action para logout
  async function handleSignOut() {
    "use server";
    await signOut();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white shadow-xl border-0">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Settings className="h-6 w-6 text-blue-600" />
            <CardTitle className="text-2xl font-bold text-gray-800">
              Configuración de Cuenta
            </CardTitle>
          </div>
          <Badge variant="secondary" className="w-fit mx-auto">
            Server Component
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Profile Section */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <Avatar className="h-16 w-16">
              <AvatarImage src={image || ""} alt={name || "User"} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                {name ? name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {name || "Usuario sin nombre"}
              </h3>
              <p className="text-gray-600">{email || "Sin email"}</p>
              {role && (
                <Badge variant="outline" className="mt-1">
                  {role}
                </Badge>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Hash className="h-4 w-4" />
                ID de Usuario
              </Label>
              <Input
                value={id || "Sin ID"}
                disabled
                className="bg-gray-50 font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <User className="h-4 w-4" />
                Nombre
              </Label>
              <Input
                value={name || "Sin nombre"}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                value={email || "Sin email"}
                disabled
                className="bg-gray-50"
                type="email"
              />
            </div>
          </div>

          {/* Session Info */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">
              Información de Sesión
            </h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>
                Estado:{" "}
                <span className="font-medium text-green-600">Autenticado</span>
              </p>
              <p>Sesión iniciada: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t">
            <form action={handleSignOut} className="space-y-3">
              <Button
                variant="destructive"
                className="w-full h-11 font-medium"
                type="submit"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-3">
              Al cerrar sesión serás redirigido a la página de inicio
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
