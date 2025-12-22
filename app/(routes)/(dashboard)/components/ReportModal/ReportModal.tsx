"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ReportForm from "./ReportForm";
import { useState } from "react";
import { formSchema } from "@/lib/validators/report";

export type ReportFormValues = z.infer<typeof formSchema>;

export default function ReportModal() {
  const [open, setOpen] = useState(false);

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      territorial: "",
      mes: "",
      anio: "",

      numcvm: 0,
      numcvf: 0,
      numcvtm: 0,
      numcvtf: 0,
      numcvnb: 0,
      numcvlg: 0,
      numcvin: 0,

      numcpm: 0,
      numcpf: 0,
      numcptm: 0,
      numcptf: 0,
      numcpnb: 0,
      numcplg: 0,
      numcpin: 0,

      numqrm: 0,
      numqrf: 0,
      numqrtm: 0,
      numqrtf: 0,
      numqrnb: 0,
      numqrlg: 0,
      numqrin: 0,
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-8 w-8 bg-rose-950 text-white shadow-md rounded-full hover:bg-rose-900 transition-colors cursor-pointer">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Nuevo Reporte</DialogTitle>
          <DialogDescription>
            Llena la información para crear un nuevo reporte.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              const res = await fetch("/api/reportes", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              });

              if (!res.ok) {
                throw new Error("Error al guardar el reporte");
              }
              console.log(values);
              setOpen(false);
              form.reset();
            })}
            className="space-y-4"
          >
            <ReportForm form={form} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
