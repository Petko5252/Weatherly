const apiKey = "3c817483f13b49b093a90131250401";
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

function fetchWeather(query) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      document.getElementById("city").textContent = data.location.name;
      document.getElementById("temp").textContent = `${data.current.temp_c}°C`;
      document.getElementById("desc").textContent = data.current.condition.text;
      document.getElementById("icon").src = `https:${data.current.condition.icon}`;
    })
    .catch(() => {
      document.getElementById("city").textContent = "Error fetching weather";
      document.getElementById("temp").textContent = "";
      document.getElementById("desc").textContent = "";
      document.getElementById("icon").src = "";
    });
}

// On page load, get location weather
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (pos) => fetchWeather(`${pos.coords.latitude},${pos.coords.longitude}`),
    () => document.getElementById("city").textContent = "Enable location or enter a city"
  );
} else {
  document.getElementById("city").textContent = "Geolocation not supported";
}

// Search by city name
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

// Enter key support
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

// Theme toggle
const toggleButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeIcon.setAttribute("data-lucide", theme === "dark" ? "moon" : "sun");
  lucide.createIcons();
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else {
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(systemPrefersDark ? "dark" : "light");
}

toggleButton.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});
