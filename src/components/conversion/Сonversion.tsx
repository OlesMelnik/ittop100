import React, { useEffect, useState, useMemo } from 'react'
import { apiKey } from '../../credentials'
import debounce from 'lodash.debounce'
import axios from 'axios'
import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

interface ConvertFCProps {
	isReverse: boolean
	amount: number
	from: string
	to: string
	setFirstCurrencyValue: any
	setSecondCurrencyValue: any
}

const convert = async ({
	isReverse,
	amount,
	from,
	to,
	setFirstCurrencyValue,
	setSecondCurrencyValue,
}: ConvertFCProps) => {
	console.log('convert')
	const url = `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`
	const response = await axios.get(url, {
		headers: { apiKey: apiKey },
	})
	if (isReverse) setFirstCurrencyValue(response.data.result.toFixed(2))
	else setSecondCurrencyValue(response.data.result.toFixed(2))
}

export const Conversion: React.FC<any> = ({ currency }) => {
	const keys = Object.keys(currency)
	const [firstSelectedCurrency, setFirstSelectedCurrency] = useState<string>(keys[0])
	const [secondSelectedCurrency, setSecondSelectedCurrency] = useState<string>(keys[0])
	const [firstCurrencyValue, setFirstCurrencyValue] = useState<number>(1)
	const [secondCurrencyValue, setSecondCurrencyValue] = useState<number>(1)

	const onFisrtValueChange = (event: any) => {
		setFirstCurrencyValue(event.target.value)
		debouncedChangeHandler({
			isReverse: false,
			amount: event.target.value,
			from: firstSelectedCurrency,
			to: secondSelectedCurrency,
			setFirstCurrencyValue,
			setSecondCurrencyValue,
		})
	}

	const onSecondValueChange = (event: any) => {
		setSecondCurrencyValue(event.target.value)
		debouncedChangeHandler({
			isReverse: true,
			amount: event.target.value,
			from: secondSelectedCurrency,
			to: firstSelectedCurrency,
			setFirstCurrencyValue,
			setSecondCurrencyValue,
		})
	}

	const onFirstCurrencyChange = (event: any) => {
		setFirstSelectedCurrency(event.target.value)
		debouncedChangeHandler({
			isReverse: false,
			amount: firstCurrencyValue,
			from: event.target.value,
			to: secondSelectedCurrency,
			setFirstCurrencyValue,
			setSecondCurrencyValue,
		})
	}

	const onSecondCurrencyChange = (event: any) => {
		setSecondSelectedCurrency(event.target.value)
		debouncedChangeHandler({
			isReverse: false,
			amount: firstCurrencyValue,
			from: firstSelectedCurrency,
			to: event.target.value,
			setFirstCurrencyValue,
			setSecondCurrencyValue,
		})
	}

	const debouncedChangeHandler = useMemo(() => debounce(convert, 1000), [])

	useEffect(() => {}, [])
	return (
		<Stack sx={{ margin: '20px auto', width: 'fit-content' }} direction="row" spacing={5}>
			<Stack direction="column" spacing={5}>
				<FormControl fullWidth>
					<Select value={firstSelectedCurrency} onChange={onFirstCurrencyChange}>
						{keys.map((item) => (
							<MenuItem key={item} value={item}>
								{item}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					label="Amount"
					variant="outlined"
					type="number"
					inputProps={{ min: 1 }}
					value={firstCurrencyValue}
					onChange={onFisrtValueChange}
				/>
			</Stack>
			<Stack direction="column" spacing={5}>
				<FormControl fullWidth>
					<Select value={secondSelectedCurrency} onChange={onSecondCurrencyChange}>
						{keys.map((item) => (
							<MenuItem key={item} value={item}>
								{item}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					label="Amount"
					variant="outlined"
					type="number"
					inputProps={{ min: 1 }}
					value={secondCurrencyValue}
					onChange={onSecondValueChange}
				/>
			</Stack>
		</Stack>
	)
}
