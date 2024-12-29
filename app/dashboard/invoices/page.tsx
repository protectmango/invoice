import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { InvoiceList } from "../../../components/custom/InvoiceList";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Invoices() {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
              <CardDescription>Make your invoices here.</CardDescription>
            </div>
            <Link
              href="/dashboard/invoices/create"
              className={buttonVariants()}
            >
              <PlusIcon /> Create Invoice
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="w-full" />}>
            <InvoiceList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
