import React from 'react'
import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { SelectTextFieldProps } from '../../types'

export const SelectTextField: React.FC<SelectTextFieldProps> = ({
	items,
	selectName,
	selectValue,
	inputName,
	inputValue,
	handleChange,
}) => {
	return (
		<Stack direction="column" spacing={5}>
			<FormControl fullWidth>
				<Select name={selectName} value={selectValue} onChange={handleChange}>
					{items.map((item: string) => (
						<MenuItem key={item} value={item}>
							{item}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<TextField
				name={inputName}
				label="Amount"
				variant="outlined"
				type="number"
				inputProps={{ min: 1 }}
				value={inputValue}
				onChange={handleChange}
			/>
		</Stack>
	)
}
