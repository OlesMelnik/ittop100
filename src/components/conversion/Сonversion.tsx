import React, { useEffect, useState, useMemo } from 'react'
import debounce from 'lodash.debounce'
import { convert } from '../../api'
import { SelectTextField } from '../SelectTextField'
import Stack from '@mui/material/Stack'

export const Conversion: React.FC<any> = ({ currency }) => {
	const keys = Object.keys(currency)
	const [inputs, setInputs] = useState<any>({
		firstSelectedCurrency: keys[0],
		secondSelectedCurrency: keys[0],
		firstCurrencyValue: 1,
		secondCurrencyValue: 1,
	})

	const handleChange = (event: any) => {
		const name = event.target.name
		const value = event.target.value
		const reverseConvert = name === 'secondCurrencyValue'

		setInputs((prevState: any) => {
			return { ...prevState, [name]: value }
		})

		const newInputs = { ...inputs, [name]: value }

		debouncedChangeHandler({
			amount: reverseConvert ? newInputs.secondCurrencyValue : newInputs.firstCurrencyValue,
			from: reverseConvert ? newInputs.secondSelectedCurrency : newInputs.firstSelectedCurrency,
			to: reverseConvert ? newInputs.firstSelectedCurrency : newInputs.secondSelectedCurrency,
			setNewValue: (value: number) => {
				setInputs((prev: any) => {
					return {
						...newInputs,
						...(reverseConvert ? { firstCurrencyValue: value } : { secondCurrencyValue: value }),
					}
				})
			},
		})
	}

	const debouncedChangeHandler = useMemo(() => debounce(convert, 1000), [])

	useEffect(() => {}, [])
	return (
		<Stack sx={{ margin: '20px auto', width: 'fit-content' }} direction="row" spacing={5}>
			<SelectTextField
				items={keys}
				selectName="firstSelectedCurrency"
				selectValue={inputs.firstSelectedCurrency}
				inputName="firstCurrencyValue"
				inputValue={inputs.firstCurrencyValue}
				handleChange={handleChange}
			/>
			<SelectTextField
				items={keys}
				selectName="secondSelectedCurrency"
				selectValue={inputs.secondSelectedCurrency}
				inputName="secondCurrencyValue"
				inputValue={inputs.secondCurrencyValue}
				handleChange={handleChange}
			/>
		</Stack>
	)
}
