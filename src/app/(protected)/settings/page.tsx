import { auth, signOut } from "@root/auth";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";

export default async function SettingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const { id, name, email } = session.user;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
            <span role="img" aria-label="server">
              🖥️
            </span>{" "}
            Server Component
          </h2>
        </div>

        <div className="space-y-2">
          <Label>ID</Label>
          <Input value={id || "No ID"} disabled />
        </div>

        <div className="space-y-2">
          <Label>Name</Label>
          <Input value={name || "No Name"} disabled />
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={email || "No Email"} disabled />
        </div>

        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button variant="destructive" className="w-full mt-4">
            Salir
          </Button>
        </form>
      </Card>
    </div>
  );
}
