// import '../style.css';
import '../scss/main.scss';
import '../index.html';

const weekdayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const date = new Date(),
    hours = date.getHours(),
    month = monthArr[date.getMonth()],
    day = date.getDate(),
    year = date.getFullYear(),
    weekday = weekdayArr[date.getDay()],
    dateRow = `${day}th ${month},  ${year}`;

const wigetParent = document.querySelector('.weather-widget'),
    wigetIcon = document.querySelector('.weather-widget__icon img'),
    tempEl = document.querySelector('.weather-widget__temperature'),
    locationEl = document.querySelector('.weather-widget__location'),
    weekdayEl = document.querySelector('.weather-widget__weekday'),
    dateEl = document.querySelector('.weather-widget__date'),
    descriptionEl = document.querySelector('.weather-widget__description');



const changeData = (weather, temperature, location) => {
    tempEl.innerHTML = `${Math.floor(temperature)}&#176;`;
    locationEl.innerHTML = `${location}`;
    weekdayEl.innerHTML = `${weekday}`;
    dateEl.innerHTML = `${dateRow}`;

    if (weather === 'Rain') {
        wigetParent.classList.add('weather-widget--rain');
        wigetIcon.src = 'img/icon-rain.png';
    } else {
        if (hours >= 6 && hours <= 18) {
            wigetParent.classList.add('weather-widget--morning');
            wigetIcon.src = 'img/icon-morning.png';

        }
        if (hours >= 19 && hours <= 22) {
            wigetParent.classList.add('weather-widget--sunset');
            wigetIcon.src = 'img/icon-sunset.png';

        }
        if (hours >= 23 || hours <= 6) {
            wigetParent.classList.add('weather-widget--night');
            descriptionEl.classList.add('weather-widget__description--night')
            wigetIcon.src = 'img/icon-night.png';

        }
    }
};

const success = (pos) => {
    const crd = pos.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&units=metric&appid=1cd8359be73c9ae2115d2cf2f813cc25`)
        .then(response => response.json())
        .then(json => changeData(json.weather.main, json.main.temp, json.name));
};

const error = (error) => {
    console.log(error);
};

navigator.geolocation.getCurrentPosition(success, error);

