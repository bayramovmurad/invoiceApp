"use client";
import Wrapper from "./components/Wrapper";
import { Layers } from "lucide-react";
import { useEffect, useState } from "react";
import { createEmptyInvoice, getInvoicesByEmail } from "./actions";
import { useUser } from "@clerk/nextjs";
import InvoiceComponent from "./components/InvoiceComponent";
import { Invoice } from "@/type";


export default function Home() {
  const { user } = useUser();
  const [invoiceName, setInvoiceName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const email = user?.primaryEmailAddress?.emailAddress as string;
  const [invoices, setInvoices] = useState<Invoice[]>([]);


  const fetchInvoices  = async () => {
    try {
      const data = await getInvoicesByEmail(email)
      if(data){
        setInvoices(data)
      }
    } catch (error) {
      console.log("Error creating invoice:", error);
      
    }
  };

  useEffect(() => {
    fetchInvoices()
  },[email])

  useEffect(() => {
    setIsNameValid(invoiceName.length <= 60);
  }, [invoiceName]);

  const handleCreateInvoice = async () => {
    try {
      if (email) {
        await createEmptyInvoice(email, invoiceName);
      }
      setInvoiceName("");
      const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  return (
    <Wrapper>
      <div className="flex flex-col space-y-4">
        <h1 className="text-lg font-bold">My Factures</h1>

        <div className=" grid md:grid-cols-3 gap-4">
          <div
            className="cursor-pointer border border-accent rounded-xl flex flex-col justify-center items-center p-5"
            onClick={() =>
              (
                document.getElementById("my_modal_3") as HTMLDialogElement
              ).showModal()
            }>
            <div className="font-bold text-accent">Create a Facture</div>
            <div className="bg-accent-content text-accent  rounded-full p-2 mt-2">
              <Layers className="h-6 w-6" />
            </div>
          </div>
        </div>

        {invoices.length > 0 &&
          invoices.map((invoice, index) => (
            <div key={index}>
              <InvoiceComponent invoice={invoice} index={index} />
            </div>
          ))}

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <h3 className="font-bold text-lg">New Facture</h3>

            <input
              type="text"
              placeholder="cant be more than 60"
              className="input input-bordered w-full my-4"
              value={invoiceName}
              onChange={(e) => setInvoiceName(e.target.value)}
            />

            {!isNameValid && (
              <p className="mb-4 text-sm">cant be more than 60</p>
            )}

            <button
              className="btn btn-accent"
              disabled={!isNameValid || invoiceName.length === 0}
              onClick={handleCreateInvoice}>
              Create
            </button>
          </div>
        </dialog>
      </div>
    </Wrapper>
  );
}
