document.addEventListener('DOMContentLoaded', function() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        const map = L.map('map').setView([6.96, 79.87], 11);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const locations = [
            {
                coords: [6.9189, 79.8601],
                name: 'Head Office – Colombo',
                address: 'Deutsche House Building, 320 T. B. Jayah Mawatha, Colombo 01000, Sri Lanka',
                url: 'https://www.google.com/maps/dir/?api=1&destination=Deutsche+House+Building%2C+320+T.+B.+Jayah+Mawatha%2C+Colombo+01000%2C+Sri+Lanka'
            },
            {
                coords: [7.0069, 79.8826],
                name: 'Warehouse – Wattala',
                address: 'No. 95, Ella Road, Hendala, Wattala, Sri Lanka',
                url: 'https://www.google.com/maps/dir/?api=1&destination=No.+95%2C+Ella+Road%2C+Hendala%2C+Wattala%2C+Sri+Lanka'
            }
        ];

        const bounds = L.latLngBounds();

        locations.forEach(loc => {
            const marker = L.marker(loc.coords).addTo(map);
            marker.bindPopup(`<b>${loc.name}</b><br>${loc.address}<br><a href="${loc.url}" target="_blank" class="btn btn-sm btn-success mt-2">Get Directions</a>`);
            bounds.extend(loc.coords);
        });

        map.fitBounds(bounds, { padding: [50, 50] });
    }
});
