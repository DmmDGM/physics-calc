// Imports
import nodeReadline from "node:readline";
import chalk from "chalk";

// Creates interface
const cliInterface = nodeReadline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Functions
function cliClear() {
	console.clear();
}

function cliPrint(message: string, color: boolean = true): void {
	console.log(color ? chalk.green(message) : message);
}

function cliLog(message: string, color: boolean = true): void {
	console.log(color ? chalk.gray(message) : message);
}

function cliImportant(message: string, color: boolean = true): void {
	console.log(color ? chalk.bold.yellowBright(message) : message);
}

function cliError(message: string, color: boolean = true): void {
	console.error(color ? chalk.red(message) : message);
}

function cliPrompt(color: boolean = true): Promise<string> {
	return new Promise((resolve) => {
		cliInterface.question(color ? chalk.blue("> ") : "> ", (answer) => resolve(answer));
	});
}

async function cliFloat(color: boolean = true): Promise<number | null> {
	const answer = await cliPrompt(color);
	const float = parseFloat(answer);
	return isNaN(float) ? null : float;
}

// Exports
export { cliInterface, cliClear, cliPrint, cliLog, cliImportant, cliError, cliPrompt, cliFloat };
