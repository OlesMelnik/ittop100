import React, { useEffect, useState } from 'react'
import { apiKey } from './credentials'
import { LinearProgress } from '@mui/material'
import { Conversion, Header } from './components'
import axios from 'axios'
import './App.css'

const getLatestCurrency = async (onSuccess: any, onError: any, setLoading: any) => {
	try {
		const url = 'https://api.apilayer.com/exchangerates_data/latest?symbols=USD,EUR,UAH&base=UAH'
		const result = await axios.get(url, {
			headers: { apiKey: apiKey },
		})
		onSuccess(result.data.rates)
	} catch {
		onError(true)
	} finally {
		setLoading(false)
	}
}

function App() {
	const [currency, setCurrency] = useState<any>(null)
	const [loading, setLoading] = useState<any>(true)
	const [error, setError] = useState<boolean>(false)

	useEffect(() => {
		getLatestCurrency(setCurrency, setError, setLoading)
	}, [])

	if (loading)
		return (
			<div className="progress-wrapper">
				<LinearProgress />
			</div>
		)

	if (error) return <div>there was some error</div>

	return (
		<div className="App">
			<Header currency={currency} />
			{currency && <Conversion currency={currency} />}
		</div>
	)
}

export default App
