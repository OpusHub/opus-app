'use client'
import { Input } from "./ui/input";

export const InputSearch = ({ placeholder, onChange }: { placeholder: string; onChange?: (value: string) => void }) => {
  return (
    <Input
      placeholder={placeholder}
      onChange={e => onChange?.(e.target.value)}
    />
  );
}