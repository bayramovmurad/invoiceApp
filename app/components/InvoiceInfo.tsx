import { Invoice } from "@/type";
import React from "react";

interface Props {
  invoice: Invoice;
  setInvoice: (invoice: Invoice) => void;
}

export default function InvoiceInfo({ invoice, setInvoice }:Props){
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
  ) => {
    setInvoice({ ...invoice, [field]: e.target.value });
  };

  console.log(invoice);

  return (
    <div className="flex flex-col h-fit bg-base-200 p-5 rounded-xl mb-4 md:mb-0">
      <div className="space-y-4">
        <h2 className="badge badge-accent">Issuer</h2>
        <input
          type="text"
          value={invoice?.issuerName}
          placeholder="Name of the issuing company"
          className="input input-bordered w-full resize-none"
          required
          onChange={(e) => handleInputChange(e, "issuerName")}
        />

        <textarea
          value={invoice?.issuerAddress}
          placeholder="Address of the issuing company"
          className="textarea textarea-bordered w-full resize-none h-40"
          rows={5}
          required
          onChange={(e) => handleInputChange(e, "issuerAddress")}></textarea>

        <h2 className="badge badge-accent">Client</h2>
        <input
          type="text"
          value={invoice?.clientName}
          placeholder="Nom de l'entreprise cliente"
          className="input input-bordered w-full resize-none"
          required
          onChange={(e) => handleInputChange(e, "clientName")}
        />

        <textarea
          value={invoice?.clientAddress}
          placeholder="Address of the client company"
          className="textarea textarea-bordered w-full resize-none h-40"
          rows={5}
          required
          onChange={(e) => handleInputChange(e, "clientAddress")}></textarea>

        <h2 className="badge badge-accent">Invoice Date</h2>
        <input
          type="date"
          value={invoice?.invoiceDate}
          className="input input-bordered w-full resize-none"
          required
          onChange={(e) => handleInputChange(e, "invoiceDate")}
        />

        <h2 className="badge badge-accent">Expiry date</h2>
        <input
          type="date"
          value={invoice?.dueDate}
          className="input input-bordered w-full resize-none"
          required
          onChange={(e) => handleInputChange(e, "dueDate")}
        />
      </div>
    </div>
  );
};


