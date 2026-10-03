export function getMapsEmbedUrl(input: string): string {
  if (!input) {
    return "";
  }

  // Check if string contains coordinates like "11.2588, 75.7804"
  const coords = input.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
  if (coords) {
    return `https://maps.google.com/maps?q=${coords[1]},${coords[2]}&z=17&output=embed`;
  }

  // Already a Google Maps embed URL
  if (input.includes("/maps/embed") || input.includes("output=embed")) {
    return input;
  }

  // Full URL or text address
  return `https://maps.google.com/maps?q=${encodeURIComponent(input)}&output=embed`;
}

export function getDirectionsUrl(addressOrCoords: string): string {
  if (!addressOrCoords) {
    return "https://maps.google.com";
  }

  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressOrCoords)}`;
}
