import { CarTaxiFrontIcon, ShoppingBagIcon, ShoppingBag } from "lucide-react";
import { Card, CardHeader, CardContent } from "./ui/card";

const CardDashboard = ({
    title ,
    Icon ,
    value ,
}: {
    title: string;
    Icon: React.ComponentType<{ className?: string }>;
    value: number | string;
}) => {
  return (
    <Card className="p-6 min-w-fit  flex flex-col justify-around">
      <CardHeader className="flex gap-4 items-center">
        <Icon className="h-4 w-4" />
        <h2 className="text-sm font-semibold">{title}</h2>
      </CardHeader>
      <CardContent>
        <h1 className="text-4xl font-semibold" >{value}</h1>
      </CardContent>
    </Card>
  );
};

export default CardDashboard;
