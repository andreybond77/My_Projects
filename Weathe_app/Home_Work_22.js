// Функция для выполнения запросов с повторными попытками
async function getResponseWithRetries(url, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`Попытка №${attempt}...`);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            console.log("Запрос выполнен успешно.");
            return await response.json();
        } catch (error) {
            console.error(`Попытка №${attempt} не удалась:`, error.message);

            if (attempt === retries) {
                throw new Error("Не удалось получить данные после нескольких попыток.");
            }

            // Добавляем задержку перед следующей попыткой
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }
}

// Функция для геокодирования (получение координат)
async function getCityCoordinates(cityName) {
    const apiKey = "23496c2a58b99648af590ee8a29c5348";
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
    try {
        const response = await getResponseWithRetries(url);
        if (response.length === 0) throw new Error("Город не найден");
        return { lat: response[0].lat, lon: response[0].lon };
    } catch (error) {
        console.error("Ошибка при получении координат:", error.message);
        throw error;
    }
}

// Функция для текущей погоды
async function getCurrentWeather(lat, lon) {
    const apiKey = "23496c2a58b99648af590ee8a29c5348";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`;
    return await getResponseWithRetries(url);
}

// Функция для прогноза на 5 дней
async function getForecast(lat, lon) {
    const apiKey = "23496c2a58b99648af590ee8a29c5348";
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`;
    return await getResponseWithRetries(url);
}

// Функция для качества воздуха
async function getAirQuality(lat, lon) {
    const apiKey = "23496c2a58b99648af590ee8a29c5348";
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    return await getResponseWithRetries(url);
}

// Отрисовка текущей погоды
function displayCurrentWeather(data) {
    const weatherCard = document.getElementById("currentWeatherCard");
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherCard.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${iconUrl}" alt="Погода" />
        <p><strong>Температура:</strong> ${data.main.temp}°C</p>
        <p><strong>Ощущается как:</strong> ${data.main.feels_like}°C</p>
        <p><strong>Описание:</strong> ${data.weather[0].description}</p>
        <p><strong>Ветер:</strong> ${data.wind.speed} м/с</p>
        <p><strong>Влажность:</strong> ${data.main.humidity}%</p>
    `;
    weatherCard.classList.remove("hidden");
}

// Отрисовка прогноза на 5 дней
function displayForecast(data) {
    const forecastContainer = document.getElementById("forecastContainer");
    forecastContainer.innerHTML = "";

    const uniqueDates = [...new Set(data.list.map(item => item.dt_txt.split(" ")[0]))];

    uniqueDates.forEach(date => {
        const forecastForDate = data.list.filter(item => item.dt_txt.startsWith(date));
        const dailyForecast = forecastForDate.reduce((acc, curr) => {
            acc.temp += curr.main.temp;
            acc.count++;
            return acc;
        }, { temp: 0, count: 0 });

        const averageTemp = (dailyForecast.temp / dailyForecast.count).toFixed(1);
        const iconUrl = `https://openweathermap.org/img/wn/${forecastForDate[0].weather[0].icon}.png`;

        const dayCard = document.createElement("div");
        dayCard.className = "forecast-card";
        dayCard.innerHTML = `
            <h3>${new Date(date).toLocaleDateString()}</h3>
            <img src="${iconUrl}" alt="Прогноз" />
            <p><strong>Средняя температура:</strong> ${averageTemp}°C</p>
        `;
        forecastContainer.appendChild(dayCard);
    });

    forecastContainer.classList.remove("hidden");
}

// Отрисовка качества воздуха
function displayAirQuality(data) {
    const aqiLevels = ["Хорошее", "Удовлетворительное", "Умеренное", "Нездоровое", "Очень нездоровое", "Опасное"];
    const aqiIndex = data.list[0].main.aqi;

    const airQualityCard = document.getElementById("airQualityCard");
    airQualityCard.innerHTML = `
    
        <h3 class="bi bi-tornado"> Качество воздуха</h3>
        <p><strong>Индекс:</strong> ${aqiIndex} (${aqiLevels[aqiIndex - 1]})</p>
    `;
    airQualityCard.classList.remove("hidden");
}

// Функция для показа/скрытия элемента
function toggleElement(show, element) {
    element.classList.toggle("hidden", !show);
}

// Обработчик отправки формы
document.getElementById("weatherForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const cityInput = document.getElementById("cityInput").value.trim();
    if (!cityInput) {
        alert("Введите название города.");
        return;
    }

    const spinner = document.getElementById("spinner");
    toggleElement(true, spinner);

    try {
        // Шаг 1: Получаем координаты
        const { lat, lon } = await getCityCoordinates(cityInput);

        // Шаг 2: Параллельные запросы с Promise.all
        const [currentWeather, forecast, airQuality] = await Promise.all([
            getCurrentWeather(lat, lon),
            getForecast(lat, lon),
            getAirQuality(lat, lon)
        ]);

        // Шаг 3: Отображаем данные
        displayCurrentWeather(currentWeather);
        displayForecast(forecast);
        displayAirQuality(airQuality);
    } catch (error) {
        console.error("Произошла ошибка:", error.message);
        renderErrorCard("Не удалось загрузить данные. Попробуйте позже.");
    } finally {
        toggleElement(false, spinner);
    }
});

// Функция для отрисовки сообщения об ошибке
function renderErrorCard(message) {
    const errorCard = document.getElementById("errorCard");
    errorCard.textContent = message;
    errorCard.classList.remove("hidden");
}