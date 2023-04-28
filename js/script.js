const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=5008c4b5045480e346604e87428c173d'
const API_UNITS = '&units=metric'

const getWeather = () => {
	const city = input.value
	const URL = API_LINK + city + API_KEY + API_UNITS

	axios
		.get(URL)
		.then(res => {
			// console.log(res.data) /* <---------- whole object   */
			const temp = res.data.main.temp
			const hum = res.data.main.humidity
			let img
			const weatherId = res.data.weather[0].id

			// console.log(...res.data.weather);
			// console.log(res.data.weather[0].main);                         <------- FIRST WAY
			const weatherStatus = Object.assign({}, ...res.data.weather) /* <------- SECOND WAY */

			weather.textContent = weatherStatus.main
			temperature.textContent = Math.floor(temp) + '°C'
			humidity.textContent = hum + '%'
			cityName.textContent = res.data.name

			warning.innerText = ''
			input.value = ''

			if (weatherId <= 232) {
				img = 'img/thunderstorm.png'
			} else if (weatherId >= 300 && weatherId <= 400) {
				img = 'img/drizzle.png'
			} else if (weatherId >= 500 && weatherId <= 599) {
				img = 'img/rain.png'
			} else if (weatherId >= 600 && weatherId <= 699) {
				img = 'img/ice.png'
			} else if (weatherId >= 701 && weatherId <= 799) {
				img = 'img/fog.png'
			} else if (weatherId === 800) {
				img = 'img/sun.png'
			} else if (weatherId >= 801 && weatherId > 799) {
				img = 'img/cloud.png'
			} else {
				img = 'img/unkown.png'
			}

			photo.setAttribute('src', img)
		})
		.catch(() => (warning.innerText = 'Enter the correct name of the city'))
}

const enterCheck = (e) => {
	if (e.key === 'Enter') {
		getWeather()
	}
}

input.addEventListener('keyup', enterCheck)
button.addEventListener('click', getWeather)
