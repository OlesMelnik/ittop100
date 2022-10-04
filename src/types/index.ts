export interface ConvertFCProps {
	amount: number
	from: string
	to: string
	setNewValue: (value: number) => void
}

export interface SelectTextFieldProps {
	items: Array<string>
	selectName: string
	selectValue: string
	inputName: string
	inputValue: string | number
	handleChange: (event: any) => void
}
