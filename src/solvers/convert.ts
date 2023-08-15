// Imports
import * as cli from "../cli.js";

// Creates solver
export async function solve(values: {
	from?: string,
	to?: string,
	initial?: number
} = {}): Promise<number> {
	// Defines conversion from unit
	const rawFrom = values.from ?? await cli.promptString("Conversion From Unit: ", true);
	if(rawFrom === null) throw new Error("[Error] Empty conversion from unit");
	const parsedFrom = parseUnit(rawFrom);
	if(parsedFrom === null) throw new Error("[Error] Invalid conversion from unit");
	cli.print(`[Given] Conversion From Unit = ${parsedFrom}`);

	// Defines conversion to unit
	const rawTo = values.to ?? await cli.promptString("Conversion To Unit: ", true);
	if(rawTo === null) throw new Error("[Error] Empty conversion to unit");
	const parsedTo = parseUnit(rawTo);
	if(parsedTo === null) throw new Error("[Error] Invalid conversion to unit");
	cli.print(`[Given] Conversion To Unit = ${parsedTo}`);

	// Defines initial conversion value
	const initial = values.initial ?? await cli.promptNumber("Value (Default = 1): ") ?? 1;
	cli.print(`[Given] Initial Conversion Value = ${initial}`);

	// Calculates final conversion unit
	let final: number;
	switch(parsedFrom) {
		case "degree":
		case "radian": {
			final = convertAngle(parsedFrom, parsedTo, initial);
			break;
		}
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
			final = convertLength(parsedFrom, parsedTo, initial);
			break;
		}
		case "celsius":
		case "fahrenheit":
		case "kelvin": {
			final = convertTemperature(parsedFrom, parsedTo, initial);
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
export function parseUnit(unit: string): string | null {
	// Creates units
	const units = {
		// Angle
		"degree": "degree",
		"deg": "degree",
		"degrees": "degree",

		"radian": "radian",
		"rad": "radian",
		"radians": "radian",

		// Length
		"millimeter": "millimeter",
		"mm": "millimeter",
		"millimeters": "millimeter",
		
		"centimeter": "centimeter",
		"cm": "centimeter",
		"centimeters": "centimeter",

		"decimeter": "decimeter",
		"dm": "decimeter",
		"decimeters": "decimeter",

		"meter": "meter",
		"m": "meter",
		"meters": "meter",

		"decameter": "decameter",
		"dam": "decameter",
		"decameters": "decameter",

		"hectometer": "hectometer",
		"hm": "hectometer",
		"hectometers": "hectometer",

		"kilometer": "kilometer",
		"km": "kilometer",
		"kilometers": "kilometer",

		"inch": "inch",
		"in": "inch",
		"inches": "inch",

		"foot": "foot",
		"ft": "foot",
		"feet": "foot",

		"yard": "yard",
		"yd": "yard",
		"yards": "yard",

		"mile": "mile",
		"mi": "mile",
		"miles": "mile",

		// Temperature
		"celsius": "celsius",
		"c": "celsius",
		"°celsius": "celsius",
		"°c": "celsius",

		"fahrenheit": "fahrenheit",
		"f": "fahrenheit",
		"°fahrenheit": "fahrenheit",
		"°f": "fahrenheit",

		"kelvin": "kelvin",
		"k": "kelvin"
	};

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
			standard = initial / 1000;
			cli.print("[Formula] Meter = Millimeter / 1000", "hidden");
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
			standard = initial * 1000;
			cli.print("[Formula] Meter = Kilometer * 1000", "hidden");
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
			standard = initial * 1609;
			cli.print("[Formula] Meter = Mile * 1609", "hidden");
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
			final = standard * 1000;
			cli.print("[Formula] Millimeter = Meter * 1000", "hidden");
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
			final = standard / 1000;
			cli.print("[Formula] Kilometer = Meter / 1000", "hidden");
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
			final = standard / 1609;
			cli.print("[Formula] Mile = Meter / 1609", "hidden");
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

// Exports
export default solve;
