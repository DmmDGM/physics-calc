// Imports
import * as cli from "../cli.js";

// Creates units
export const units = {
	// Angle
	"degree": "degree",
	"degrees": "degree",
	"deg": "degree",

	"radian": "radian",
	"radians": "radian",
	"rad": "radian",

	// Length
	"millimeter": "millimeter",
	"millimeters": "millimeter",
	"mm": "millimeter",
	
	"centimeter": "centimeter",
	"centimeters": "centimeter",
	"cm": "centimeter",

	"decimeter": "decimeter",
	"decimeters": "decimeter",
	"dm": "decimeter",

	"meter": "meter",
	"meters": "meter",
	"m": "meter",

	"decameter": "decameter",
	"decameters": "decameter",
	"dekameter": "decameter",
	"dekameters": "decameter",
	"dam": "decameter",

	"hectometer": "hectometer",
	"hectometers": "hectometer",
	"hm": "hectometer",

	"kilometer": "kilometer",
	"kilometers": "kilometer",
	"km": "kilometer",

	"inch": "inch",
	"inches": "inch",
	"in": "inch",

	"foot": "foot",
	"feet": "foot",
	"ft": "foot",

	"yard": "yard",
	"yards": "yard",
	"yd": "yard",

	"mile": "mile",
	"miles": "mile",
	"mi": "mile",

	// Mass
	"milligram": "milligram",
	"milligrams": "milligram",
	"mg": "milligram",
	
	"centigram": "centigram",
	"centigrams": "centigram",
	"cg": "centigram",

	"decigram": "decigram",
	"decigrams": "decigram",
	"dg": "decigram",

	"gram": "gram",
	"grams": "gram",
	"g": "gram",

	"decagram": "decagram",
	"decagrams": "decagram",
	"dekagram": "decagram",
	"dekagrams": "decagram",
	"dag": "decagram",

	"hectogram": "hectogram",
	"hectograms": "hectogram",
	"hg": "hectogram",

	"kilogram": "kilogram",
	"kilograms": "kilogram",
	"kg": "kilogram",

	"tonne": "tonne",
	"tonnes": "tonne",
	"t": "tonne",

	"kilotonne": "kilotonne",
	"kilotonnes": "kilotonne",
	"kt": "kilotonne",

	"megatonne": "megatonne",
	"megatonnes": "megatonne",
	"mt": "megatonne",

	"gigatonne": "gigatonne",
	"gigatonnes": "gigatonne",
	"gt": "gigatonne",

	// Temperature
	"celsius": "celsius",
	"°celsius": "celsius",
	"c": "celsius",
	"°c": "celsius",

	"fahrenheit": "fahrenheit",
	"°fahrenheit": "fahrenheit",
	"f": "fahrenheit",
	"°f": "fahrenheit",

	"kelvin": "kelvin",
	"k": "kelvin",

	// Time
	"millisecond": "millisecond",
	"milliseconds": "millisecond",
	"msec": "millisecond",
	
	"second": "second",
	"seconds": "second",
	"sec": "second",

	"minute": "minute",
	"minutes": "minute",
	"min": "minute",

	"hour": "hour",
	"hours": "hour",
	"hr": "hour",

	"day": "day",
	"days": "day",
	"dy": "day",

	"week": "week",
	"weeks": "week",
	"wk": "week",

	"month": "month",
	"months": "month",
	"mon": "month",
	
	"year": "year",
	"years": "year",
	"yr": "year",
};

