import prisma from "@/app/utils/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DashboardGraph } from "./DashboardGraph";
import { requireUser } from "@/app/utils/hooks";

async function getInvoiceData(userId: string) {
  const rawData = await prisma.invoice.findMany({
    where: {
      status: "PAID",
      userId: userId,
      createdAt: {
        lte: new Date(),
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      createdAt: true,
      total: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  //Group and Aggregated data by date

  const aggregateData = rawData.reduce(
    (acc: { [key: string]: number }, curr) => {
      const date = new Date(curr.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      acc[date] = (acc[date] || 0) + curr.total;
      return acc;
    },
    {}
  );

  //object to array conversion
  const transformData = Object.entries(aggregateData)
    .map(([date, amount]) => ({
      date,
      amount,
      originalDate: new Date(date + "," + new Date().getFullYear()),
    }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({ date, amount }) => ({ date, amount }));

  return transformData;
}

export async function InvoiceGraph() {
  const session = await requireUser();

  const data = await getInvoiceData(session.user?.id as string);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>Invoices paid in last 30 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <DashboardGraph data={data} />
      </CardContent>
    </Card>
  );
}
