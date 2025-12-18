"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

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

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formSchema } from "./ReportModal";

type ReportFormValues = z.infer<typeof formSchema>;

/** ----------------------------------------------------------------------
 * Helper: NumberField (input numérico reutilizable)
 * - Evita NaN
 * - Permite vacío -> undefined
 * - Aplica min=0
 * ------------------------------------------------------------------- */
function NumberField<TValues>({
  field,
  label,
  required = false,
  placeholder = "Ingrese un valor",
  min,
}: {
  field: any; // ControllerRenderProps<TValues, any>
  label: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
}) {
  return (
    <FormItem>
      <FormLabel>
        {label}
        {required ? <span className="text-red-500">*</span> : null}
      </FormLabel>
      <FormControl>
        <input
          placeholder={placeholder}
          type="number"
          value={field.value ?? ""}
          min={min}
          inputMode="numeric"
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") {
              field.onChange(undefined);
              return;
            }
            const num = Number(raw);
            if (Number.isNaN(num)) return;
            if (typeof min === "number" && num < min) {
              field.onChange(min);
              return;
            }
            field.onChange(num);
          }}
          className="input input-bordered w-full rounded-md border px-3 py-2 placeholder:text-sm"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

/** ----------------------------------------------------------------------
 * Helper: Totales de sección (suma en vivo)
 * ------------------------------------------------------------------- */
import { useWatch } from "react-hook-form";
function SectionTotal({
  form,
  names,
  label = "Total",
}: {
  form: UseFormReturn<any>;
  names: string[];
  label?: string;
}) {
  const values = useWatch({ control: form.control, name: names });
  const total = (values ?? []).reduce(
    (acc: number, v: unknown) => acc + (typeof v === "number" ? v : 0),
    0
  );
  return (
    <div className="mt-4 flex items-center justify-end">
      <div className="text-sm text-muted-foreground">
        {label}: <span className="font-semibold">{total}</span>
      </div>
    </div>
  );
}

/** ----------------------------------------------------------------------
 * Wizard (stepper y navegación)
 * ------------------------------------------------------------------- */
import { ReactNode, useMemo, useState } from "react";

type WizardStep = {
  id: string;
  title: string;
  description?: string;
  fields: string[];
  content: ReactNode;
};

