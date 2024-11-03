import { parse } from "date-fns";
import { ptBR } from "date-fns/locale";

const DEFAULT_FORMAT = "dd/MM/yyyy HH:mm";

export const convertStringToDate = (dateString: string) => {
  if (!dateString) {
    return null;
  }

  return parse(dateString, DEFAULT_FORMAT, new Date(), { locale: ptBR });
};
