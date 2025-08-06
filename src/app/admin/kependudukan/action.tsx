// 3. app/admin/kependudukan/actions.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCharts() {
  return prisma.chart.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createChart(data: {
  title: string;
  type: string;
  data: { name: string; value: number }[];
}) {
  await prisma.chart.create({
    data: {
      ...data,
      data: JSON.stringify(data.data),
    },
  });
  revalidatePath("/admin/kependudukan");
}

export async function deleteChart(id: string) {
  await prisma.chart.delete({ where: { id } });
  revalidatePath("/admin/kependudukan");
}
