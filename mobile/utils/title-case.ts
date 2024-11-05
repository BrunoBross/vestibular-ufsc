export function toTitleCase(str: string): string | null {
  if (!str) {
    return null;
  }

  return str
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}
