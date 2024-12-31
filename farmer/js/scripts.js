// Inicializar el mapa
const map = L.map('map').setView([0, 0], 2);

// Agregar capa base de satélite (Esri)
const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles © <a href="https://www.esri.com/">Esri</a>'
}).addTo(map);

// Áreas de cultivo (datos ampliados)
const cultivos = {
  "2024-12-01": [
    { name: "Puerro", coordinates: [[4.641840, -74.244542], [4.642383, -74.243816], [4.641860, -74.243730], [4.641365, -74.244500]], color: "Turquoise",
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

// Fechas ordenadas
const fechas = Object.keys(cultivos);

// Contenedor para capas de cultivo
let activeLayers = [];

// Función para mostrar áreas de cultivo
function showCultivosForDate(date) {
  activeLayers.forEach(layer => map.removeLayer(layer));
  activeLayers = [];

  if (cultivos[date]) {
    const infoDiv = document.getElementById("info");
    infoDiv.innerHTML = "";

    cultivos[date].forEach(cultivo => {
      const layer = L.polygon(cultivo.coordinates, {
        color: cultivo.color,
        fillOpacity: 0.1
      }).addTo(map);

      activeLayers.push(layer);

      infoDiv.innerHTML += `
        <div class="info-box">
          <h3>${cultivo.name}</h3>
          <p>Detalle: ${cultivo.description}</p>
        </div>
      `;
    });

    map.fitBounds(L.featureGroup(activeLayers).getBounds());
  } else {
    document.getElementById("info").innerHTML = `
      <div class="info-box">
        <h3>No hay cultivos en esta fecha</h3>
      </div>
    `;
  }
}

// Inicializar línea de tiempo
const slider = document.getElementById("slider");
noUiSlider.create(slider, {
  start: [0],
  range: {
    min: 0,
    max: fechas.length - 1
  },
  step: 1,
  tooltips: true,
  format: {
    to: value => fechas[Math.round(value)],
    from: value => fechas.indexOf(value)
  }
});

slider.noUiSlider.on('update', values => {
  const selectedDate = values[0];
  showCultivosForDate(selectedDate);
});

showCultivosForDate(fechas[0]);