function Wizard({
  steps,
  initialStep = 0,
  onValidateStep,
}: {
  steps: WizardStep[];
  initialStep?: number;
  onValidateStep?: (fields: string[]) => Promise<boolean>;
}) {
  const [current, setCurrent] = useState(initialStep);
  const total = steps.length;
  const step = steps[current];

  const progress = useMemo(() => {
    if (total <= 1) return 100;
    return Math.round(((current + 1) / total) * 100);
  }, [current, total]);

  const goPrev = () => setCurrent((c) => Math.max(0, c - 1));
  const goNext = async () => {
    const fields = step.fields ?? [];
    if (onValidateStep) {
      const ok = await onValidateStep(fields);
      if (!ok) return;
    }
    setCurrent((c) => Math.min(total - 1, c + 1));
  };

  const isLast = current === total - 1;

  return (
    <div className="space-y-6">
      {/* Header / Stepper */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{step.title}</h2>
            {step.description ? (
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            ) : null}
          </div>
          <span className="text-sm text-muted-foreground">
            Paso {current + 1} de {total}
          </span>
        </div>
        <Progress value={progress} />
        <div className="flex flex-wrap gap-2">
          {steps.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              className={`px-3 py-1 rounded-md border text-sm ${
                idx === current
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
              aria-current={idx === current ? "step" : undefined}
              onClick={() => setCurrent(idx)}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="space-y-4">{step.content}</div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={goPrev}
          disabled={current === 0}
        >
          Anterior
        </Button>

        {!isLast ? (
          <Button
            className="cursor-pointer"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              goNext();
            }}
          >
            Siguiente
          </Button>
        ) : (
          <Button type="submit" className="cursor-pointer">
            Enviar
          </Button>
        )}
      </div>
    </div>
  );
}

/** ----------------------------------------------------------------------
 * Configuración de secciones (arrays de campos)
 * ------------------------------------------------------------------- */

// Verbales → Número de Consultas
const VERBALES_FIELDS = [
  { name: "numcvm", label: "Masculino" },
  { name: "numcvf", label: "Femenino" },
  { name: "numcvtm", label: "Trans Masculino" },
  { name: "numcvtf", label: "Trans Femenino" },
  { name: "numcvnb", label: "No binarias" },
  { name: "numcvlg", label: "LGTBIQ+" },
  { name: "numcvin", label: "Intersexual" },
] as const;

// Conminación a Dar Cumplimiento al Procedimiento de Acoso Laboral → Número de Consultas
const CONMINACION_FIELDS = [
  { name: "numcpm", label: "Masculino" },
  { name: "numcpf", label: "Femenino" },
  { name: "numcptm", label: "Trans Masculino" },
  { name: "numcptf", label: "Trans Femenino" },
  { name: "numcpnb", label: "No binarias" },
  { name: "numcplg", label: "LGTBIQ+" },
  { name: "numcpin", label: "Intersexual" },
] as const;

// Querellas remitidas a PIVC → Número de Consultas
const PIVC_FIELDS = [
  { name: "numqrm", label: "Masculino" },
  { name: "numqrf", label: "Femenino" },
  { name: "numqrtm", label: "Trans Masculino" },
  { name: "numqrtf", label: "Trans Femenino" },
  { name: "numqrnb", label: "No binarias" },
  { name: "numqrlg", label: "LGTBIQ+" },
  { name: "numqrin", label: "Intersexual" },
] as const;

/** ----------------------------------------------------------------------
 * Componente principal: ReportForm (Wizard)
 * ------------------------------------------------------------------- */
export default function ReportForm({
  form,
}: {
  form: UseFormReturn<ReportFormValues>;
}) {
  /** Paso 1: Filtros */
  const stepFiltros: WizardStep = {
    id: "filtros",
    title: "Filtros",
    description: "Selecciona territorial, año y mes",
    fields: ["territorial", "anio", "mes"],
    content: (
      <>
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
                  <SelectItem value="2019">2019</SelectItem>
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
      </>
    ),
  };

  /** Paso 2: Verbales */
  const stepVerbales: WizardStep = {
    id: "verbales",
    title: "Verbales",
    description: "Número de Consultas",
    fields: VERBALES_FIELDS.map((f) => f.name),
    content: (
      <>
        <h2 className="text-lg">Verbales</h2>
        <h3 className="text-gray-600 dark:text-gray-400">
          Número de Consultas
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {VERBALES_FIELDS.map(({ name, label }) => (
            <FormField
              key={name}
              control={form.control}
              name={name as any}
              render={({ field }) => (
                <NumberField field={field} label={label} required min={0} />
              )}
            />
          ))}
        </div>

        <SectionTotal
          form={form}
          names={VERBALES_FIELDS.map((f) => f.name)}
          label="Total consultas verbales"
        />
      </>
    ),
  };

  /** Paso 3: Conminación (Acoso Laboral) */
  const stepConminacion: WizardStep = {
    id: "conminacion",
    title: "Conminación Procedimiento de Acoso",
    description: "Número de Consultas",
    fields: CONMINACION_FIELDS.map((f) => f.name),
    content: (
      <>
        <h2 className="text-lg">
          Conminación a Dar Cumplimiento al Procedimiento de Acoso Laboral
        </h2>
        <h3 className="text-gray-600 dark:text-gray-400">
          Número de Consultas
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {CONMINACION_FIELDS.map(({ name, label }) => (
            <FormField
              key={name}
              control={form.control}
              name={name as any}
              render={({ field }) => (
                <NumberField field={field} label={label} required min={0} />
              )}
            />
          ))}
        </div>

        <SectionTotal
          form={form}
          names={CONMINACION_FIELDS.map((f) => f.name)}
          label="Total consultas (Conminación)"
        />
      </>
    ),
  };

  /** Paso 4: PIVC */
  const stepPIVC: WizardStep = {
    id: "pivc",
    title: "Querellas remitidas a PIVC",
    description: "Número de Consultas",
    fields: PIVC_FIELDS.map((f) => f.name),
    content: (
      <>
        <h2 className="text-lg">Querellas remitidas a PIVC</h2>
        <h3 className="text-gray-600 dark:text-gray-400">
          Número de Consultas
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {PIVC_FIELDS.map(({ name, label }) => (
            <FormField
              key={name}
              control={form.control}
              name={name as any}
              render={({ field }) => (
                <NumberField field={field} label={label} required min={0} />
              )}
            />
          ))}
        </div>

        <SectionTotal
          form={form}
          names={PIVC_FIELDS.map((f) => f.name)}
          label="Total consultas (PIVC)"
        />
      </>
    ),
  };

  const steps: WizardStep[] = [
    stepFiltros,
    stepVerbales,
    stepConminacion,
    stepPIVC,
  ];

  /** Validación por paso (solo los campos del paso actual) */
  const validateStep = async (fields: string[]) => {
    const ok = await form.trigger(fields, { shouldFocus: true });
    return ok;
  };

  return (
    <div className="mt-2">
      <Wizard steps={steps} onValidateStep={validateStep} />
    </div>
  );
}
