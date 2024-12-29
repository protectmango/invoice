"use server"

import { requireUser } from "./utils/hooks"
import { parseWithZod } from "@conform-to/zod"
import { invoiceSchema, onboardingSchema } from './utils/zodSchemas';
import prisma from "./utils/db";
import { redirect } from "next/navigation";
import { emailClient } from "./utils/mailtrap";
import { formatCurrency } from "@/components/custom/formatCurrency";


export async function onBoardUser(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: onboardingSchema
    })

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.user.update({
        where: {
            id: session.user?.id,
        },
        data: {
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address,
        }
    })

    return redirect("/dashboard");

}

export async function createInvoice(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    })

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.invoice.create({
        data: {
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            status: submission.value.status,
            total: submission.value.total,
            note: submission.value.note,
            userId: session.user?.id,

        },
    })

    const sender = {
        email: "hello@demomailtrap.com",
        name: "Gulshan Rana",
    };
    emailClient.send({
        from: sender,
        to: [{ email: "protectmango@gmail.com" }],
        template_uuid: "6d2e3749-fdd0-41d2-9186-d0e50c66475e",
        template_variables: {
            clientName: submission.value.clientName,
            invoiceNumber: submission.value.invoiceNumber,
            dueDate: new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
            }).format(new Date(submission.value.date)),
            totalAmount: formatCurrency({ amount: submission.value.total, currency: submission.value.currency as any }),
            invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
        }
    })

    return redirect("/dashboard/invoices");

}


export async function editInvoice(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }

    const data = await prisma.invoice.update({
        where: {
            id: formData.get('id') as string,
            userId: session.user?.id,
        },
        data: {
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            status: submission.value.status,
            total: submission.value.total,
            note: submission.value.note,
        }
    })


    const sender = {
        email: "hello@demomailtrap.com",
        name: "Gulshan Rana",
    };
    emailClient.send({
        from: sender,
        to: [{ email: "protectmango@gmail.com" }],
        template_uuid: "0ddc7bc7-9c6e-478e-b36c-f395eb6c2e95",
        template_variables: {
            clientName: submission.value.clientName,
            invoiceNumber: submission.value.invoiceNumber,
            dueDate: new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
            }).format(new Date(submission.value.date)),
            totalAmount: formatCurrency({ amount: submission.value.total, currency: submission.value.currency as any }),
            invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
        }
    })


    return redirect('/dashboard/invoices');
}


export async function DeleteInvoice(invoiceId: string) {
    const session = await requireUser();

    const data = await prisma.invoice.delete({
        where: {
            userId: session.user?.id,
            id: invoiceId,
        }
    })

    return redirect('/dashboard/invoices')
}


export async function MarkInvoiceAsPaid(invoiceId: string) {
    const session = await requireUser();
    const data = await prisma.invoice.update({
        where: {
            userId: session.user?.id,
            id: invoiceId,
        },
        data: {
            status: "PAID",
        }
    })

    return redirect("/dashboard/invoices")
}