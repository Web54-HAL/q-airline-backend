export function normalizePhoneNumber(phone: string): string {
  // Following Regex for Vietnamese phone number.
  const regex = /(?:\+?84|0084|0)([235789][0-9]{1,2}[0-9]{7})/;

  const match = phone.match(regex);
  if (match) return `84${match[1]}`;

  return null;
}
