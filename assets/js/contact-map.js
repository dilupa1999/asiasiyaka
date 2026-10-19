document.addEventListener("DOMContentLoaded", function () {
  if (typeof L === "undefined") {
    console.error("Leaflet was not loaded. Check the Leaflet JavaScript import.");
    return;
  }

  const locations = [
    { elementId: "colombo-office-map", coordinates: [6.9271, 79.8612], title: "Asia Siyaka Head Office", description: "Deutsche House Building, 320 T. B. Jayah Mawatha, Colombo 01000", zoom: 15 },
    { elementId: "wattala-warehouse-map", coordinates: [6.9905, 79.8920], title: "Asia Siyaka Warehouse", description: "No. 95, Ella Road, Hendala, Wattala", zoom: 15 }
  ];

  locations.forEach(function (location) {
    const element = document.getElementById(location.elementId);
    if (!element || element.dataset.mapInitialized === "true") return;

    element.dataset.mapInitialized = "true";
    const map = L.map(element, { scrollWheelZoom: false }).setView(location.coordinates, location.zoom);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>'
    }).addTo(map);
    L.marker(location.coordinates).addTo(map).bindPopup("<strong>" + location.title + "</strong><br>" + location.description);
    window.setTimeout(function () { map.invalidateSize(); }, 150);
  });
});