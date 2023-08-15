// Imports
import formatNumber from "./formatNumber.js";
import * as cli from "../cli.js";

// Defines types
export type RawUnit = keyof typeof units;
export type ParsedUnit = typeof units[RawUnit];

// Creates unit table
export const units = {
	// Millimeter
	"millimeter": "millimeter",
	"millimeters": "millimeter",
	"mm": "millimeter",
	
	// Centimeter
	"centimeter": "centimeter",
	"centimeters": "centimeter",
	"cm": "centimeter",

	// Decimeter
	"decimeter": "decimeter",
	"decimeters": "decimeter",
	"dm": "decimeter",

	// Meter
	"meter": "meter",
	"meters": "meter",
	"m": "meter",

	// Decameter
	"decameter": "decameter",
	"decameters": "decameter",
	"dekameter": "decameter",
	"dekameters": "decameter",
	"dam": "decameter",

	// Hectometer
	"hectometer": "hectometer",
	"hectometers": "hectometer",
	"hm": "hectometer",

	// Kilometer
	"kilometer": "kilometer",
	"kilometers": "kilometer",
	"km": "kilometer",

	// Inch
	"inch": "inch",
	"inches": "inch",
	"in": "inch",

	// Foot
	"foot": "foot",
	"feet": "foot",
	"ft": "foot",

	// Yard
	"yard": "yard",
	"yards": "yard",
	"yd": "yard",

	// Mile
	"mile": "mile",
	"miles": "mile",
	"mi": "mile"
} as const;

// Creates converters
export const converter = {
	from: {
		"millimeter": (initial: number) => {
			const standard = initial / 1_000;
			cli.print("[Formula] Meter = Millimeter / 1000", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			return standard;
		},
		"centimeter": (initial: number) => {
			const standard = initial / 100;
			cli.print("[Formula] Meter = Centimeter / 100", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			return standard;
		},
		"decimeter": (initial: number) => {
			const standard = initial / 10;
			cli.print("[Formula] Meter = Decimeter / 10", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			return standard;
		},
		"meter": (initial: number) => {
			const standard = initial;
			return standard;
		},
		"decameter": (initial: number) => {
			const standard = initial * 10;
			cli.print("[Formula] Meter = Decameter * 10", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			return standard;
		},
		"hectometer": (initial: number) => {
			const standard = initial * 100;
			cli.print("[Formula] Meter = Hectometer * 100", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			return standard;
		},
		"kilometer": (initial: number) => {
			const standard = initial * 1_000;
			cli.print("[Formula] Meter = Kilometer * 1000", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			return standard;
		},
		"inch": (initial: number) => {
			const standard = initial / 39.37;
			cli.print("[Formula] Meter = Inch / 39.37", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			return standard;
		},
		"foot": (initial: number) => {
			const standard = initial / 3.281;
			cli.print("[Formula] Meter = Foot / 3.281", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			return standard;
		},
		"yard": (initial: number) => {
			const standard = initial / 1.094;
			cli.print("[Formula] Meter = Yard / 1.094", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			return standard;
		},
		"mile": (initial: number) => {
			const standard = initial * 1_609;
			cli.print("[Formula] Meter = Mile * 1609", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			return standard;
		}
	},
	to: {
		"millimeter": (standard: number) => {
			const final = standard * 1_000;
			cli.print("[Formula] Millimeter = Meter * 1000", "hidden");
			cli.print(`[Evaluate] Meter = ${final}`, "hidden");
			return final;
		},
		"centimeter": (standard: number) => {
			const final = standard * 100;
			cli.print("[Formula] Centimeter = Meter * 100", "hidden");
			cli.print(`[Evaluate] Centimeter = ${final}`, "hidden");
			return final;
		},
		"decimeter": (standard: number) => {
			const final = standard * 10;
			cli.print("[Formula] Decimeter = Meter * 10", "hidden");
			cli.print(`[Evaluate] Decimeter = ${final}`, "hidden");
			return final;
		},
		"meter": (standard: number) => {
			const final = standard;
			return final;
		},
		"decameter": (standard: number) => {
			const final = standard / 10;
			cli.print("[Formula] Decameter = Meter / 10", "hidden");
			cli.print(`[Evaluate] Decameter = ${final}`, "hidden");
			return final;
		},
		"hectometer": (standard: number) => {
			const final = standard / 100;
			cli.print("[Formula] Hectometer = Meter / 100", "hidden");
			cli.print(`[Evaluate] Hectometer = ${final}`, "hidden");
			return final;
		},
		"kilometer": (standard: number) => {
			const final = standard / 1_000;
			cli.print("[Formula] Kilometer = Meter / 1000", "hidden");
			cli.print(`[Evaluate] Kilometer = ${final}`, "hidden");
			return final;
		},
		"inch": (standard: number) => {
			const final = standard * 39.37;
			cli.print("[Formula] Inch = Meter * 39.37", "hidden");
			cli.print(`[Evaluate] Inch = ${final}`, "hidden");
			return final;
		},
		"foot": (standard: number) => {
			const final = standard * 3.281;
			cli.print("[Formula] Meter = Meter * 3.281", "hidden");
			cli.print(`[Evaluate] Meter = ${final}`, "hidden");
			return final;
		},
		"yard": (standard: number) => {
			const final = standard * 1.094;
			cli.print("[Formula] Yard = Meter * 1.094", "hidden");
			cli.print(`[Evaluate] Yard = ${final}`, "hidden");
			return final;
		},
		"mile": (standard: number) => {
			const final = standard / 1_609;
			cli.print("[Formula] Mile = Meter / 1609", "hidden");
			cli.print(`[Evaluate] Mile = ${final}`, "hidden");
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
