"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PeriodSelect({ value }: { value: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  return (
    <Select
      value={value}
      onValueChange={(v) => {
        const next = new URLSearchParams(params.toString());
        next.set("period", v);
        router.push(`${pathname}?${next.toString()}`);
      }}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Periode" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="7">7 hari</SelectItem>
        <SelectItem value="30">30 hari</SelectItem>
        <SelectItem value="90">90 hari</SelectItem>
      </SelectContent>
    </Select>
  );
}
