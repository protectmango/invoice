import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { InvoiceList } from '../../../components/custom/InvoiceList';

export default function Invoices() {
     return (
        <div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className='text-2xl font-bold'>Invoices</CardTitle>
                            <CardDescription>Make your invoices here.</CardDescription>
                        </div>
                    <Link href=''
                    className={buttonVariants()}
                    >
                        <PlusIcon/> Create Invoice
                    </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <InvoiceList/>

                </CardContent>
            </Card>
        </div>
     )
}