import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: Promise<{ invoiceId: string }> }) {
    try {
        const session = await requireUser();

        const { invoiceId } = await params;

        const invoiceData = await prisma.invoice.findUnique({
            where: {
                id: invoiceId,
                userId: session.user?.id,
            },
        })

        if (!invoiceData) {
            return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
        }

        const sender = {
            email: "hello@demomailtrap.com",
            name: "Gulshan Rana",
        };
        emailClient.send({
            from: sender,
            to: [{ email: "protectmango@gmail.com" }],
            template_uuid: "c1e87a62-ebbc-4d83-af12-319786f678d0",
            template_variables: {
                first_name: invoiceData.clientName,
            },

        });

        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json({ error: "Failed to send Email Reminder" }, { status: 500 })
    }
}