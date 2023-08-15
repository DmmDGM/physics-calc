// Imports
import formatNumber from "./formatNumber.js";
import * as cli from "../cli.js";

// Defines types
export type RawUnit = keyof typeof units;
export type ParsedUnit = typeof units[RawUnit];

// Creates unit table
export const units = {
	// Celsius
	"celsius": "celsius",
	"°celsius": "celsius",
	"c": "celsius",
	"°c": "celsius",

	// Fahrenheit
	"fahrenheit": "fahrenheit",
	"°fahrenheit": "fahrenheit",
	"f": "fahrenheit",
	"°f": "fahrenheit",

	// Kelvin
	"kelvin": "kelvin",
	"k": "kelvin"
} as const;

// Creates converters
export const converter = {
	from: {
		"celsius": (initial: number) => {
			const standard = initial + 273.15;
			cli.print("[Formula] Kelvin = Celsius + 273.15", "hidden");
			cli.print(`[Evaluate] Kelvin = ${standard}`, "hidden");
			return standard;
		},
		"fahrenheit": (initial: number) => {
			const standard = (initial - 32) * 5 / 9 + 273.15;
			cli.print("[Formula] Kelvin = (Fahrenheit - 32) * 5 / 9 + 273.15", "hidden");
			cli.print(`[Evaluate] Kelvin = ${standard}`, "hidden");
			return standard;
		},
		"kelvin": (initial: number) => {
			const standard = initial;
			return standard;
		},
	},
	to: {
		"celsius": (standard: number) => {
			const final = standard - 273.15;
			cli.print("[Formula] Celsius = Kelvin - 273.15", "hidden");
			cli.print(`[Evaluate] Celsius = ${final}`, "hidden");
			return final;
		},
		"fahrenheit": (standard: number) => {
			const final = (standard - 273.15) * 9 / 5 + 32;
			cli.print("[Formula] Fahrenheit = (Kelvin - 273.15) * 9 / 5 + 32", "hidden");
			cli.print(`[Evaluate] Fahrenheit = ${final}`, "hidden");
			return final;
		},
		"kelvin": (standard: number) => {
			const final = standard;
			return final;
		}
	}
};

// Creates helper
export async function execute(values: {
	from: RawUnit;
	to: RawUnit;
	initial: number;
}): Promise<number> {
	// Converts conversion from unit to international standard unit
	const from = units[values.from];
	cli.print(`[Given] Conversion From Unit = ${from}`);
	const initial = values.initial;
	cli.print(`[Given] Initial Value = ${await formatNumber({ value: initial })}`);
	const standard = converter.from[from](initial);

	// Converts international standard unit to conversion to unit
	const to = units[values.to];
	cli.print(`[Given] Conversion To Unit = ${to}`);
	const final = converter.to[to](standard);
	cli.print(`[Answer] Final Value = ${await formatNumber({ value: final })}`);

	// Returns converted unit
	return final;
}

// Exports
export default execute;
