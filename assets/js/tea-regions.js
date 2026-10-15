/* ========== Tea Regions Component Logic & Live Weather ========== */

const tabsContainer = document.getElementById('tabs');
const panelContainer = document.getElementById('panel');

// Weather icons සහ labels
function parseWeatherCode(code) {
  if (code === 0) return { label: 'Clear', icon: '☀️' };
  if ([1, 2].includes(code)) return { label: 'Partly Cloudy', icon: '⛅' };
  if (code === 3) return { label: 'Overcast', icon: '☁️' };
  if ([45, 48].includes(code)) return { label: 'Misty', icon: '🌫️' };
  if ([51, 53, 55, 61, 63, 65].includes(code)) return { label: 'Rain', icon: '🌧️' };
  if ([80, 81, 82].includes(code)) return { label: 'Showers', icon: '🌦️' };
  if ([95, 96, 99].includes(code)) return { label: 'Thunderstorm', icon: '⛈️' };
  return { label: 'Fair', icon: '🌤️' };
}

// Compact Live Weather Fetch
async function updateLiveWeather(lat, lon, targetElementId) {
  const el = document.getElementById(targetElementId);
  if (!el) return;

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load');
    
    const data = await res.json();
    const current = data.current;
    const weather = parseWeatherCode(current.weather_code);

    el.innerHTML = `
      <div class="header-weather-pill">
        <span>${weather.icon} ${current.temperature_2m}°C ${weather.label}</span>
        <span>•</span>
        <span>💧 ${current.relative_humidity_2m}%</span>
        <span>•</span>
        <span>💨 ${current.wind_speed_10m} km/h</span>
      </div>
    `;
  } catch (error) {
    el.innerHTML = `<span style="font-size: 0.75rem; opacity: 0.7;">Weather offline</span>`;
  }
}

// Reference Image එකේ Layout එකට Render කිරීම
function renderPanel(region) {
  panelContainer.innerHTML = `
    <!-- Dark Green Top Bar -->
    <div class="panel-header-strip">
      <div class="header-content">
        <span class="district-tag">${region.districtLabel}</span>
        <span class="region-title">${region.name}</span>
        <span class="region-desc">${region.description}</span>
      </div>
      <div id="live-weather">
        <span style="font-size: 0.75rem; opacity: 0.7;">Updating weather...</span>
      </div>
    </div>
    
    <!-- Specs / Elevation Row -->
    <div class="panel-specs-strip">
      <span>Elevation <strong>${region.elevation}</strong></span>
      <span>Liquor <strong>${region.liquor}</strong></span>
      <span>Tea style <strong>${region.teaStyle}</strong></span>
    </div>

    <!-- 4 Clean Columns without bulky card boxes -->
    <div class="panel-details-grid">
      <div class="detail-col">
        <h4>✦ Leaf varieties & grades</h4>
        <p>${region.leafGrades}</p>
      </div>
      <div class="detail-col">
        <h4>✦ Aroma</h4>
        <p>${region.aroma}</p>
      </div>
      <div class="detail-col">
        <h4>✦ Flavour</h4>
        <p>${region.flavour}</p>
      </div>
      <div class="detail-col">
        <h4>✦ Distinctive character</h4>
        <p>${region.distinctiveCharacter}</p>
      </div>
    </div>
  `;

  // Fetch Live weather
  updateLiveWeather(region.lat, region.lon, 'live-weather');
}

// Tabs සෑදීම (දෙවන පින්තූරයේ මෙන් නම පමණක් පෙන්වයි)
function createTabs() {
  if (!tabsContainer || typeof teaRegions === 'undefined') return;

  tabsContainer.innerHTML = '';
  teaRegions.forEach((region, index) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.textContent = region.name;
    
    btn.onclick = () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPanel(region);
    };

    if (index === 0) {
      btn.classList.add('active');
      renderPanel(region);
    }

    tabsContainer.appendChild(btn);
  });
}

document.addEventListener('DOMContentLoaded', createTabs);