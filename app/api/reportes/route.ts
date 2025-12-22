export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { formSchema } from "@/lib/validators/report";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const reportes = await prisma.report.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reportes);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error obteniendo reportes" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // 1️⃣ Auth
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    // 2️⃣ Body
    const body = await req.json();

    // 3️⃣ Validación Zod
    const data = formSchema.parse(body);

    // 4️⃣ INSERT (mapear mes/anio → month/year)
    const report = await prisma.report.create({
      data: {
        userId,

        territorial: data.territorial,
        month: data.mes,
        year: data.anio,

        numcvm: data.numcvm,
        numcvf: data.numcvf,
        numcvtm: data.numcvtm,
        numcvtf: data.numcvtf,
        numcvnb: data.numcvnb,
        numcvlg: data.numcvlg,
        numcvin: data.numcvin,

        numcpm: data.numcpm,
        numcpf: data.numcpf,
        numcptm: data.numcptm,
        numcptf: data.numcptf,
        numcpnb: data.numcpnb,
        numcplg: data.numcplg,
        numcpin: data.numcpin,

        numqrm: data.numqrm,
        numqrf: data.numqrf,
        numqrtm: data.numqrtm,
        numqrtf: data.numqrtf,
        numqrnb: data.numqrnb,
        numqrlg: data.numqrlg,
        numqrin: data.numqrin,
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
