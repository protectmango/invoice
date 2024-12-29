import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import paidGif from "@/public/paid.gif";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/components/custom/SubmitButtons";
import { MarkInvoiceAsPaid } from "@/app/actions";
import prisma from "@/app/utils/db";
import { redirect } from "next/navigation";
import { requireUser } from "@/app/utils/hooks";

async function Authorise(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return redirect("/dashboard/invoices");
  }
}

type Params = Promise<{ invoiceId: string }>;

export default async function MarkInvoiceAsPaidRoute({
  params,
}: {
  params: Params;
}) {
  const { invoiceId } = await params;
  const session = await requireUser();
  await Authorise(invoiceId, session.user?.id as string);

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="min-w-[300px] max-w-[500px]">
        <CardHeader>
          <CardTitle>Mark Invoice as Paid</CardTitle>
          <CardDescription>Are you sure to mark it as paid?</CardDescription>
        </CardHeader>
        <CardContent className="flex  flex-col items-center">
          <Image src={paidGif} alt="Paid" className="size-20" />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Link
            href="/dashboard/invoices"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
          <form
            action={async () => {
              "use server";
              await MarkInvoiceAsPaid(invoiceId);
            }}
          >
            <SubmitButton text="Mark As Paid" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
