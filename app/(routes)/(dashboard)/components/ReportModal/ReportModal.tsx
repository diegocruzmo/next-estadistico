"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

export const formSchema = z.object({
  territorial: z.string().min(1, "Campo obligatorio"),
  mes: z.string().min(1, "Campo obligatorio"),
  anio: z.string().min(1, "Campo obligatorio"),

  numcvm: z.number().min(0, "Debe ser igual o mayor a 0"),
  numcvf: z.number().min(0, "Debe ser igual o mayor a 0"),
  numcvtm: z.number().min(0, "Debe ser igual o mayor a 0"),
  numcvtf: z.number().min(0, "Debe ser igual o mayor a 0"),
  numcvnb: z.number().min(0, "Debe ser igual o mayor a 0"),
  numcvlg: z.number().min(0, "Debe ser igual o mayor a 0"),
  numcvin: z.number().min(0, "Debe ser igual o mayor a 0"),

  numcpm: z.number().min(0, "Debe ser igual o mayor a 0"),
  numcpf: z.number().min(0, "Debe ser igual o mayor a 0"),
  numcptm: z.number().min(0, "Debe ser igual o mayor a 0"),
  numcptf: z.number().min(0, "Debe ser igual o mayor a 0"),
  numcpnb: z.number().min(0, "Debe ser igual o mayor a 0"),
  numcplg: z.number().min(0, "Debe ser igual o mayor a 0"),
  numcpin: z.number().min(0, "Debe ser igual o mayor a 0"),

  numqrm: z.number().min(0, "Debe ser igual o mayor a 0"),
  numqrf: z.number().min(0, "Debe ser igual o mayor a 0"),
  numqrtm: z.number().min(0, "Debe ser igual o mayor a 0"),
  numqrtf: z.number().min(0, "Debe ser igual o mayor a 0"),
  numqrnb: z.number().min(0, "Debe ser igual o mayor a 0"),
  numqrlg: z.number().min(0, "Debe ser igual o mayor a 0"),
  numqrin: z.number().min(0, "Debe ser igual o mayor a 0"),
});

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
            onSubmit={form.handleSubmit((values) => {
              console.log(values);
              setOpen(false);
              form.reset();
            })}
            className="space-y-4"
          >
            <ReportForm form={form} />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancelar
                </Button>
              </DialogClose>

              <Button type="submit" className="cursor-pointer">
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
