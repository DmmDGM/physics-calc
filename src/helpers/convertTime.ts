// Imports
import formatNumber from "./formatNumber.js";
import * as cli from "../cli.js";

// Types
export type RawUnit = keyof typeof units;
export type ParsedUnit = typeof units[RawUnit];

// Creates unit table
export const units = {
	// Millisecond
	"millisecond": "millisecond",
	"milliseconds": "millisecond",
	"msec": "millisecond",
	
	// Second
	"second": "second",
	"seconds": "second",
	"sec": "second",

	// Minute
	"minute": "minute",
	"minutes": "minute",
	"min": "minute",

	// Hour
	"hour": "hour",
	"hours": "hour",
	"hr": "hour",

	// Day
	"day": "day",
	"days": "day",
	"dy": "day",

	// Week
	"week": "week",
	"weeks": "week",
	"wk": "week",

	// Month
	"month": "month",
	"months": "month",
	"mon": "month",
	
	// Year
	"year": "year",
	"years": "year",
	"yr": "year"
} as const;

// Creates converters
export const converter = {
	from: {
		"millisecond": (initial: number) => {
			const standard = initial / 1000;
			cli.print("[Formula] Second = Millisecond / 1000", "hidden");
			cli.print(`[Evaluate] Second = ${standard}`, "hidden");
			return standard;
		},
		"second": (initial: number) => {
			const standard = initial;
			return standard;
		},
		"minute": (initial: number) => {
			const standard = initial * 60;
			cli.print("[Formula] Second = Minute * 60", "hidden");
			cli.print(`[Evaluate] Second = ${standard}`, "hidden");
			return standard;
		},
		"hour": (initial: number) => {
			const standard = initial * 3_600;
			cli.print("[Formula] Second = Hour * 3600", "hidden");
			cli.print(`[Evaluate] Second = ${standard}`, "hidden");
			return standard;
		},
		"day": (initial: number) => {
			const standard = initial * 86_400;
			cli.print("[Formula] Second = Day * 86400", "hidden");
			cli.print(`[Evaluate] Second = ${standard}`, "hidden");
			return standard;
		},
		"week": (initial: number) => {
			const standard = initial * 604_800;
			cli.print("[Formula] Second = Week * 604800", "hidden");
			cli.print(`[Evaluate] Second = ${standard}`, "hidden");
			return standard;
		},
		"month": (initial: number) => {
			const standard = initial * 2_419_200;
			cli.print("[Assume] Month = Day * 28", "hidden");
			cli.print("[Formula] Second = Week * 2419200", "hidden");
			cli.print(`[Evaluate] Second = ${standard}`, "hidden");
			return standard;
		},
		"year": (initial: number) => {
			const standard = initial * 31_536_000;
			cli.print("[Assume] Year = Day * 365", "hidden");
			cli.print("[Formula] Second = Year * 31536000", "hidden");
			cli.print(`[Evaluate] Second = ${standard}`, "hidden");
			return standard;
		}
	},
	to: {
		"millisecond": (standard: number) => {
			const final = standard * 1000;
			cli.print("[Formula] Millisecond = Second * 1000", "hidden");
			cli.print(`[Evaluate] Millisecond = ${final}`, "hidden");
			return final;
		},
		"second": (standard: number) => {
			const final = standard;
			return final;
		},
		"minute": (standard: number) => {
			const final = standard / 60;
			cli.print("[Formula] Minute = Second / 60", "hidden");
			cli.print(`[Evaluate] Minute = ${final}`, "hidden");
			return final;
		},
		"hour": (standard: number) => {
			const final = standard / 3_600;
			cli.print("[Formula] Hour = Second / 3600", "hidden");
			cli.print(`[Evaluate] Hour = ${final}`, "hidden");
			return final;
		},
		"day": (standard: number) => {
			const final = standard / 86_400;
			cli.print("[Formula] Day = Second / 86400", "hidden");
			cli.print(`[Evaluate] Day = ${final}`, "hidden");
			return final;
		},
		"week": (standard: number) => {
			const final = standard / 86_400;
			cli.print("[Formula] Day = Second / 86400", "hidden");
			cli.print(`[Evaluate] Day = ${final}`, "hidden");
			return final;
		},
		"month": (standard: number) => {
			const final = standard / 2_419_200;
			cli.print("[Assume] Month = Day * 28", "hidden");
			cli.print("[Formula] Month = Second / 2419200", "hidden");
			cli.print(`[Evaluate] Month = ${final}`, "hidden");
			return final;
		},
		"year": (standard: number) => {
			const final = standard / 31_536_000;
			cli.print("[Assume] Year = Day * 365", "hidden");
			cli.print("[Formula] Year = Second / 31536000", "hidden");
			cli.print(`[Evaluate] Year = ${final}`, "hidden");
			return final;
		}
	}
};

// Creates helper
export async function helper(values: {
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
	cli.print(`[Answer] Initial Value = ${await formatNumber({ value: final })}`);

	// Returns converted unit
	return final;
}

// Exports
export default helper;
