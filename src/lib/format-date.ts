import { format, parseISO } from "date-fns";

export function formatDate(
  dateString: string,
  formatType: string = "do MMMM yyyy, HH:mm",
) {
  const parsedDate = parseISO(dateString);
  return format(parsedDate, formatType);
}
