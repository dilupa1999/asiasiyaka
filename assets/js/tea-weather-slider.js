(() => {
  "use strict";

  const track = document.getElementById("tea-weather-track");
  const dotsContainer = document.getElementById("tea-weather-dots");
  const previousButton = document.querySelector(".tea-weather-prev");
  const nextButton = document.querySelector(".tea-weather-next");
  const viewport = document.querySelector(".tea-weather-viewport");

  if (!track || !dotsContainer || !viewport ||
      !Array.isArray(window.teaWeatherRegions || teaWeatherRegions)) {
    return;
  }

  let activeIndex = 0;
  let resizeTimer;

  function weatherInfo(code) {
    if (code === 0) return { label: "Clear sky", icon: "☀️" };
    if (code === 1) return { label: "Mainly clear", icon: "🌤️" };
    if (code === 2) return { label: "Partly cloudy", icon: "⛅" };
    if (code === 3) return { label: "Overcast", icon: "☁️" };
    if ([45, 48].includes(code)) return { label: "Foggy", icon: "🌫️" };
    if ([51, 53, 55, 56, 57].includes(code)) return { label: "Drizzle", icon: "🌦️" };
    if ([61, 63, 65, 66, 67].includes(code)) return { label: "Rain", icon: "🌧️" };
    if ([71, 73, 75, 77].includes(code)) return { label: "Snow", icon: "🌨️" };
    if ([80, 81, 82].includes(code)) return { label: "Rain showers", icon: "🌦️" };
    if ([85, 86].includes(code)) return { label: "Snow showers", icon: "🌨️" };
    if ([95, 96, 99].includes(code)) return { label: "Thunderstorm", icon: "⛈️" };
    return { label: "Weather update", icon: "🌤️" };
  }

  function createCards() {
    track.innerHTML = "";
    dotsContainer.innerHTML = "";

    teaWeatherRegions.forEach((region, index) => {
      const card = document.createElement("article");
      card.className = "tea-weather-card";
      card.setAttribute("aria-label", `${region.name} weather`);

      card.innerHTML = `
        <div class="tea-weather-image-wrap">
          <img
            class="tea-weather-image"
            src="${region.image}"
            alt="${region.name} tea-region landscape"
            loading="${index < 3 ? "eager" : "lazy"}"
          >
          <div class="tea-weather-image-fallback" aria-hidden="true">🌿</div>
        </div>

        <div class="tea-weather-card-body">
          <h3>${region.name}</h3>

          <div class="tea-weather-main">
            <span class="tea-weather-icon" id="weather-icon-${region.id}" aria-hidden="true">⏳</span>
            <div class="tea-weather-temperature-block">
              <strong id="temperature-${region.id}">--°C</strong>
              <span id="condition-${region.id}">Loading weather…</span>
            </div>
          </div>

          <div class="tea-weather-metrics">
            <div class="tea-weather-metric">
              <span class="tea-weather-metric-icon" aria-hidden="true">💧</span>
              <div>
                <strong id="humidity-${region.id}">--%</strong>
                <span>Humidity</span>
              </div>
            </div>
            <div class="tea-weather-metric">
              <span class="tea-weather-metric-icon" aria-hidden="true">≋</span>
              <div>
                <strong id="wind-${region.id}">-- km/h</strong>
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

      track.appendChild(card);

      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "tea-weather-dot";
      dot.setAttribute("aria-label", `Show ${region.name}`);
      dot.addEventListener("click", () => {
        activeIndex = index;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    });

    updateSlider();
  }

  async function loadRegionWeather(region) {
    const temperature = document.getElementById(`temperature-${region.id}`);
    const condition = document.getElementById(`condition-${region.id}`);
    const icon = document.getElementById(`weather-icon-${region.id}`);
    const humidity = document.getElementById(`humidity-${region.id}`);
    const wind = document.getElementById(`wind-${region.id}`);

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
      temperature.textContent = `${Math.round(current.temperature_2m)}°C`;
      condition.textContent = weather.label;
      icon.textContent = weather.icon;
      humidity.textContent = `${current.relative_humidity_2m}%`;
      wind.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
    } catch (error) {
      console.error(`Unable to load weather for ${region.name}:`, error);
      temperature.textContent = "--°C";
      condition.textContent = "Weather unavailable";
      icon.textContent = "☁️";
      humidity.textContent = "--%";
      wind.textContent = "-- km/h";
    }
  }

  function cardsVisible() {
    if (window.matchMedia("(max-width: 575px)").matches) return 1;
    if (window.matchMedia("(max-width: 991px)").matches) return 2;
    return 3;
  }

  function maxIndex() {
    return Math.max(0, teaWeatherRegions.length - cardsVisible());
  }

  function updateSlider() {
    activeIndex = Math.min(activeIndex, maxIndex());

    const firstCard = track.querySelector(".tea-weather-card");
    if (!firstCard) return;

    const trackStyle = window.getComputedStyle(track);
    const gap = parseFloat(trackStyle.columnGap || trackStyle.gap) || 0;
    const cardWidth = firstCard.getBoundingClientRect().width;
    track.style.transform = `translateX(-${activeIndex * (cardWidth + gap)}px)`;

    [...dotsContainer.children].forEach((dot, index) => {
      dot.classList.toggle("active", index === activeIndex);
      dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
    });

    if (previousButton) previousButton.disabled = activeIndex === 0;
    if (nextButton) nextButton.disabled = activeIndex >= maxIndex();
  }

  previousButton?.addEventListener("click", () => {
    activeIndex = Math.max(0, activeIndex - 1);
    updateSlider();
  });

  nextButton?.addEventListener("click", () => {
    activeIndex = Math.min(maxIndex(), activeIndex + 1);
    updateSlider();
  });

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateSlider, 100);
  });

  createCards();
  teaWeatherRegions.forEach(loadRegionWeather);
})();
