import { z } from "zod";

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

export type ReportInput = z.infer<typeof formSchema>;
