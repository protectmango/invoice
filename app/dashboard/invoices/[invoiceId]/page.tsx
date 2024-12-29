import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { EditInvoice } from "@/components/custom/EditInvoice";
import { notFound } from "next/navigation";

async function getData(invoiceId: string, userId: string) {
  const data = prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function editInvoiceRoute({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { invoiceId } = await params;
  const session = await requireUser();
  const data = await getData(invoiceId, session.user?.id as string);

  return <EditInvoice data={data} />;
}
