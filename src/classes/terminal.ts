// Imports
import nodeEvents from "node:events";
import nodeReadline from "node:readline";
import chalk from "chalk";

// Types
export type Style = "default" | "critical" | "log" | "warning" | "error";
export type Key = {
	sequence: string;
	name?: string;
	ctrl: boolean;
	meta: boolean;
	shift: boolean;
	code?: string;
};

// Class
export class Terminal extends nodeEvents.EventEmitter {
	// Properties
	readonly cli = nodeReadline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	// Constructor
	constructor() {
		// Initializes class
		super();

		// Initializes keypress events
		nodeReadline.emitKeypressEvents(process.stdin);
		if(process.stdin.isTTY) process.stdin.setRawMode(true);
		process.stdin.on("keypress", (string: string, key: Key) => {
			this.emit("key", string, key);
			if(key.ctrl && key.name === "c") process.exit();
		});
	}

	// Methods
	clear(): void {
		console.clear();
	}

	gap(lines: number = 1): void {
		for(let line = 0; line < lines; line++) console.log();
	}

	print(message: string, style: Style = "default"): void {
		// Prints message
		const styles = {
			default: chalk.green,
			critical: chalk.bold.yellowBright,
			log: chalk.gray,
			warning: chalk.yellow,
			error: chalk.red
		};
		console.log(styles[style](message));
	}

	prompt(query: string = "> "): Promise<string> {
		// Returns answer
		return new Promise(resolve => {
			this.cli.question(chalk.blue(query), answer => resolve(answer));
		});
	}
}

// Exports
export default Terminal;
