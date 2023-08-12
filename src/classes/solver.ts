// Imports
import Terminal from "./terminal.js";

// Type
export type Result = object;

// Class
export abstract class Solver {
	// Properties
	static readonly description: string;
	static readonly id: string;
	abstract readonly description: string;
	abstract readonly id: string;
	readonly terminal: Terminal;

	// Constructor
	constructor(terminal: Terminal) {
		// Initializes class
		this.terminal = terminal;
	}

	// Methods
	printAnswer(message: string): void {
		// Prints answer
		this.terminal.print(message);
	}

	printInput(message: string): void {
		// Prints input
		this.terminal.print(message, "critical");
	}

	printStep(message: string): void {
		// Prints step
		this.terminal.print(message, "log");
	}

	async promptBoolean(defaultAnswer: boolean | null = false): Promise<boolean | null> {
		// Returns boolean
		const answer = (await this.terminal.prompt()).toLowerCase();
		if (answer === "true" || answer === "t" || answer === "yes" || answer === "y") return true;
		else if (answer === "false" || answer === "f" || answer === "no" || answer === "n") return false;
		else return defaultAnswer;
	}

	async promptNumber(defaultAnswer: number | null = null): Promise<number | null> {
		// Returns number
		const answer = parseFloat(await this.terminal.prompt());
		return Number.isNaN(answer) ? defaultAnswer : answer;
	}

	abstract solve(solvers: { [solver: string]: Solver }, defaultValues?: Partial<Result>): Promise<Result>;
}

// Exports
export default Solver;
