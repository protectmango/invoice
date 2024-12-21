import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { InvoiceActions } from "./InvoiceActions";

export function InvoiceList(){
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice Id</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>#1</TableCell>
                    <TableCell>Gulshan Rana</TableCell>
                    <TableCell>$55.00</TableCell>
                    <TableCell>paid</TableCell>
                    <TableCell>21/12/2024</TableCell>
                    <TableCell className="text-right">
                        <InvoiceActions/>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}