export const formatCPF = (cpf?: string): string => {
  if (!cpf) {
    return "";
  }

  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) {
    throw new Error("CPF deve conter 11 dígitos");
  }

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};
