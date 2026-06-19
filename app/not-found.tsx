import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="bg-muted/30 flex min-h-screen items-center justify-center px-4 py-10">
      <div className="bg-background grid max-w-md gap-5 rounded-md border p-6 text-center shadow-sm">
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium">Erro 404</p>
          <h1 className="text-2xl font-semibold">Página não encontrada</h1>
          <p className="text-muted-foreground text-sm leading-6">
            O endereço acessado não existe ou foi movido.
          </p>
        </div>
        <Button asChild>
          <Link href="/">
            <HomeIcon />
            Voltar para o início
          </Link>
        </Button>
      </div>
    </main>
  );
}
