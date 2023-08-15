// Imports
import nodeReadline from "node:readline";
import nodeEvents from "node:events";
import chalk from "chalk";

// Defines types
export type KeyboardData = {
	code?: string;
	ctrl: boolean;
	meta: boolean;
	name?: string;
	raw?: string;
	sequence: string;
	shift: boolean;
};
export type Keyboard = nodeEvents.EventEmitter & {
	emit: (event: "key", data: KeyboardData) => void;
	on: (event: "key", callback: (data: KeyboardData) => void) => void;
};
export type PrintStyle = "default" | "hidden" | "warning" | "error" | "important";

// Creates interface
export const stdio = nodeReadline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Creates keyboard
export const keyboard: Keyboard = new nodeEvents.EventEmitter();

// Handles keypress event
nodeReadline.emitKeypressEvents(process.stdin);
if(process.stdin.isTTY) process.stdin.setRawMode(true);
process.stdin.on("keypress", (raw: string, key: {
	code?: string,
	ctrl: boolean,
	meta: boolean,
	name?: string,
	sequence: string,
	shift: boolean
}) => {
	// Emits event
	keyboard.emit("key", {
		code: key.code,
		ctrl: key.ctrl,
		meta: key.meta,
		name: key.name,
		raw: raw,
		sequence: key.sequence,
		shift: key.shift
	});
});

// Creates print function
export function print(message: string, style: PrintStyle = "default"): void {
	// Creates styles
	const styles = {
		default: chalk.green,
		error: chalk.red,
		hidden: chalk.gray,
		important: chalk.blue,
		warning: chalk.yellow
	};

	// Prints message
	process.stdout.write(styles[style](message) + "\n");
}

// Creates prompt functions
export function prompt(query: string = "> "): Promise<string> {
	// Returns response
	return new Promise(resolve => {
		stdio.question(chalk.blue(query), response => {
			resolve(response);
		});
	});
}
export async function promptString(query: string = "> ", lowercase: boolean = false): Promise<string | null> {
	// Parses response
	const answer = await prompt(query);

	// Returns response
	return answer === "" ? null : lowercase ? answer.toLowerCase() : answer;
}
export async function promptBoolean(query: string = "> "): Promise<boolean | null> {
	// Parses response
	const answer = (await prompt(query)).toLowerCase();

	// Returns response
	return answer === "true" ? true : answer === "false" ? false : null;
}
export async function promptNumber(query: string = "> ", integer: boolean = false): Promise<number | null> {
	// Parses response
	const answer = parseFloat(await prompt(query));

	// Returns response
	return Number.isNaN(answer) ? null : integer ? Math.trunc(answer) : answer;
}
