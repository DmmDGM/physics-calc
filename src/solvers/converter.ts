// Imports
import * as cli from "../cli.js";
import * as convertAngle from "../helpers/convertAngle.js";
import * as convertLength from "../helpers/convertLength.js";
import * as convertMass from "../helpers/convertMass.js";
import * as convertTemperature from "../helpers/convertTemperature.js";
import * as convertTime from "../helpers/convertTime.js";
import formatNumber from "../helpers/formatNumber.js";

// Creates solver
export async function execute(values: {
	from?: string,
	to?: string,
	initial?: number
} = {}): Promise<number> {
	// Defines conversion from unit
	const from = values.from ?? await cli.promptString("[Prompt] Conversion From Unit: ");
	if(from === null) throw new Error("[Error] Invalid conversion from unit");
	cli.print(`[Given] Conversion From Unit = ${from}`);
	
	// Defines conversion to unit
	const to = values.to ?? await cli.promptString("[Prompt] Conversion To Unit: ");
	if(to === null) throw new Error("[Error] Invalid conversion to unit");
	cli.print(`[Given] Conversion To Unit = ${to}`);

	// Defines initial value
	const initial = values.initial ?? await cli.promptNumber("[Prompt] Initial Value (Default = 1): ") ?? 1;
	cli.print(`[Given] Initial Value = ${await formatNumber({ value: initial })}`);

	// Converts unit
	cli.print("--- [Converter (Start)] ---", "separator");
	let final: number;
	if(from in convertAngle.units && to in convertAngle.units) final = await convertAngle.execute({
		from: from as convertAngle.ParsedUnit,
		to: to as convertAngle.ParsedUnit,
		initial: initial
	});
	else if(from in convertLength.units && to in convertLength.units) final = await convertLength.execute({
		from: from as convertLength.ParsedUnit,
		to: to as convertLength.ParsedUnit,
		initial: initial
	});
	else if(from in convertMass.units && to in convertMass.units) final = await convertMass.execute({
		from: from as convertMass.ParsedUnit,
		to: to as convertMass.ParsedUnit,
		initial: initial
	});
	else if(from in convertTemperature.units && to in convertTemperature.units) final = await convertTemperature.execute({
		from: from as convertTemperature.ParsedUnit,
		to: to as convertTemperature.ParsedUnit,
		initial: initial
	});
	else if(from in convertTime.units && to in convertTime.units) final = await convertTime.execute({
		from: from as convertTime.ParsedUnit,
		to: to as convertTime.ParsedUnit,
		initial: initial
	});
	else throw new Error("[Error] Invalid conversion units");
	cli.print("--- [Converter (End)] ---", "separator");

	// Prints converted unit
	cli.print(`[Answer] Final Value = ${await formatNumber({ value: final })}`);

	// Returns converted unit
	return final;
}

// Exports
export default execute;
