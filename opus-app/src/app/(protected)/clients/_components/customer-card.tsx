"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { customersTable } from "@/db/schema";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UpsertCustomerForm } from "./upsert-client-form";
import { Edit } from "lucide-react";

interface CustomerCardProps {
  customer: typeof customersTable.$inferSelect;
}

const CustomerCard = ({ customer }: CustomerCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customerStatus, setCustomerStatus] = useState(customer.status_ai);

  const customerInitials = customer.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <Card className="max-w-full">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>{customerInitials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h2 className="font-medium">{customer.name}</h2>
              <p className="text-muted-foreground text-sm">{customer.phone}</p>
            </div>
          </div>
          <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-[120px] cursor-pointer">
                  <Edit />
                  Editar
                </Button>
              </DialogTrigger>

              <UpsertCustomerForm
                title="Editar Cliente"
                description="Edite os dados do cliente"
                customer={customer}
                onSuccess={() => setIsOpen(false)}
              ></UpsertCustomerForm>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <Separator></Separator>
      <CardContent className="flex flex-col gap-2">
        <div className="flex w-full justify-between">
          <p className="text-muted-foreground text-sm">Email:</p>
          <Badge variant="outline">{customer.email}</Badge>
        </div>
        <div className="flex w-full justify-between">
          <p className="text-muted-foreground text-sm">Whatsapp:</p>
          <Badge variant="outline">{customer.phone}</Badge>
        </div>
        <div className="flex w-full justify-between">
          <p className="text-muted-foreground text-sm">Status da IA:</p>
          <Badge variant="outline" className={customer.status_ai == "disable" ? "bg-red-500 text-white" : "bg-green-500 text-white"}>
          {customer.status_ai === "disable" ? "Desativado" : "Ativado"}
        </Badge>
        </div>
        
      </CardContent>
      <CardFooter className="flex flex-col items-end justify-end gap-4"></CardFooter>
    </Card>
  );
};

export default CustomerCard;
