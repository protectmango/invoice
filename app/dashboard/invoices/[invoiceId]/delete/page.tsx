import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { redirect } from "next/navigation";

import warning from "@/public/warning-you.gif";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/components/custom/SubmitButtons";
import { DeleteInvoice } from "@/app/actions";

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

export default async function deleteInvoice({ params }: { params: Params }) {
  const { invoiceId } = await params;
  const session = await requireUser();

  await Authorise(invoiceId, session.user?.id as string);

  return (
    <div className="flex flex-col justify-center items-center">
      <Card className="min-w-[300px] max-w-[500px]">
        <CardHeader>
          <CardTitle>Delete Invoice</CardTitle>
          <CardDescription>
            Are you sure you want to delete this invoice ?
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center pt-6">
          <Image src={warning} alt="Warning" />
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-6">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/dashboard/invoices"
          >
            Cancel
          </Link>
          <form
            action={async () => {
              "use server";
              await DeleteInvoice(invoiceId);
            }}
          >
            <SubmitButton text="Delete Invoice" variant={"destructive"} />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
