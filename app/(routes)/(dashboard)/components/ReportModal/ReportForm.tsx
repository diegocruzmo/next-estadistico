"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { formSchema } from "./ReportModal";
import { Separator } from "@/components/ui/separator";

type ReportFormValues = z.infer<typeof formSchema>;

export default function ReportForm({
  form,
}: {
  form: UseFormReturn<ReportFormValues>;
}) {
  return (
    <>
      <div>
        <FormField
          control={form.control}
          name="territorial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Territorial<span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una territorial" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="amazonas">Amazonas</SelectItem>
                  <SelectItem value="antioquia">Antioquia</SelectItem>
                  <SelectItem value="arauca">Arauca</SelectItem>
                  <SelectItem value="atlantico">Atlántico</SelectItem>
                  <SelectItem value="barrancabermeja">
                    Barrancabermeja
                  </SelectItem>
                  <SelectItem value="bogota">Bogotá</SelectItem>
                  <SelectItem value="bolivar">Bolívar</SelectItem>
                  <SelectItem value="boyaca">Boyacá</SelectItem>
                  <SelectItem value="caldas">Caldas</SelectItem>
                  <SelectItem value="caqueta">Caquetá</SelectItem>
                  <SelectItem value="casanare">Casanare</SelectItem>
                  <SelectItem value="cauca">Cauca</SelectItem>
                  <SelectItem value="cesar">Cesar</SelectItem>
                  <SelectItem value="choco">Chocó</SelectItem>
                  <SelectItem value="cordoba">Córdoba</SelectItem>
                  <SelectItem value="cundinamarca">Cundinamarca</SelectItem>
                  <SelectItem value="guainia">Guainía</SelectItem>
                  <SelectItem value="guajira">Guajira</SelectItem>
                  <SelectItem value="guaviare">Guaviare</SelectItem>
                  <SelectItem value="huila">Huila</SelectItem>
                  <SelectItem value="magdalena">Magdalena</SelectItem>
                  <SelectItem value="meta">Meta</SelectItem>
                  <SelectItem value="narino">Nariño</SelectItem>
                  <SelectItem value="nortesantander">
                    Norte de Santander
                  </SelectItem>
                  <SelectItem value="putumayo">Putumayo</SelectItem>
                  <SelectItem value="quindio">Quindío</SelectItem>
                  <SelectItem value="risaralda">Risaralda</SelectItem>
                  <SelectItem value="sanandres">San Andrés</SelectItem>
                  <SelectItem value="santander">Santander</SelectItem>
                  <SelectItem value="sucre">Sucre</SelectItem>
                  <SelectItem value="tolima">Tolima</SelectItem>
                  <SelectItem value="uraba">Urabá</SelectItem>
                  <SelectItem value="valle">Valle</SelectItem>
                  <SelectItem value="vichada">Vichada</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="anio"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>
                Año<span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione un año" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="2020">2020</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mes"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>
                Mes<span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione un mes" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="enero">Enero</SelectItem>
                  <SelectItem value="febrero">Febrero</SelectItem>
                  <SelectItem value="marzo">Marzo</SelectItem>
                  <SelectItem value="abril">Abril</SelectItem>
                  <SelectItem value="mayo">Mayo</SelectItem>
                  <SelectItem value="junio">Junio</SelectItem>
                  <SelectItem value="julio">Julio</SelectItem>
                  <SelectItem value="agosto">Agosto</SelectItem>
                  <SelectItem value="septiembre">Septiembre</SelectItem>
                  <SelectItem value="octubre">Octubre</SelectItem>
                  <SelectItem value="noviembre">Noviembre</SelectItem>
                  <SelectItem value="diciembre">Diciembre</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Separator className="my-4" />

      <h2 className="text-lg">Verbales</h2>
      <h3 className="text-gray-600 dark:text-gray-400">Número de Consultas</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="numcvm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Masculino<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numcvf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Femenino<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numcvtm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Trans Masculino<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numcvtf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Trans Femenino<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numcvnb"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                No binarias<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numcvlg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                LGTBIQ+<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numcvin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Intersexual<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Separator className="my-4" />
      <h2 className="text-lg">
        Conminación a Dar Cumplimiento al Procedimiento de Acoso Laboral
      </h2>
      <h3 className="text-gray-600 dark:text-gray-400">Número de Consultas</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="numcpm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Masculino<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numcpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Femenino<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numcptm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Trans Masculino<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numcptf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Trans Femenino<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numcpnb"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                No binarias<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numcplg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                LGTBIQ+<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numcpin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Intersexual<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Separator className="my-4" />
      <h2 className="text-lg"> Querellas remitidas a PIVC </h2>
      <h3 className="text-gray-600 dark:text-gray-400">Número de Consultas</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="numqrm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Masculino<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numqrf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Femenino<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numqrtm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Trans Masculino<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numqrtf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Trans Femenino<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numqrnb"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                No binarias<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numqrlg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                LGTBIQ+<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numqrin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Intersexual<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="Ingrese un valor"
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
