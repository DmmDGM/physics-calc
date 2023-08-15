// Creates helper
export async function execute(values: {
	value: string;
}): Promise<string> {

	// Checks for empty string
	if(!values.value.length) throw new Error("[Error]: Empty string");

	// Stringifies number
	const string = values.value[0].toUpperCase() + values.value.slice(1).toLowerCase();

	// Returns formatted string
	return string;
}

// Exports
export default execute;
