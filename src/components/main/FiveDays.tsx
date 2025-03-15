const timeINtext: Record<string, string> = {
	'03:00:00': 'Ночь',
	'09:00:00': 'Утро',
	'15:00:00': 'День',
	'21:00:00': 'Вечер',
}

interface forecastWeatherProps {
	data: {
		main: {
			temp: number
			humidity: number
		}
		weather: { icon: string; description: string }[]
		dt_txt: string
	}[]
}

const FiveDays: React.FC<forecastWeatherProps> = ({ data }) => {
	const allowedTimes = new Set(['03:00:00', '09:00:00', '15:00:00', '21:00:00'])
	const result: Record<
		string,
		{
			time: string
			icon: string
			description: string
			temp: number
			humidity: number
		}[]
	> = {}

	data.forEach(item => {
		const [date, time] = item.dt_txt.split(' ')

		if (allowedTimes.has(time)) {
			if (!result[date]) {
				result[date] = []
			}
			result[date].push({
				time: timeINtext[time],
				icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
				description: item.weather[0].description,
				temp: Math.round(item.main.temp),
				humidity: item.main.humidity,
			})
		}
	})

	return (
		<section className='five-days'>
			{Object.entries(result).map(([date, times]) => (
				<div className='day-container'>
					<table>
						<tr>
							<th>{date}</th>
						</tr>
						{times.map((t, index) => (
							<tr>
								<td>{t.time}</td>
								<td>
									<img src={t.icon} alt={t.description} /> {t.temp} °C
								</td>
								<td>{t.humidity}%</td>
							</tr>
						))}
					</table>
				</div>
			))}
		</section>
	)
}

export default FiveDays
