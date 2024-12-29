import { requireUser } from "../utils/hooks";
import { DashboardBlocks } from "@/components/custom/DashboardBlocks";
import { InvoiceGraph } from "@/components/custom/InvoiceGraph";
import { RecentInvoices } from "@/components/custom/RecentInvoices";
import prisma from "../utils/db";
import { EmptyState } from "@/components/custom/EmptyState";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  return data;
}

export default async function DashboardRoute() {
  const session = await requireUser();

  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.length < 1 ? (
        <EmptyState
          title="No Invoice found"
          description="Create a Invoice to see the Analytics here."
          buttontext="Create Invoice"
          href="/dashboard/invoices/create"
        />
      ) : (
        <Suspense fallback={<Skeleton className="w-full h-full flex-1" />}>
          <DashboardBlocks />
          <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
            <InvoiceGraph />
            <RecentInvoices />
          </div>
        </Suspense>
      )}
    </>
  );
}
