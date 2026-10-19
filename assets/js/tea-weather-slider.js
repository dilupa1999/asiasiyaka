(() => {
  "use strict";

  const track = document.getElementById("tea-weather-track");
  const viewport = document.querySelector(".tea-weather-viewport");
  const regions = window.teaWeatherRegions || teaWeatherRegions;

  if (!track || !viewport || !Array.isArray(regions)) {
    return;
  }

  let resizeTimer;

  function weatherInfo(code) {
    if (code === 0) return { label: "Clear sky", icon: "☀️", effect: "clear" };
    if (code === 1) return { label: "Mainly clear", icon: "🌤️", effect: "mainly-clear" };
    if (code === 2) return { label: "Partly cloudy", icon: "⛅", effect: "partly-cloudy" };
    if (code === 3) return { label: "Overcast", icon: "☁️", effect: "overcast" };
    if ([45, 48].includes(code)) return { label: "Foggy", icon: "🌫️", effect: "fog" };
    if ([51, 53, 55, 56, 57].includes(code)) return { label: "Drizzle", icon: "🌦️", effect: "drizzle" };
    if ([61, 63, 65, 66, 67].includes(code)) return { label: "Rain", icon: "🌧️", effect: "rain" };
    if ([71, 73, 75, 77].includes(code)) return { label: "Snow", icon: "🌨️", effect: "snow" };
    if ([80, 81, 82].includes(code)) return { label: "Rain showers", icon: "🌦️", effect: "showers" };
    if ([85, 86].includes(code)) return { label: "Snow showers", icon: "🌨️", effect: "snow" };
    if ([95, 96, 99].includes(code)) return { label: "Thunderstorm", icon: "⛈️", effect: "thunderstorm" };
    return { label: "Weather update", icon: "🌤️", effect: "mainly-clear" };
  }

  function cardsVisible() {
    if (window.matchMedia("(max-width: 575px)").matches) return 1;
    if (window.matchMedia("(max-width: 991px)").matches) return 2;
    if (window.matchMedia("(max-width: 1199px)").matches) return 3;
    return 5;
  }

  function setCardWidth() {
    const viewportWidth = viewport.clientWidth;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 18;
    const visible = cardsVisible();
    const width = (viewportWidth - gap * (visible - 1)) / visible;
    track.style.setProperty("--tea-card-width", `${width}px`);
  }

  function createCard(region, index) {
    const card = document.createElement("article");
    card.className = "tea-weather-card";
    card.setAttribute("aria-label", `${region.name} weather`);
    card.dataset.regionId = region.id;

    card.innerHTML = `
      <div class="tea-weather-image-wrap">
        <img
          class="tea-weather-image"
          src="${region.image}"
          alt="${region.name} tea-region landscape"
          loading="${index < 5 ? "eager" : "lazy"}"
        >
        <div class="tea-weather-image-fallback" aria-hidden="true">🌿</div>
        <div class="tea-weather-fx" data-weather-fx="${region.id}" aria-hidden="true">
          <span class="tea-weather-fx-sun"></span>
          <span class="tea-weather-fx-cloud tea-weather-fx-cloud-a"></span>
          <span class="tea-weather-fx-cloud tea-weather-fx-cloud-b"></span>
          <span class="tea-weather-fx-cloud tea-weather-fx-cloud-c"></span>
          <span class="tea-weather-fx-precip"></span>
          <span class="tea-weather-fx-fog"></span>
          <span class="tea-weather-fx-lightning"></span>
        </div>
      </div>

      <div class="tea-weather-card-body">
        <h3>${region.name}</h3>

        <div class="tea-weather-main">
          <span class="tea-weather-icon" data-weather-icon="${region.id}" aria-hidden="true">⏳</span>
          <div class="tea-weather-temperature-block">
            <strong data-weather-temp="${region.id}">--°C</strong>
            <span data-weather-condition="${region.id}">Loading weather…</span>
          </div>
        </div>

        <div class="tea-weather-metrics">
          <div class="tea-weather-metric">
            <span class="tea-weather-metric-icon" aria-hidden="true">💧</span>
            <div>
              <strong data-weather-humidity="${region.id}">--%</strong>
              <span>Humidity</span>
            </div>
          </div>
          <div class="tea-weather-metric">
            <span class="tea-weather-metric-icon" aria-hidden="true">≋</span>
            <div>
              <strong data-weather-wind="${region.id}">-- km/h</strong>
              <span>Wind</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const image = card.querySelector(".tea-weather-image");
    const fallback = card.querySelector(".tea-weather-image-fallback");

    image.addEventListener("error", () => {
      image.style.display = "none";
      fallback.style.display = "grid";
    });

    return card;
  }

  function createCards() {
    track.innerHTML = "";
    const loopedRegions = [...regions, ...regions];

    loopedRegions.forEach((region, index) => {
      track.appendChild(createCard(region, index));
    });

    setCardWidth();
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  }

  function applyWeatherEffect(regionId, effect) {
    document.querySelectorAll(`[data-weather-fx="${regionId}"]`).forEach((overlay) => {
      overlay.dataset.effect = effect || "";
      const wrap = overlay.closest(".tea-weather-image-wrap");
      if (wrap) wrap.dataset.effect = effect || "";
    });
  }

  async function loadRegionWeather(region) {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.search = new URLSearchParams({
      latitude: region.lat,
      longitude: region.lon,
      current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
      timezone: "Asia/Colombo"
    }).toString();

    try {
      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`Weather API returned ${response.status}`);
      }

      const data = await response.json();
      const current = data.current;

      if (!current) throw new Error("Current weather data is missing");

      const weather = weatherInfo(current.weather_code);
      setText(`[data-weather-temp="${region.id}"]`, `${Math.round(current.temperature_2m)}°C`);
      setText(`[data-weather-condition="${region.id}"]`, weather.label);
      setText(`[data-weather-icon="${region.id}"]`, weather.icon);
      setText(`[data-weather-humidity="${region.id}"]`, `${current.relative_humidity_2m}%`);
      setText(`[data-weather-wind="${region.id}"]`, `${Math.round(current.wind_speed_10m)} km/h`);
      applyWeatherEffect(region.id, weather.effect);
    } catch (error) {
      console.error(`Unable to load weather for ${region.name}:`, error);
      setText(`[data-weather-temp="${region.id}"]`, "--°C");
      setText(`[data-weather-condition="${region.id}"]`, "Weather unavailable");
      setText(`[data-weather-icon="${region.id}"]`, "☁️");
      setText(`[data-weather-humidity="${region.id}"]`, "--%");
      setText(`[data-weather-wind="${region.id}"]`, "-- km/h");
      applyWeatherEffect(region.id, "");
    }
  }

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setCardWidth, 100);
  });

  function refreshAllWeather() {
    regions.forEach(loadRegionWeather);
  }

  createCards();
  refreshAllWeather();
  setInterval(refreshAllWeather, 5 * 60 * 1000);
})();
