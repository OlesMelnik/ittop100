import axios from 'axios'
import { apiKey } from '../credentials'
import { ConvertFCProps } from '../types'

const apiUrl = 'https://api.apilayer.com/exchangerates_data'

export const getLatestCurrency = async (onSuccess: any, onError: any, setLoading: any) => {
	try {
		const url = `${apiUrl}/latest?symbols=USD,EUR,UAH&base=UAH`
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

export const convert = async ({ amount, from, to, setNewValue }: ConvertFCProps) => {
	try {
		const url = `${apiUrl}/convert?to=${to}&from=${from}&amount=${amount}`
		const response = await axios.get(url, {
			headers: { apiKey: apiKey },
		})
		setNewValue(response.data.result.toFixed(2))
	} catch (error) {
		alert('something is not working')
	}
}
