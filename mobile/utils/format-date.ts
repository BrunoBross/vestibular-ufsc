import { format } from "date-fns";

export const formatFullDate = (date: Date) => {
  return format(date, "dd/MM/yyyy HH:mm");
};

export const formatHourMinute = (date: Date) => {
  return format(date, "HH:mm");
};
