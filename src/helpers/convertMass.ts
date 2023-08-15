// Imports
import formatNumber from "./formatNumber.js";
import * as cli from "../cli.js";

// Types
export type RawUnit = keyof typeof units;
export type ParsedUnit = (typeof units)[RawUnit];

// Creates unit table
export const units = {
	// Milligram
	milligram: "milligram",
	milligrams: "milligram",
	mg: "milligram",

	// Centigram
	centigram: "centigram",
	centigrams: "centigram",
	cg: "centigram",

	// Decigram
	decigram: "decigram",
	decigrams: "decigram",
	dg: "decigram",

	// Gram
	gram: "gram",
	grams: "gram",
	g: "gram",

	// Decagram
	decagram: "decagram",
	decagrams: "decagram",
	dekagram: "decagram",
	dekagrams: "decagram",
	dag: "decagram",

	// Hectogram
	hectogram: "hectogram",
	hectograms: "hectogram",
	hg: "hectogram",

	// Kilogram
	kilogram: "kilogram",
	kilograms: "kilogram",
	kg: "kilogram",

	// Tonne
	tonne: "tonne",
	tonnes: "tonne",
	t: "tonne",

	// Kilotonne
	kilotonne: "kilotonne",
	kilotonnes: "kilotonne",
	kt: "kilotonne",

	// Megatonne
	megatonne: "megatonne",
	megatonnes: "megatonne",
	mt: "megatonne",

	// Gigatonne
	gigatonne: "gigatonne",
	gigatonnes: "gigatonne",
	gt: "gigatonne"
} as const;

// Creates converters
export const converter = {
	from: {
		milligram: (initial: number) => {
			const standard = initial / 1_000_000;
			cli.print("[Formula] Kilogram = Milligram / 1000000", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			return standard;
		},
		centigram: (initial: number) => {
			const standard = initial / 100_000;
			cli.print("[Formula] Kilogram = Centigram / 100000", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			return standard;
		},
		decigram: (initial: number) => {
			const standard = initial / 10_000;
			cli.print("[Formula] Kilogram = Decigram / 10000", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			return standard;
		},
		gram: (initial: number) => {
			const standard = initial / 1_000;
			cli.print("[Formula] Kilogram = Gram / 1000", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			return standard;
		},
		decagram: (initial: number) => {
			const standard = initial / 100;
			cli.print("[Formula] Kilogram = Decagram / 100", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			return standard;
		},
		hectogram: (initial: number) => {
			const standard = initial / 10;
			cli.print("[Formula] Kilogram = Hectogram / 10", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			return standard;
		},
		kilogram: (initial: number) => {
			const standard = initial;
			return standard;
		},
		tonne: (initial: number) => {
			const standard = initial * 1_000;
			cli.print("[Formula] Kilogram = Tonne * 1000", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			return standard;
		},
		kilotonne: (initial: number) => {
			const standard = initial * 1_000_000;
			cli.print("[Formula] Kilogram = Kilotonne * 1000000", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			return standard;
		},
		megatonne: (initial: number) => {
			const standard = initial * 1_000_000_000;
			cli.print("[Formula] Kilogram = Megatonne * 1000000000", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			return standard;
		},
		gigatonne: (initial: number) => {
			const standard = initial * 1_000_000_000_000;
			cli.print("[Formula] Kilogram = Gigatonne * 1000000000000", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			return standard;
		}
	},
	to: {
		milligram: (standard: number) => {
			const final = standard * 1_000_000;
			cli.print("[Formula] Milligram = Kilogram * 1000000", "hidden");
			cli.print(`[Evaluate] Milligram = ${final}`, "hidden");
			return final;
		},
		centigram: (standard: number) => {
			const final = standard * 100_000;
			cli.print("[Formula] Centigram = Kilogram * 100000", "hidden");
			cli.print(`[Evaluate] Centigram = ${final}`, "hidden");
			return final;
		},
		decigram: (standard: number) => {
			const final = standard * 10_000;
			cli.print("[Formula] Decigram = Kilogram * 10000", "hidden");
			cli.print(`[Evaluate] Decigram = ${final}`, "hidden");
			return final;
		},
		gram: (standard: number) => {
			const final = standard * 1_000;
			cli.print("[Formula] Gram = Kilogram * 1000", "hidden");
			cli.print(`[Evaluate] Gram = ${final}`, "hidden");
			return final;
		},
		decagram: (standard: number) => {
			const final = standard * 100;
			cli.print("[Formula] Decagram = Kilogram * 100", "hidden");
			cli.print(`[Evaluate] Decagram = ${final}`, "hidden");
			return final;
		},
		hectogram: (standard: number) => {
			const final = standard * 10;
			cli.print("[Formula] Hectogram = Kilogram * 10", "hidden");
			cli.print(`[Evaluate] Hectogram = ${final}`, "hidden");
			return final;
		},
		kilogram: (standard: number) => {
			const final = standard;
			return final;
		},
		tonne: (standard: number) => {
			const final = standard / 1_000;
			cli.print("[Formula] Tonne = Kilogram / 1000", "hidden");
			cli.print(`[Evaluate] Tonne = ${final}`, "hidden");
			return final;
		},
		kilotonne: (standard: number) => {
			const final = standard / 1_000_000;
			cli.print("[Formula] Kilotonne = Kilogram / 1000000", "hidden");
			cli.print(`[Evaluate] Kilotonne = ${final}`, "hidden");
			return final;
		},
		megatonne: (standard: number) => {
			const final = standard / 1_000_000_000;
			cli.print("[Formula] Megatonne = Kilogram / 1000000000", "hidden");
			cli.print(`[Evaluate] Megatonne = ${final}`, "hidden");
			return final;
		},
		gigatonne: (standard: number) => {
			const final = standard / 1_000_000_000_000;
			cli.print("[Formula] Gigatonne = Kilogram / 1000000000000", "hidden");
			cli.print(`[Evaluate] Gigatonne = ${final}`, "hidden");
			return final;
		}
	}
};

// Creates helper
export async function execute(values: { from: RawUnit; to: RawUnit; initial: number }): Promise<number> {
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
