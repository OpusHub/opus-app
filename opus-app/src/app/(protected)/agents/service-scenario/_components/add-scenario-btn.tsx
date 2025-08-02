"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { UpsertCustomerForm } from "@/app/(protected)/clients/_components/upsert-client-form";
import { customersTable, supportScenariosTable } from "@/db/schema";
import { UpsertScenarioForm } from "./upsert-scenario-form";


interface UpsertScenarioFormProps {
  scenario?: typeof supportScenariosTable.$inferSelect;
  onSuccess?: () => void;
}

const AddScenarioButton = ( {label, icon, scenario, title, variant} : {label: string, icon: React.ReactNode, scenario?: typeof supportScenariosTable.$inferSelect, title: string, variant?: "link" | "default" | "outline" | "secondary" | "destructive" | "ghost" }) => {

const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
       <DialogTrigger asChild>
         <Button variant={variant} className="cursor-pointer">
           {icon}
           {label}
         </Button>
       </DialogTrigger>
       <UpsertScenarioForm title={title}  onSuccess={() => setDialogIsOpen(false)} scenario={scenario} />
    </Dialog>
  );    
};

export { AddScenarioButton };
