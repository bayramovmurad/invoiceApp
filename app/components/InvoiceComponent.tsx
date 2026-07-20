import { Invoice } from "@/type";
import { CheckCircle, Clock, FileText, SquareArrowOutUpRight, XCircle } from "lucide-react";
import Link from "next/link";

type InvoiceComponentProps = {
  invoice: Invoice;
  index: number;
};

const getStatusBadge = (status: number) => {
  switch (status) {
    case 1:
      return (
        <div className="badge badge-lg flex items-center gap-2">
          <FileText size={16} />
          Draft
        </div>
      );
    case 2:
      return (
        <div className="badge badge-lg flex items-center gap-2">
          <Clock size={16} />
          Pending
        </div>
      );
    case 3:
      return (
        <div className="badge badge-lg flex items-center gap-2">
          <FileText size={16} />
          Paid
        </div>
      );
    case 4:
      return (
        <div className="badge badge-lg flex items-center gap-2">
          <CheckCircle size={16} />
          Cancel
        </div>
      );
    case 5:
      return (
        <div className="badge badge-lg flex items-center gap-2">
          <XCircle size={16} />
          Cancel
        </div>
      );
    default:
      return (
        <div className="badge badge-lg flex items-center gap-2">
          <XCircle size={16} />
          Unpaid
        </div>
      );
  }
};

export default function InvoiceComponent({
  invoice,
  index,
}: InvoiceComponentProps) {
    
  const calculateTotal = () => {
     const subtotal = invoice.lines.reduce((acc, line) => {
       const quantity = line.quantity ?? 0;
       const unitPrice = line.unitPrice ?? 0;
       return acc + quantity * unitPrice;
     }, 0);

     const vatAmount = subtotal * (invoice.vatRate / 100);
     const total = subtotal + vatAmount;
     return total;
  };

  return (
    <div className="bg-base-200/90 p-5 rounded-xl space-y-2 shadow">
      <div className="flex justify-between items-center w-full">
        <div>{getStatusBadge(invoice.status)}</div>
        <Link className="btn btn-accent btn-sm" href={`/invoice/${invoice.id}`}>
          Plus
          <SquareArrowOutUpRight className="w-4" />
        </Link>
      </div>

      <div className="w-full">
        <div>
          <div className="stat-title">
            <div className="uppercase text-sm">Inv-{invoice.id}</div>
          </div>
          <div>
            <div className="stat-value">{calculateTotal().toFixed(2)} €</div>
          </div>
          <div className="stat-desc">{invoice.name}</div>
        </div>
      </div>
    </div>
  );
}
