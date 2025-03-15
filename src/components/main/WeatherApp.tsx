import axios from 'axios'
import { useState } from 'react'
import FiveDays from './FiveDays'
import Today from './Today'

const API_KEY = 'token'

const WeatherApp = () => {
	const [city, setCity] = useState<string>('')
	const [todayWeather, setTodayWeather] = useState<any>(null)
	const [forecastWeather, setForecastWeather] = useState<any>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	const getWeather = async () => {
		if (!city.trim()) {
			setError('Введите название города!')
			return
		}

		setLoading(true)
		setError('')
		setTodayWeather(null)
		setForecastWeather(null)

		try {
			let data = await axios.get(
				`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}&lang=ru`
			)

			if (data.data.length === 0) {
				setError('Город не найден!')
				setLoading(false)
				return
			}

			setForecastWeather(data.data.list)

			data = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=ru`
			)

			if (data.data.length === 0) {
				setError('Город не найден!')
				setLoading(false)
				return
			}

			setTodayWeather(data.data)

			console.log(123)
		} catch (err) {
			console.log(err)
			setError('Ошибка при получении данных!')
		}

		setLoading(false)
	}

	return (
		<>
			<article className='search'>
				<input
					type='text'
					value={city}
					onChange={e => setCity(e.target.value)}
					placeholder='Введите город'
				/>
				<button id='search' onClick={getWeather}>
					Найти
				</button>
			</article>
			{loading && (
				<article className='loading'>
					<p>Загрузка...</p>
				</article>
			)}
			{error && (
				<article className='error'>
					<h1>Ошибка</h1>
					<p>{error}</p>
				</article>
			)}
			{todayWeather && forecastWeather && (
				<article className='weather'>
					<Today data={todayWeather} />
					<FiveDays data={forecastWeather} />
				</article>
			)}
		</>
	)
}

export default WeatherApp
