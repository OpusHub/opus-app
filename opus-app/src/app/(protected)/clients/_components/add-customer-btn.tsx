"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { UpsertCustomerForm } from "./upsert-client-form";
import { customersTable } from "@/db/schema";


interface UpsertCustomerFormProps {
  customer?: typeof customersTable.$inferSelect;
  onSuccess?: () => void;
}


const AddCustomerButton = ( {label, icon, customer, description, title, variant} : {label: string, icon: React.ReactNode, customer?: typeof customersTable.$inferSelect, description: string, title: string, variant?: "link" | "default" | "outline" | "secondary" | "destructive" | "ghost" }) => {

const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
       <DialogTrigger asChild>
         <Button variant={variant} className="cursor-pointer">
           {icon}
           {label}
         </Button>
       </DialogTrigger>
       <UpsertCustomerForm title={title} description={description} onSuccess={() => setDialogIsOpen(false)} customer={customer} />
    </Dialog>
  );    
};

export { AddCustomerButton };