// Creates solver
export async function solve(values: {
	from?: string,
	to?: string,
	initial?: number
} = {}): Promise<number> {
	// Defines conversion from unit
	const from = parseUnit(values.from ?? await cli.promptString("Conversion From Unit: ", true));
	if(from === null) throw new Error("[Error] Invalid conversion from unit");
	cli.print(`[Given] Conversion From Unit = ${from}`);

	// Defines conversion to unit
	const to = parseUnit(values.to ?? await cli.promptString("Conversion To Unit: ", true));
	if(to === null) throw new Error("[Error] Invalid conversion to unit");
	cli.print(`[Given] Conversion To Unit = ${to}`);

	// Defines initial conversion value
	const initial = values.initial ?? await cli.promptNumber("Value (Default = 1): ") ?? 1;
	cli.print(`[Given] Initial Conversion Value = ${initial}`);

	// Calculates final conversion unit
	let final: number;
	switch(from) {
		// Angle
		case "degree":
		case "radian": {
			final = convertAngle(from, to, initial);
			break;
		}

		// Length
		case "millimeter":
		case "centimeter":
		case "decimeter":
		case "meter":
		case "decameter":
		case "hectometer":
		case "kilometer":
		case "inch":
		case "foot":
		case "yard":
		case "mile": {
			final = convertLength(from, to, initial);
			break;
		}

		// Mass
		case "milligram":
		case "centigram":
		case "decigram":
		case "gram":
		case "decagram":
		case "hectogram":
		case "kilogram":
		case "tonne":
		case "kilotonne":
		case "megatonne":
		case "gigatonne": {
			final = convertMass(from, to, initial);
			break;
		}
		

		// Temperature
		case "celsius":
		case "fahrenheit":
		case "kelvin": {
			final = convertTemperature(from, to, initial);
			break;
		}

		// Time
		case "millisecond":
		case "second":
		case "minute":
		case "hour":
		case "day":
		case "week":
		case "month":
		case "year": {
			final = convertTime(from, to, initial);
			break;
		}

		default: {
			throw new Error("[Error] Invalid conversion from unit");
		}
	}
	
	// Returns final conversion unit
	return final;
}

// Creates unit parser
export function parseUnit(unit: string | null): string | null {
	// Checks if unit is null
	if(unit === null) return null;

	// Parses unit
	const parsed = unit in units ? units[unit as keyof typeof units] : null;

	// Return parsed unit
	return parsed;
}

// Creates converters
export function convertAngle(from: string, to: string, initial: number): number {
	// Converts conversion from unit to international standard unit
	let standard: number;
	switch(from) {
		case "degree": {
			standard = initial * Math.PI / 180;
			cli.print("[Formula] Radian = Degree * Pi / 180", "hidden");
			cli.print(`[Evaluate] Radian = ${standard}`, "hidden");
			break;
		}
		case "radian": {
			standard = initial;
			break;
		}
		default: {
			throw new Error("[Error] Invalid unit conversion from");
		}
	}

	// Converts international standard unit to conversion to unit
	let final: number;
	switch(to) {
		case "degree": {
			final = standard * 180 / Math.PI;
			cli.print("[Formula] Degree = Radian * 180 / Pi", "hidden");
			cli.print(`[Evaluate] Degree = ${final}`);
			break;
		}
		case "radian": {
			final = standard;
			break;
		}
		default: {
			throw new Error("Invalid unit conversion from.");
		}
	}
	
	// Returns final conversion value
	return final;
}

