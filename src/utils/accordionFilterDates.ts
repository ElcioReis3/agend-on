export type FilterType = "thisWeek" | "lastWeek" | "thisMonth" | "all";

export function accordionFilterDates(
  date: Date,
  selectedFilter: FilterType
): boolean {
  const today = new Date();

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const lastWeekStart = new Date(startOfWeek);
  lastWeekStart.setDate(startOfWeek.getDate() - 7);

  const lastWeekEnd = new Date(startOfWeek);
  lastWeekEnd.setDate(startOfWeek.getDate() - 1);

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  switch (selectedFilter) {
    case "thisWeek":
      return date >= startOfWeek && date <= endOfWeek;
    case "lastWeek":
      return date >= lastWeekStart && date <= lastWeekEnd;
    case "thisMonth":
      return date >= startOfMonth && date <= endOfMonth;
    case "all":
    default:
      return true;
  }
}
