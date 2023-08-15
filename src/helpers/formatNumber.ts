// Creates helper
export async function execute(values: { value: string | number }): Promise<string> {
	// Parses number
	const number = typeof values.value === "string" ? parseFloat(values.value) : values.value;
	if (Number.isNaN(number)) throw new Error("[Error]: Invalid number");

	// Stringifies number
	const string = number.toLocaleString("fullwide", { maximumSignificantDigits: 20 });

	// Returns formatted string
	return string;
}

// Exports
export default execute;