export function convertLength(from: string, to: string, initial: number): number {
	// Converts conversion from unit to international standard unit
	let standard: number;
	switch(from) {
		case "millimeter": {
			standard = initial / 1_000;
			cli.print("[Formula] Meter = Millimeter / 1,000", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			break;
		}
		case "centimeter": {
			standard = initial / 100;
			cli.print("[Formula] Meter = Centimeter / 100", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			break;
		}
		case "decimeter": {
			standard = initial / 10;
			cli.print("[Formula] Meter = Decimeter / 10", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			break;
		}
		case "meter": {
			standard = initial;
			break;
		}
		case "decameter": {
			standard = initial * 10;
			cli.print("[Formula] Meter = Decameter * 10", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			break;
		}
		case "hectometer": {
			standard = initial * 100;
			cli.print("[Formula] Meter = Hectometer * 100", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			break;
		}
		case "kilometer": {
			standard = initial * 1_000;
			cli.print("[Formula] Meter = Kilometer * 1,000", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			break;
		}
		case "inch": {
			standard = initial / 39.37;
			cli.print("[Formula] Meter = Inch / 39.37", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			break;
		}
		case "foot": {
			standard = initial / 3.281;
			cli.print("[Formula] Meter = Foot / 3.281", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			break;
		}
		case "yard": {
			standard = initial / 1.094;
			cli.print("[Formula] Meter = Yard / 1.094", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			break;
		}
		case "mile": {
			standard = initial * 1_609;
			cli.print("[Formula] Meter = Mile * 1,609", "hidden");
			cli.print(`[Evaluate] Meter = ${standard}`, "hidden");
			break;
		}
		default: {
			throw new Error("[Error] Invalid unit conversion from");
		}
	}

	// Converts international standard unit to conversion to unit
	let final: number;
	switch(to) {
		case "millimeter": {
			final = standard * 1_000;
			cli.print("[Formula] Millimeter = Meter * 1,000", "hidden");
			cli.print(`[Evaluate] Meter = ${final}`);
			break;
		}
		case "centimeter": {
			final = standard * 100;
			cli.print("[Formula] Centimeter = Meter * 100", "hidden");
			cli.print(`[Evaluate] Centimeter = ${final}`);
			break;
		}
		case "decimeter": {
			final = standard * 10;
			cli.print("[Formula] Decimeter = Meter * 10", "hidden");
			cli.print(`[Evaluate] Decimeter = ${final}`);
			break;
		}
		case "meter": {
			final = standard;
			break;
		}
		case "decameter": {
			final = standard / 10;
			cli.print("[Formula] Decameter = Meter / 10", "hidden");
			cli.print(`[Evaluate] Decameter = ${final}`);
			break;
		}
		case "hectometer": {
			final = standard / 100;
			cli.print("[Formula] Hectometer = Meter / 100", "hidden");
			cli.print(`[Evaluate] Hectometer = ${final}`);
			break;
		}
		case "kilometer": {
			final = standard / 1_000;
			cli.print("[Formula] Kilometer = Meter / 1,000", "hidden");
			cli.print(`[Evaluate] Kilometer = ${final}`);
			break;
		}
		case "inch": {
			final = standard * 39.37;
			cli.print("[Formula] Inch = Meter * 39.37", "hidden");
			cli.print(`[Evaluate] Inch = ${final}`);
			break;
		}
		case "foot": {
			final = standard * 3.281;
			cli.print("[Formula] Meter = Meter * 3.281", "hidden");
			cli.print(`[Evaluate] Meter = ${final}`);
			break;
		}
		case "yard": {
			final = standard * 1.094;
			cli.print("[Formula] Yard = Meter * 1.094", "hidden");
			cli.print(`[Evaluate] Yard = ${final}`);
			break;
		}
		case "mile": {
			final = standard / 1_609;
			cli.print("[Formula] Mile = Meter / 1,609", "hidden");
			cli.print(`[Evaluate] Mile = ${final}`);
			break;
		}
		default: {
			throw new Error("[Error] Invalid unit conversion from");
		}
	}
	
	// Returns final conversion value
	return final;
}

export function convertMass(from: string, to: string, initial: number): number {
	// Converts conversion from unit to international standard unit
	let standard: number;
	switch(from) {
		case "milligram": {
			standard = initial / 1_000_000;
			cli.print("[Formula] Kilogram = Milligram / 1,000,000", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			break;
		}
		case "centigram": {
			standard = initial / 100_000;
			cli.print("[Formula] Kilogram = Centigram / 100,000", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			break;
		}
		case "decigram": {
			standard = initial / 10_000;
			cli.print("[Formula] Kilogram = Decigram / 10,000", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			break;
		}
		case "gram": {
			standard = initial / 1_000;
			cli.print("[Formula] Kilogram = Gram / 1,000", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			break;
		}
		case "decagram": {
			standard = initial / 100;
			cli.print("[Formula] Kilogram = Decagram / 100", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			break;
		}
		case "hectogram": {
			standard = initial / 10;
			cli.print("[Formula] Kilogram = Hectogram / 10", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			break;
		}
		case "kilogram": {
			standard = initial;
			break;
		}
		case "tonne": {
			standard = initial * 1_000;
			cli.print("[Formula] Kilogram = Tonne * 1,000", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			break;
		}
		case "kilotonne": {
			standard = initial * 1_000_000;
			cli.print("[Formula] Kilogram = Kilotonne * 1,000,000", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			break;
		}
		case "megatonne": {
			standard = initial * 1_000_000_000;
			cli.print("[Formula] Kilogram = Megatonne * 1,000,000,000", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			break;
		}
		case "gigatonne": {
			standard = initial * 1_000_000_000_000;
			cli.print("[Formula] Kilogram = Gigatonne * 1,000,000,000,000", "hidden");
			cli.print(`[Evaluate] Kilogram = ${standard}`, "hidden");
			break;
		}
		default: {
			throw new Error("[Error] Invalid unit conversion from");
		}
	}

	// Converts international standard unit to conversion to unit
	let final: number;
	switch(to) {
		case "milligram": {
			final = standard * 1_000_000;
			cli.print("[Formula] Milligram = Kilogram * 1,000,000", "hidden");
			cli.print(`[Evaluate] Milligram = ${final}`);
			break;
		}
		case "centigram": {
			final = standard * 100_000;
			cli.print("[Formula] Centigram = Kilogram * 100,000", "hidden");
			cli.print(`[Evaluate] Centigram = ${final}`);
			break;
		}
		case "decigram": {
			final = standard * 10_000;
			cli.print("[Formula] Decigram = Kilogram * 10,000", "hidden");
			cli.print(`[Evaluate] Decigram = ${final}`);
			break;
		}
		case "gram": {
			final = standard * 1_000;
			cli.print("[Formula] Gram = Kilogram * 1,000", "hidden");
			cli.print(`[Evaluate] Gram = ${final}`);
			break;
		}
		case "decagram": {
			final = standard * 100;
			cli.print("[Formula] Decagram = Kilogram * 100", "hidden");
			cli.print(`[Evaluate] Decagram = ${final}`);
			break;
		}
		case "hectogram": {
			final = standard * 10;
			cli.print("[Formula] Hectogram = Kilogram * 10", "hidden");
			cli.print(`[Evaluate] Hectogram = ${final}`);
			break;
		}
		case "kilogram": {
			final = standard;
			break;
		}
		case "tonne": {
			final = standard / 1_000;
			cli.print("[Formula] Tonne = Kilogram / 1,000", "hidden");
			cli.print(`[Evaluate] Tonne = ${final}`);
			break;
		}
		case "kilotonne": {
			final = standard / 1_000_000;
			cli.print("[Formula] Kilotonne = Kilogram / 1,000,000", "hidden");
			cli.print(`[Evaluate] Kilotonne = ${final}`);
			break;
		}
		case "megatonne": {
			final = standard / 1_000_000_000;
			cli.print("[Formula] Megatonne = Kilogram / 1,000,000,000", "hidden");
			cli.print(`[Evaluate] Megatonne = ${final}`);
			break;
		}
		case "gigatonne": {
			final = standard / 1_000_000_000_000;
			cli.print("[Formula] Gigatonne = Kilogram / 1,000,000,000,000", "hidden");
			cli.print(`[Evaluate] Gigatonne = ${final}`);
			break;
		}
		default: {
			throw new Error("[Error] Invalid unit conversion from");
		}
	}
	
	// Returns final conversion value
	return final;
}

export function convertTemperature(from: string, to: string, initial: number): number {
	// Converts conversion from unit to international standard unit
	let standard: number;
	switch(from) {
		case "celsius": {
			standard = initial + 273.15;
			cli.print("[Formula] Kelvin = Celsius + 273.15", "hidden");
			cli.print(`[Evaluate] Kelvin = ${standard}`, "hidden");
			break;
		}
		case "fahrenheit": {
			standard = (initial - 32) * 5 / 9 + 273.15;
			cli.print("[Formula] Kelvin = (Fahrenheit - 32) * 5 / 9 + 273.15", "hidden");
			cli.print(`[Evaluate] Kelvin = ${standard}`, "hidden");
			break;
		}
		case "kelvin": {
			standard = initial;
			break;
		}
		default: {
			throw new Error("[Error] Invalid unit conversion from");
		}
	}

	// Converts international standard unit to conversion to unit
	let final: number;
	switch(to) {
		case "celsius": {
			final = standard - 273.15;
			cli.print("[Formula] Celsius = Kelvin - 273.15", "hidden");
			cli.print(`[Evaluate] Celsius = ${final}`);
			break;
		}
		case "fahrenheit": {
			final = (standard - 273.15) * 9 / 5 + 32;
			cli.print("[Formula] Fahrenheit = (Kelvin - 273.15) * 9 / 5 + 32", "hidden");
			cli.print(`[Evaluate] Fahrenheit = ${final}`);
			break;
		}
		case "kelvin": {
			final = standard;
			break;
		}
		default: {
			throw new Error("[Error] Invalid unit conversion from");
		}
	}
	
	// Returns final conversion value
	return final;
}

export function convertTime(from: string, to: string, initial: number): number {
	// Converts conversion from unit to international standard unit
	let standard: number;
	switch(from) {
		case "millisecond": {
			standard = initial / 1000;
			cli.print("[Formula] Second = Millisecond / 1000", "hidden");
			cli.print(`[Evaluate] Second = ${standard}`, "hidden");
			break;
		}
		case "second": {
			standard = initial;
			break;
		}
		case "minute": {
			standard = initial * 60;
			cli.print("[Formula] Second = Minute * 60", "hidden");
			cli.print(`[Evaluate] Second = ${standard}`, "hidden");
			break;
		}
		case "hour": {
			standard = initial * 3_600;
			cli.print("[Formula] Second = Hour * 3,600", "hidden");
			cli.print(`[Evaluate] Second = ${standard}`, "hidden");
			break;
		}
		case "day": {
			standard = initial * 86_400;
			cli.print("[Formula] Second = Day * 86,400", "hidden");
			cli.print(`[Evaluate] Second = ${standard}`, "hidden");
			break;
		}
		case "week": {
			standard = initial * 604_800;
			cli.print("[Formula] Second = Week * 604,800", "hidden");
			cli.print(`[Evaluate] Second = ${standard}`, "hidden");
			break;
		}
		case "month": {
			standard = initial * 2_419_200;
			cli.print("[Assume] Month = Day * 28", "hidden");
			cli.print("[Formula] Second = Month * 2,419,200", "hidden");
			cli.print(`[Evaluate] Second = ${standard}`, "hidden");
			break;
		}
		case "year": {
			standard = initial * 31_536_000;
			cli.print("[Assume] Year = Day * 365", "hidden");
			cli.print("[Formula] Second = Year * 31,536,000", "hidden");
			cli.print(`[Evaluate] Second = ${standard}`, "hidden");
			break;
		}
		default: {
			throw new Error("[Error] Invalid unit conversion from");
		}
	}

	// Converts international standard unit to conversion to unit
	let final: number;
	switch(to) {
		case "millisecond": {
			final = standard * 1000;
			cli.print("[Formula] Millisecond = Second * 1000", "hidden");
			cli.print(`[Evaluate] Millisecond = ${final}`);
			break;
		}
		case "second": {
			final = standard;
			break;
		}
		case "minute": {
			final = standard / 60;
			cli.print("[Formula] Minute = Second / 60", "hidden");
			cli.print(`[Evaluate] Minute = ${final}`);
			break;
		}
		case "hour": {
			final = standard / 3_600;
			cli.print("[Formula] Hour = Second / 3,600", "hidden");
			cli.print(`[Evaluate] Hour = ${final}`);
			break;
		}
		case "day": {
			final = standard / 86_400;
			cli.print("[Formula] Day = Second / 86,400", "hidden");
			cli.print(`[Evaluate] Day = ${final}`);
			break;
		}
		case "week": {
			final = standard / 604_800;
			cli.print("[Formula] Week = Second / 604,800", "hidden");
			cli.print(`[Evaluate] Week = ${final}`);
			break;
		}
		case "month": {
			final = standard / 2_419_200;
			cli.print("[Assume] Month = Day * 28", "hidden");
			cli.print("[Formula] Month = Second / 2,419,200", "hidden");
			cli.print(`[Evaluate] Month = ${final}`);
			break;
		}
		case "year": {
			final = standard / 31_536_000;
			cli.print("[Assume] Year = Day * 28", "hidden");
			cli.print("[Formula] Year = Second / 31,536,000", "hidden");
			cli.print(`[Evaluate] Year = ${final}`);
			break;
		}
		default: {
			throw new Error("[Error] Invalid unit conversion from");
		}
	}
	
	// Returns final conversion value
	return final;
}

// Exports
export default solve;
