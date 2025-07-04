"use client";

import { accordionFilterDates, FilterType } from "@/utils/accordionFilterDates";
import { useEffect, useState } from "react";

type FilterDatesProps<T> = {
  data: T[];
  dateKey: keyof T;
  onFilter: (filtered: T[]) => void;
};

export function FilterDates<T>({
  data,
  dateKey,
  onFilter,
}: FilterDatesProps<T>) {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("thisMonth");

  useEffect(() => {
    const filtered = data.filter((item) => {
      const date = new Date(item[dateKey] as string);
      return accordionFilterDates(date, selectedFilter);
    });

    onFilter(filtered);
  }, [selectedFilter, data, dateKey, onFilter]);

  return (
    <div className="mb-3 text-right">
      <select
        className="border rounded px-2 py-1 text-xs"
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value as FilterType)}
      >
        <option value="all">Todas</option>
        <option value="thisMonth">Este mês</option>
        <option value="lastWeek">Semana anterior</option>
        <option value="thisWeek">Esta semana</option>
      </select>
    </div>
  );
}
