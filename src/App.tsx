import React, { useEffect, useState } from 'react'
import { getLatestCurrency } from './api'
import { LinearProgress } from '@mui/material'
import { Conversion, Header } from './components'
import './App.css'

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
