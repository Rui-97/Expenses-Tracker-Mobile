export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
