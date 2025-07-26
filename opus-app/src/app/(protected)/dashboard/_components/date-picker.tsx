"use client";

import * as React from "react";
import { Calendar1Icon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { parseAsIsoDate, useQueryState } from "nuqs";
import { addMonths, format } from "date-fns";
import { DateRange } from "react-day-picker";

export function DateRangePicker({ label }: { label: string }) {
  const [from, setFrom] = useQueryState(
    "from",
    parseAsIsoDate.withDefault(new Date()),
  );
  const [to, setTo] = useQueryState(
    "to",
    parseAsIsoDate.withDefault(addMonths(new Date(), 1)),
  );
  const [open, setOpen] = React.useState(false);

  const range = {
    from,
    to,
  };

  const handleDateRangeSelected = (dateRange: DateRange | undefined) => {
    if (dateRange?.from) {
      setFrom(dateRange.from);
    }
    if (dateRange?.to) {
      setTo(dateRange.to);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date-range" className="px-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-range"
            className="w-64 justify-between font-normal"
          >
            <Calendar1Icon />
            {range?.from && range?.to ? (
              <>
                {format(range.from, "LLL dd, y", {
                  locale: ptBR,
                })}{" "}
                -{" "}
                {format(range.to, "LLL dd, y", {
                  locale: ptBR,
                })}
              </>
            ) : (
              "Selecione o intervalo"
            )}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={range}
            defaultMonth={range?.from}
            showOutsideDays={false}
            locale={ptBR}
            onSelect={handleDateRangeSelected}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
