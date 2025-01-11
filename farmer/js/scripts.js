 // Inicializar el mapa
 const map = L.map('map').setView([4.6419, -74.2446], 16);

 // Agregar capa base
  // Capa base satelital de Esri
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Imágenes © <a href="https://www.esri.com/">Esri</a>, © OpenStreetMap contributors'
  }).addTo(map);
 // Fechas y cultivos
// Áreas de cultivo (datos ampliados)
const cultivos = {
  "2024-12-01": [
    { name: "Puerro", coordinates: [[4.641890, -74.244562], [4.642393, -74.243780], [4.641860, -74.243730], [4.641365, -74.244500]], color: "Turquoise",
      description: "Cosechando" },
    { name: "Acelga", coordinates: [[4.641350, -74.244500], [4.641845, -74.243730], [4.641253, -74.243658], [4.640750, -74.244491]], color: "LawnGreen",
      description: "Cosechando segundo pase" },
    { name: "Brocoli", coordinates: [[4.640740, -74.244490], [4.641240, -74.243660], [4.640730, -74.243610], [4.640195, -74.244491]], color: "Teal",
      description: "Cosechando" },
    { name: "Brocoli", coordinates: [[4.640185, -74.244490], [4.640715, -74.243610], [4.640310, -74.243590], [4.639905, -74.244491]], color: "SteelBlue",
      description: "Rastrojo"}
  ],
  "2024-12-02": [
    { name: "Puerro", coordinates: [[4.641840, -74.244542], [4.642383, -74.243816], [4.641976, -74.243748], [4.641479, -74.244534]], color: "Turquoise" },
    { name: "Acelga", coordinates: [[4.641479, -74.244534], [4.641976, -74.243748], [4.641253, -74.243688], [4.640733, -74.244481]], color: "LawnGreen" },
    { name: "Brocoli", coordinates: [[4.641079, -74.244524], [4.641676, -74.243678], [4.641253, -74.243688], [4.640733, -74.244481]], color: "SteelBlue" },
    { name: "Brocoli", coordinates: [[4.641479, -74.244534], [4.641976, -74.243748], [4.641253, -74.243688], [4.640733, -74.244481]], color: "Teal" }
  ],
  "2024-12-23": [
    { name: "Brocoli", coordinates: [[4.641840, -74.244542], [4.642383, -74.243816], [4.641976, -74.243748], [4.641479, -74.244534]], color: "blue",
      description: "Por sembrar"
    },
    { name: "Apio", coordinates: [[4.641479, -74.244534], [4.641976, -74.243748], [4.641253, -74.243688], [4.640733, -74.244481]], color: "gold",
      description: "Por sembrar"
     },
    { name: "Acelga", coordinates: [[4.641479, -74.244534], [4.641976, -74.243748], [4.641253, -74.243688], [4.640733, -74.244481]], color: "gold",
      description: "Por sembrar"
    },
    { name: "Acelga", coordinates: [[4.641479, -74.244534], [4.641976, -74.243748], [4.641253, -74.243688], [4.640733, -74.244481]], color: "gold",
      description: "En desarrollo para tercer pase"
    },
    { name: "Apio", coordinates: [[4.641479, -74.244534], [4.641976, -74.243748], [4.641253, -74.243688], [4.640733, -74.244481]], color: "gold",
      description: "Siembra 33k"
     },
    { name: "Acelga", coordinates: [[4.641479, -74.244534], [4.641976, -74.243748], [4.641253, -74.243688], [4.640733, -74.244481]], color: "gold",
      description: "Siembra 9k"
     },
    { name: "Puerro", coordinates: [[4.641479, -74.244534], [4.641976, -74.243748], [4.641253, -74.243688], [4.640733, -74.244481]], color: "gold",
      description: "20k en desarrollo"
     }
  ],
  "2024-12-24": [
    { name: "Brocoli", coordinates: [[4.641840, -74.244542], [4.642383, -74.243816], [4.641976, -74.243748], [4.641479, -74.244534]], color: "blue",
      description: "Siembra de 35k plantulas"
    },
    { name: "Apio", coordinates: [[4.641479, -74.244534], [4.641976, -74.243748], [4.641253, -74.243688], [4.640733, -74.244481]], color: "gold",
      description: "Siembra de 2k plantulas"
     },
    { name: "Acelga", coordinates: [[4.641479, -74.244534], [4.641976, -74.243748], [4.641253, -74.243688], [4.640733, -74.244481]], color: "gold",
      description: "Siembra de 2.5k plantulas"
    },
    { name: "Acelga", coordinates: [[4.641479, -74.244534], [4.641976, -74.243748], [4.641253, -74.243688], [4.640733, -74.244481]], color: "gold",
      description: "En desarrollo para tercer pase"
    },
    { name: "Apio", coordinates: [[4.641479, -74.244534], [4.641976, -74.243748], [4.641253, -74.243688], [4.640733, -74.244481]], color: "gold",
      description: "Sembradas 33k"
     },
    { name: "Acelga", coordinates: [[4.641479, -74.244534], [4.641976, -74.243748], [4.641253, -74.243688], [4.640733, -74.244481]], color: "gold",
      description: "Sembradas 9k"
     },
    { name: "Puerro", coordinates: [[4.641479, -74.244534], [4.641976, -74.243748], [4.641253, -74.243688], [4.640733, -74.244481]], color: "gold",
      description: "20k en desarrollo"
     }
  ]
};
 const fechas = ["2024-12-01"];

 // Contenedor para las capas activas
 let activeLayers = [];
 let tempLayer = null;

 // Mostrar cultivos para una fecha
 function showCultivosForDate(date) {
   activeLayers.forEach(layer => map.removeLayer(layer));
   activeLayers = [];

   const infoDiv = document.getElementById('info');
   infoDiv.innerHTML = '';

   if (cultivos[date]) {
     cultivos[date].forEach(cultivo => {
       const layer = L.polygon(cultivo.coordinates, {
         color: cultivo.color,
         fillOpacity: 0.5
       }).addTo(map);

       activeLayers.push(layer);

       infoDiv.innerHTML += `
         <div class="info-box">
           <h3>${cultivo.name}</h3>
           <p>${cultivo.description}</p>
         </div>
       `;
     });

     map.fitBounds(L.featureGroup(activeLayers).getBounds());
   } else {
     infoDiv.innerHTML = '<p>No hay cultivos en esta fecha</p>';
   }
 }

 // Inicializar línea de tiempo
 const slider = document.getElementById('slider');
 noUiSlider.create(slider, {
   start: [0],
   range: { min: 0, max: fechas.length - 1 },
   step: 1,
   tooltips: true,
   format: {
     to: value => fechas[Math.round(value)] || "Sin fecha",
     from: value => fechas.indexOf(value)
   }
 });

 slider.noUiSlider.on('update', values => {
   const selectedDate = values[0];
   showCultivosForDate(selectedDate);
 });

 // Inicializar GeoMan
 map.pm.addControls({
   position: 'topright',
   drawCircle: false,
   drawMarker: false
 });

 // Manejar creación de áreas nuevas
 map.on('pm:create', e => {
   tempLayer = e.layer;
   document.getElementById('cultivoModal').classList.add('active');
   document.getElementById('overlay').classList.add('active');
 });

 // Cerrar modal y guardar cultivo
 document.getElementById('cultivoForm').addEventListener('submit', e => {
   e.preventDefault();

   const name = document.getElementById('cultivoName').value;
   const color = document.getElementById('cultivoColor').value;
   const description = document.getElementById('cultivoDescription').value;
   const date = document.getElementById('cultivoDate').value; // Nueva fecha
   const coordinates = tempLayer.getLatLngs()[0].map(latlng => [latlng.lat, latlng.lng]);

   if (!cultivos[date]) cultivos[date] = [];
   cultivos[date].push({ name, color, description, coordinates });

   tempLayer.setStyle({ color, fillOpacity: 0.5 });
   activeLayers.push(tempLayer);

   showCultivosForDate(date);

   document.getElementById('cultivoModal').classList.remove('active');
   document.getElementById('overlay').classList.remove('active');
 });

 document.getElementById('overlay').addEventListener('click', () => {
   document.getElementById('cultivoModal').classList.remove('active');
   document.getElementById('overlay').classList.remove('active');
   if (tempLayer) map.removeLayer(tempLayer);
   tempLayer = null;
 });

 showCultivosForDate(fechas[0]);