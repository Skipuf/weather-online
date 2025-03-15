const formatUnixDate = (unixTime: number): string => {
	const date = new Date(unixTime * 1000) // Преобразуем секунды в миллисекунды
	return date.toLocaleDateString('ru-RU') // Получаем только дату
}

interface todayWeatherProps {
	data: {
		coord: {
			lon: number
			lat: number
		}
		weather: {
			id: number
			main: string
			description: string
			icon: string
		}[]
		base: string
		main: {
			temp: number
			feels_like: number
			temp_min: number
			temp_max: number
			pressure: number
			humidity: number
			sea_level?: number
			grnd_level?: number
		}
		visibility: number
		wind: {
			speed: number
			deg: number
			gust?: number
		}
		rain?: {
			'1h': number
		}
		clouds: {
			all: number
		}
		dt: number
		sys: {
			type?: number
			id?: number
			country: string
			sunrise: number
			sunset: number
		}
		timezone: number
		id: number
		name: string
		cod: number
	}
}

const Today: React.FC<todayWeatherProps> = ({ data }) => {
	console.log(data)
	const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`

	return (
		<section className='weather-today'>
			<h1>{data.name}</h1>
			<h2>{formatUnixDate(data.dt)}</h2>
			<div className='weather-today-info'>
				<p>
					{Math.round(data.main.temp)} °C
					<img src={icon} alt={data.weather[0].description} />
					{data.weather[0].description}
				</p>
				<div className='weather-today-info__item'>
					<span className='weather-today-info__label'>По ощущению</span>
					<span className='weather-today-info__line'></span>
					<span className='weather-today-info__value'>
						{Math.round(data.main.feels_like)} °C
					</span>
				</div>
				<div className='weather-today-info__item'>
					<span className='weather-today-info__label'>Ветер</span>
					<span className='weather-today-info__line'></span>
					<span className='weather-today-info__value'>
						{data.wind.speed} м/c
					</span>
				</div>
				<div className='weather-today-info__item'>
					<span className='weather-today-info__label'>Давление</span>
					<span className='weather-today-info__line'></span>
					<span className='weather-today-info__value'>
						{Math.round(data.main.pressure * 0.75006)} мм рт. ст.
					</span>
				</div>
				<div className='weather-today-info__item'>
					<span className='weather-today-info__label'>Влажность</span>
					<span className='weather-today-info__line'></span>
					<span className='weather-today-info__value'>
						{Math.round(data.main.humidity)}%
					</span>
				</div>
			</div>
		</section>
	)
}

export default Today
