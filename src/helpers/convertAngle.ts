// Imports
import formatNumber from "./formatNumber.js";
import * as cli from "../cli.js";

// Defines types
export type RawUnit = keyof typeof units;
export type ParsedUnit = typeof units[RawUnit];

// Creates unit table
export const units = {
	// Degree
	"degree": "degree",
	"degrees": "degree",
	"deg": "degree",

	// Radian
	"radian": "radian",
	"radians": "radian",
	"rad": "radian"
} as const;

// Creates converters
export const converter = {
	from: {
		"degree": (initial: number) => {
			const standard = initial * Math.PI / 180;
			cli.print("[Formula] Radian = Degree * Pi / 180", "hidden");
			cli.print(`[Evaluate] Radian = ${standard}`, "hidden");
			return standard;
		},
		"radian": (initial: number) => {
			const standard = initial;
			return standard;
		}
	},
	to: {
		"degree": (standard: number) => {
			const final = standard * 180 / Math.PI;
			cli.print("[Formula] Degree = Radian * 180 / Pi", "hidden");
			cli.print(`[Evaluate] Degree = ${final}`, "hidden");
			return final;
		},
		"radian": (standard: number) => {
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
