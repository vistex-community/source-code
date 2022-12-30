export function getInitialName(name) {
  if (name) {
    return name.split(" ")[0].charAt(0);
  }
}

export function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
  }).format(timestamp);
}

export function sortObjectsByTimestamp(objects) {
  return objects.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
}
