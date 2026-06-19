"use client";

import { useFormStatus } from "react-dom";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ProjectCreateFormProps = {
  action: (formData: FormData) => Promise<void>;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      <PlusIcon />
      {pending ? "Criando" : "Criar projeto"}
    </Button>
  );
}

export function ProjectCreateForm({ action }: ProjectCreateFormProps) {
  return (
    <form action={action} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="project-name">Nome</Label>
        <Input
          id="project-name"
          name="name"
          placeholder="Fluxo de demonstração"
          maxLength={120}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="project-description">Descrição</Label>
        <Textarea
          id="project-description"
          name="description"
          placeholder="O que este projeto deve validar"
          maxLength={2000}
          className="min-h-24 resize-none"
        />
      </div>
      <SubmitButton />
    </form>
  );
}
